import { NextResponse } from 'next/server'
import { updatePartner, deletePartner } from '@/lib/services/partners-service'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const updated = await updatePartner(id, {
      name: body.name,
      logoUrl: body.logoUrl,
      websiteUrl: body.websiteUrl,
      category: body.category,
      row: body.row !== undefined ? Number(body.row) : undefined,
      order: body.order !== undefined ? Number(body.order) : undefined,
      active: body.active !== undefined ? Boolean(body.active) : undefined,
    })
    return NextResponse.json({ success: true, partner: updated })
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
    await deletePartner(id)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

