import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { readdir, stat } from 'fs/promises'
import path from 'path'

export interface PdfFileItem {
  name: string
  url: string
  folder: string
  sizeBytes: number
  sizeFormatted: string
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results: PdfFileItem[] = []

  const searchDirs = [
    { dir: path.join(process.cwd(), 'public', 'resources'), prefix: '/resources' },
    { dir: path.join(process.cwd(), 'public', 'uploads', 'resources'), prefix: '/uploads/resources' },
  ]

  for (const { dir, prefix } of searchDirs) {
    try {
      const files = await readdir(dir)
      for (const file of files) {
        if (file.toLowerCase().endsWith('.pdf')) {
          try {
            const fileStat = await stat(path.join(dir, file))
            results.push({
              name: file,
              url: `${prefix}/${file}`,
              folder: prefix.replace('/', ''),
              sizeBytes: fileStat.size,
              sizeFormatted: formatBytes(fileStat.size),
            })
          } catch {
            // Skip unreadable files
          }
        }
      }
    } catch {
      // Directory may not exist yet, ignore
    }
  }

  // Sort alphabetically by filename
  results.sort((a, b) => a.name.localeCompare(b.name))

  return NextResponse.json({ files: results })
}

