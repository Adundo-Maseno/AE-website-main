import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getProjects, createProject } from '@/lib/services/projects-service'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category') || undefined
    const projects = await getProjects(category)
    return NextResponse.json({ projects })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to fetch projects' },
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
    const { titleEn, titleFr, descEn, descFr, category, client, year, order } = body

    if (!titleEn || !descEn || !category) {
      return NextResponse.json(
        { error: 'titleEn, descEn, and category are required' },
        { status: 400 }
      )
    }

    const created = await createProject({
      titleEn,
      titleFr,
      descEn,
      descFr,
      category,
      client,
      year,
      order: typeof order === 'number' ? order : 0,
    })

    return NextResponse.json({ success: true, project: created }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to create project' },
      { status: 500 }
    )
  }
}
