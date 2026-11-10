import { NextResponse } from 'next/server'
import { getAllBeliefsAdmin, createBelief } from '@/lib/services/beliefs-service'

export async function GET() {
  try {
    const beliefs = await getAllBeliefsAdmin()
    return NextResponse.json({ success: true, beliefs })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (!body.titleEn || !body.textEn) {
      return NextResponse.json({ success: false, error: 'Title and Text in English are required' }, { status: 400 })
    }
    const belief = await createBelief({
      titleEn: body.titleEn,
      titleFr: body.titleFr || null,
      textEn: body.textEn,
      textFr: body.textFr || null,
      order: Number(body.order) || 0,
      active: body.active !== undefined ? Boolean(body.active) : true,
    })
    return NextResponse.json({ success: true, belief }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
