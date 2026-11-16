import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { readdir } from 'fs/promises'
import path from 'path'

const IMAGE_EXT_REGEX = /\.(jpg|jpeg|png|webp|avif|svg)$/i
const ICON_OR_SYSTEM_REGEX = /^(favicon|icon|apple-icon|loader-mask|Newsletters)\./i
const PARTNER_LOGO_REGEX = /(logo|agra|usaid)/i

async function scanDirectory(
  dirPath: string,
  urlPrefix: string,
  filterFn?: (filename: string) => boolean
): Promise<string[]> {
  try {
    const entries = await readdir(dirPath, { withFileTypes: true })
    return entries
      .filter(
        (entry) =>
          entry.isFile() &&
          IMAGE_EXT_REGEX.test(entry.name) &&
          (!filterFn || filterFn(entry.name))
      )
      .map((entry) => `${urlPrefix}/${entry.name}`)
  } catch {
    return []
  }
}

async function scanAllUploads(uploadsRoot: string): Promise<string[]> {
  try {
    const entries = await readdir(uploadsRoot, { withFileTypes: true })
    const subdirs = await Promise.all(
      entries
        .filter((entry) => entry.isDirectory())
        .map((entry) =>
          scanDirectory(path.join(uploadsRoot, entry.name), `/uploads/${entry.name}`)
        )
    )
    const rootUploads = await scanDirectory(uploadsRoot, '/uploads')
    return [...rootUploads, ...subdirs.flat()]
  } catch {
    return []
  }
}

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const rawFolder = searchParams.get('folder') || 'team'
    const folder = rawFolder.replace(/[^a-zA-Z0-9_-]/g, '') || 'team'

    const publicDir = path.join(process.cwd(), 'public')
    const uploadsRoot = path.join(publicDir, 'uploads')

    let images: string[] = []

    if (folder === 'team') {
      const [uploads, staticTeam] = await Promise.all([
        scanDirectory(path.join(uploadsRoot, 'team'), '/uploads/team'),
        scanDirectory(path.join(publicDir, 'team'), '/team'),
      ])
      images = [...uploads, ...staticTeam]
    } else if (folder === 'partners') {
      const [uploads, rootLogos] = await Promise.all([
        scanDirectory(path.join(uploadsRoot, 'partners'), '/uploads/partners'),
        scanDirectory(
          publicDir,
          '',
          (name) => !ICON_OR_SYSTEM_REGEX.test(name) && PARTNER_LOGO_REGEX.test(name)
        ),
      ])
      images = [...uploads, ...rootLogos]
    } else if (folder === 'projects') {
      const [uploads, platforms, previews, imagesDir, rootPhotos] = await Promise.all([
        scanDirectory(path.join(uploadsRoot, 'projects'), '/uploads/projects'),
        scanDirectory(path.join(publicDir, 'platforms'), '/platforms'),
        scanDirectory(path.join(publicDir, 'resources', 'previews'), '/resources/previews'),
        scanDirectory(path.join(publicDir, 'images'), '/images'),
        scanDirectory(
          publicDir,
          '',
          (name) => !ICON_OR_SYSTEM_REGEX.test(name) && !PARTNER_LOGO_REGEX.test(name)
        ),
      ])
      images = [...uploads, ...platforms, ...previews, ...imagesDir, ...rootPhotos]
    } else if (folder === 'gallery') {
      const [uploads, officePlants, rootPhotos] = await Promise.all([
        scanDirectory(path.join(uploadsRoot, 'gallery'), '/uploads/gallery'),
        scanDirectory(path.join(publicDir, 'office-plants'), '/office-plants'),
        scanDirectory(
          publicDir,
          '',
          (name) => !ICON_OR_SYSTEM_REGEX.test(name) && !PARTNER_LOGO_REGEX.test(name)
        ),
      ])
      images = [...uploads, ...officePlants, ...rootPhotos]
    } else if (folder === 'all') {
      const [allUploads, team, platforms, previews, imagesDir, officePlants, rootImages] =
        await Promise.all([
          scanAllUploads(uploadsRoot),
          scanDirectory(path.join(publicDir, 'team'), '/team'),
          scanDirectory(path.join(publicDir, 'platforms'), '/platforms'),
          scanDirectory(path.join(publicDir, 'resources', 'previews'), '/resources/previews'),
          scanDirectory(path.join(publicDir, 'images'), '/images'),
          scanDirectory(path.join(publicDir, 'office-plants'), '/office-plants'),
          scanDirectory(publicDir, '', (name) => !ICON_OR_SYSTEM_REGEX.test(name)),
        ])
      images = [
        ...allUploads,
        ...team,
        ...platforms,
        ...previews,
        ...imagesDir,
        ...officePlants,
        ...rootImages,
      ]
    } else {
      images = await scanDirectory(path.join(uploadsRoot, folder), `/uploads/${folder}`)
    }

    return NextResponse.json({
      images: Array.from(new Set(images)),
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to list gallery images' },
      { status: 500 }
    )
  }
}
