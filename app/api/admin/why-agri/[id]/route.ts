import { NextResponse } from 'next/server'
import { updateWhyAgriCard, deleteWhyAgriCard } from '@/lib/services/why-agri-service'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const updated = await updateWhyAgriCard(id, {
      titleEn: body.titleEn,
      titleFr: body.titleFr,
      textEn: body.textEn,
      textFr: body.textFr,
      order: body.order !== undefined ? Number(body.order) : undefined,
      active: body.active !== undefined ? Boolean(body.active) : undefined,
    })
    return NextResponse.json({ success: true, card: updated })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await deleteWhyAgriCard(id)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
