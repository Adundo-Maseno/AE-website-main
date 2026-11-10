import { NextResponse } from 'next/server'
import { getAllPartnersAdmin, createPartner } from '@/lib/services/partners-service'

export async function GET() {
  try {
    const partners = await getAllPartnersAdmin()
    return NextResponse.json({ success: true, partners })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (!body.name || !body.logoUrl) {
      return NextResponse.json({ success: false, error: 'Name and logo URL are required' }, { status: 400 })
    }
    const partner = await createPartner({
      name: body.name,
      logoUrl: body.logoUrl,
      websiteUrl: body.websiteUrl || null,
      category: body.category || 'development_partners',
      row: Number(body.row) || 1,
      order: Number(body.order) || 0,
      active: body.active !== undefined ? Boolean(body.active) : true,
    })
    return NextResponse.json({ success: true, partner }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

