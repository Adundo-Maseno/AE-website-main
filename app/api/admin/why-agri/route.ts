import { NextResponse } from 'next/server'
import { getAllWhyAgriCardsAdmin, createWhyAgriCard } from '@/lib/services/why-agri-service'

export async function GET() {
  try {
    const cards = await getAllWhyAgriCardsAdmin()
    return NextResponse.json({ success: true, cards })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (!body.textEn) {
      return NextResponse.json({ success: false, error: 'Text in English is required' }, { status: 400 })
    }
    const card = await createWhyAgriCard({
      titleEn: body.titleEn || null,
      titleFr: body.titleFr || null,
      textEn: body.textEn,
      textFr: body.textFr || null,
      order: Number(body.order) || 0,
      active: body.active !== undefined ? Boolean(body.active) : true,
    })
    return NextResponse.json({ success: true, card }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

