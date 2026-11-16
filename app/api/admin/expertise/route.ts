import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getAllExpertisePillarsAdmin, createExpertisePillar } from '@/lib/services/expertise-service'

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const pillars = await getAllExpertisePillarsAdmin()
    return NextResponse.json({ success: true, pillars })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    if (!body.titleEn || !body.descEn) {
      return NextResponse.json({ success: false, error: 'Title and Description in English are required' }, { status: 400 })
    }
    const pillar = await createExpertisePillar({
      titleEn: body.titleEn,
      titleFr: body.titleFr || null,
      descEn: body.descEn,
      descFr: body.descFr || null,
      route: body.route || '/our-work',
      order: Number(body.order) || 0,
      active: body.active !== undefined ? Boolean(body.active) : true,
    })
    return NextResponse.json({ success: true, pillar }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

