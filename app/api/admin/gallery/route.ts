import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { readdir } from 'fs/promises'
import path from 'path'

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const teamDir = path.join(process.cwd(), 'public', 'team')
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'team')

    const teamFiles: string[] = []
    const uploadFiles: string[] = []

    try {
      const files = await readdir(teamDir)
      teamFiles.push(
        ...files
          .filter((f) => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
          .map((f) => `/team/${f}`)
      )
    } catch {
      // directory might not exist yet
    }

    try {
      const files = await readdir(uploadsDir)
      uploadFiles.push(
        ...files
          .filter((f) => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
          .map((f) => `/uploads/team/${f}`)
      )
    } catch {
      // directory might not exist yet
    }

    return NextResponse.json({
      images: [...uploadFiles, ...teamFiles],
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to list gallery images' },
      { status: 500 }
    )
  }
}

