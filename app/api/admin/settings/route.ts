import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getSiteSettings, updateSiteSettings } from '@/lib/services/settings-service'

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const settings = await getSiteSettings()
    return NextResponse.json({ success: true, settings })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const updated = await updateSiteSettings(body)
    return NextResponse.json({ success: true, settings: updated })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

