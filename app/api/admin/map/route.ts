import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getCountries, createCountry } from '@/lib/services/map-service'

export async function GET() {
  try {
    const countries = await getCountries()
    return NextResponse.json({ countries })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to fetch countries' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { countryCode, countryName, region, activeProjectsCount, engagement, overviewEn, overviewFr, workDone, focus, impact, locations } = body

    if (!countryCode || !countryName) {
      return NextResponse.json(
        { error: 'Country code and name are required' },
        { status: 400 }
      )
    }

    const created = await createCountry({
      countryCode,
      countryName,
      region,
      activeProjectsCount: Number(activeProjectsCount) || 0,
      engagement: Number(engagement) || 0,
      overviewEn,
      overviewFr,
      workDone,
      focus,
      impact,
      locations,
    })

    return NextResponse.json({ success: true, country: created }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to create country record' },
      { status: 500 }
    )
  }
}

