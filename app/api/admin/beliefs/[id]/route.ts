import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { updateBelief, deleteBelief } from '@/lib/services/beliefs-service'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()
    const updated = await updateBelief(id, {
      titleEn: body.titleEn,
      titleFr: body.titleFr,
      textEn: body.textEn,
      textFr: body.textFr,
      order: body.order !== undefined ? Number(body.order) : undefined,
      active: body.active !== undefined ? Boolean(body.active) : undefined,
    })
    return NextResponse.json({ success: true, belief: updated })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await deleteBelief(id)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

