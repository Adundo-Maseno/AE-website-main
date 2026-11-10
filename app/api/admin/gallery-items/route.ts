import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getGalleryItems, createGalleryItem } from '@/lib/services/gallery-service'

export async function GET() {
  try {
    const items = await getGalleryItems()
    return NextResponse.json({ items })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to fetch gallery items' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { titleEn, titleFr, captionEn, captionFr, imageUrl, category, order } = body

    if (!titleEn || !imageUrl) {
      return NextResponse.json(
        { error: 'Title and Image URL are required' },
        { status: 400 }
      )
    }

    const created = await createGalleryItem({
      titleEn,
      titleFr,
      captionEn,
      captionFr,
      imageUrl,
      category,
      order: typeof order === 'number' ? order : 0,
    })

    return NextResponse.json({ success: true, item: created }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to create gallery item' },
      { status: 500 }
    )
  }
}

