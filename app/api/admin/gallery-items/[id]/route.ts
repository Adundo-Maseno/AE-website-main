import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { updateGalleryItem, deleteGalleryItem } from '@/lib/services/gallery-service'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await req.json()
    const updated = await updateGalleryItem(id, {
      titleEn: body.titleEn,
      titleFr: body.titleFr,
      captionEn: body.captionEn,
      captionFr: body.captionFr,
      imageUrl: body.imageUrl,
      category: body.category,
      order: body.order !== undefined ? Number(body.order) : undefined,
    })
    return NextResponse.json({ success: true, item: updated })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to update gallery item' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await deleteGalleryItem(id)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to delete gallery item' },
      { status: 500 }
    )
  }
}
