import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getInsights, createInsight } from '@/lib/services/insights-service'

export async function GET() {
  try {
    const insights = await getInsights()
    return NextResponse.json({ insights })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to fetch insights' },
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
    const { titleEn, titleFr, summaryEn, summaryFr, contentEn, contentFr, link, author, order } = body

    if (!titleEn) {
      return NextResponse.json(
        { error: 'English title is required' },
        { status: 400 }
      )
    }

    const created = await createInsight({
      titleEn,
      titleFr,
      summaryEn,
      summaryFr,
      contentEn,
      contentFr,
      link,
      author,
      order: typeof order === 'number' ? order : 0,
    })

    return NextResponse.json({ success: true, insight: created }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to create insight' },
      { status: 500 }
    )
  }
}

