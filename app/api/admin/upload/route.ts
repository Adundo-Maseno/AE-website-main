import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'application/pdf',
]

const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB
const MAX_PDF_SIZE = 30 * 1024 * 1024 // 30MB for reports & studies

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const folder = (formData.get('folder') as string) || 'team'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Only JPG, PNG, WebP, AVIF images and PDF documents are permitted.' },
        { status: 400 }
      )
    }

    const maxSize = file.type === 'application/pdf' ? MAX_PDF_SIZE : MAX_IMAGE_SIZE
    if (file.size > maxSize) {
      const limitMb = Math.round(maxSize / (1024 * 1024))
      return NextResponse.json(
        { error: `File size exceeds the ${limitMb}MB limit.` },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const rawName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase()
    const ext = path.extname(rawName) || (file.type === 'application/pdf' ? '.pdf' : '.jpg')
    const baseName = path.basename(rawName, ext).slice(0, 30)
    const timestamp = Date.now()
    const filename = `${baseName}-${timestamp}${ext}`

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder)
    await mkdir(uploadDir, { recursive: true })

    const filePath = path.join(uploadDir, filename)
    await writeFile(filePath, buffer)

    const publicUrl = `/uploads/${folder}/${filename}`

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      size: file.size,
      mimeType: file.type,
    })
  } catch (err: any) {
    console.error('File upload error:', err)
    return NextResponse.json(
      { error: err.message || 'File upload failed' },
      { status: 500 }
    )
  }
}

