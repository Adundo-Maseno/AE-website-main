import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/svg+xml',
  'application/pdf',
]

const EXT_TO_MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
}

const ALLOWED_FOLDERS = new Set([
  'team',
  'partners',
  'projects',
  'gallery',
  'resources',
  'sections',
])

const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB
const MAX_PDF_SIZE = 30 * 1024 * 1024 // 30MB for reports & studies

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const rawFolder = ((formData.get('folder') as string) || 'team')
      .replace(/[^a-zA-Z0-9_-]/g, '')
      .toLowerCase()
    const folder = ALLOWED_FOLDERS.has(rawFolder) ? rawFolder : 'team'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const fileExt = path.extname(file.name || '').toLowerCase()
    const normalizedType =
      file.type === 'image/jpg'
        ? 'image/jpeg'
        : file.type || EXT_TO_MIME[fileExt] || ''

    if (!ALLOWED_MIME_TYPES.includes(normalizedType)) {
      return NextResponse.json(
        { error: 'Only JPG, PNG, WebP, AVIF, SVG images and PDF documents are permitted.' },
        { status: 400 }
      )
    }

    const maxSize = normalizedType === 'application/pdf' ? MAX_PDF_SIZE : MAX_IMAGE_SIZE
    if (file.size > maxSize) {
      const limitMb = Math.round(maxSize / (1024 * 1024))
      return NextResponse.json(
        { error: `File size exceeds the ${limitMb}MB limit.` },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const rawName = (file.name || 'upload').replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase()
    const fallbackExt =
      normalizedType === 'application/pdf'
        ? '.pdf'
        : normalizedType === 'image/svg+xml'
          ? '.svg'
          : '.jpg'
    const ext = path.extname(rawName) || fallbackExt
    const baseName = (path.basename(rawName, ext) || 'file').slice(0, 30)
    const timestamp = Date.now()
    const filename = `${baseName}-${timestamp}${ext}`

    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder)
      await mkdir(uploadDir, { recursive: true })

      const filePath = path.join(uploadDir, filename)
      await writeFile(filePath, buffer)

      const publicUrl = `/uploads/${folder}/${filename}`

      return NextResponse.json({
        success: true,
        url: publicUrl,
        folder,
        filename,
        size: file.size,
        mimeType: normalizedType,
        storage: 'filesystem',
      })
    } catch (fsErr: any) {
      const isReadOnlyFs =
        fsErr?.code === 'EROFS' ||
        fsErr?.code === 'EACCES' ||
        fsErr?.code === 'EPERM' ||
        fsErr?.code === 'ENOENT'

      if (isReadOnlyFs && normalizedType.startsWith('image/')) {
        const dataUrl = `data:${normalizedType};base64,${buffer.toString('base64')}`
        return NextResponse.json({
          success: true,
          url: dataUrl,
          folder,
          filename,
          size: file.size,
          mimeType: normalizedType,
          storage: 'inline-data-url',
        })
      }

      if (isReadOnlyFs && normalizedType === 'application/pdf') {
        return NextResponse.json(
          {
            error:
              'Serverless storage is read-only for PDF uploads. Please host the PDF externally or under /public/resources and paste its URL.',
          },
          { status: 422 }
        )
      }

      throw fsErr
    }
  } catch (err: any) {
    console.error('File upload error:', err)
    return NextResponse.json(
      { error: err.message || 'File upload failed' },
      { status: 500 }
    )
  }
}

