import { NextResponse } from 'next/server'
import { updateExpertisePillar, deleteExpertisePillar } from '@/lib/services/expertise-service'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const updated = await updateExpertisePillar(id, {
      titleEn: body.titleEn,
      titleFr: body.titleFr,
      descEn: body.descEn,
      descFr: body.descFr,
      route: body.route,
      order: body.order !== undefined ? Number(body.order) : undefined,
      active: body.active !== undefined ? Boolean(body.active) : undefined,
    })
    return NextResponse.json({ success: true, pillar: updated })
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
    await deleteExpertisePillar(id)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

