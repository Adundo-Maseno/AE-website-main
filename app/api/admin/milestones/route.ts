import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import {
  getAllWorkMilestonesAdmin,
  createWorkMilestone,
  formatYearRange,
} from '@/lib/services/milestones-service'

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const milestones = await getAllWorkMilestonesAdmin()
    return NextResponse.json({ success: true, milestones })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to fetch milestones' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const {
      startYear,
      endYear,
      titleEn,
      titleFr,
      client,
      location,
      locationFr,
      serviceArea,
      icon,
      order,
      active,
    } = body

    const parsedStart = Number(startYear)
    const parsedEnd =
      endYear !== null && endYear !== undefined && endYear !== '' ? Number(endYear) : null

    if (!Number.isInteger(parsedStart) || parsedStart < 1990 || parsedStart > 2100) {
      return NextResponse.json(
        { success: false, error: 'A valid 4-digit start year is required' },
        { status: 400 }
      )
    }

    if (
      parsedEnd !== null &&
      (!Number.isInteger(parsedEnd) || parsedEnd < parsedStart || parsedEnd > 2100)
    ) {
      return NextResponse.json(
        { success: false, error: 'End year must be a valid year greater than or equal to start year' },
        { status: 400 }
      )
    }

    if (!titleEn || !location) {
      return NextResponse.json(
        { success: false, error: 'English title and location are required' },
        { status: 400 }
      )
    }

    const normalizedEnd = parsedEnd && parsedEnd > parsedStart ? parsedEnd : null

    const milestone = await createWorkMilestone({
      startYear: parsedStart,
      endYear: normalizedEnd,
      yearRange: formatYearRange(parsedStart, normalizedEnd),
      titleEn: String(titleEn).trim(),
      titleFr: titleFr ? String(titleFr).trim() : null,
      client: client ? String(client).trim() : null,
      location: String(location).trim(),
      locationFr: locationFr ? String(locationFr).trim() : null,
      serviceArea: serviceArea || 'project-implementation',
      icon: icon || 'sprout',
      order: typeof order === 'number' ? order : Number(order) || 0,
      active: typeof active === 'boolean' ? active : true,
    })

    return NextResponse.json({ success: true, milestone }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to create milestone' },
      { status: 500 }
    )
  }
}
