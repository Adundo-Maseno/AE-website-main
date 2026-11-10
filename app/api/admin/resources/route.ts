import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getResources, createResource } from '@/lib/services/resources-service'

export async function GET() {
  try {
    const resources = await getResources()
    return NextResponse.json({ resources })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to fetch resources' },
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
    const { titleEn, titleFr, link, client, citationEn, citationFr, clientLink, category } = body

    if (!titleEn || !link || !client || !citationEn || !category) {
      return NextResponse.json(
        { error: 'titleEn, link, client, citationEn, and category are required' },
        { status: 400 }
      )
    }

    const created = await createResource({
      titleEn,
      titleFr,
      link,
      client,
      citationEn,
      citationFr,
      clientLink,
      category,
    })

    return NextResponse.json({ success: true, resource: created }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to create resource' },
      { status: 500 }
    )
  }
}
