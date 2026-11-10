import { NextResponse } from 'next/server'
import { getPageSections, upsertPageSection } from '@/lib/services/page-sections-service'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || undefined
    const sections = await getPageSections(page)
    return NextResponse.json({ success: true, sections })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (!body.sectionKey || !body.page) {
      return NextResponse.json({ success: false, error: 'sectionKey and page are required' }, { status: 400 })
    }
    const updated = await upsertPageSection(body)
    return NextResponse.json({ success: true, section: updated })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

