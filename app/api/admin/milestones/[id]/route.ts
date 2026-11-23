import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import {
  updateWorkMilestone,
  deleteWorkMilestone,
} from '@/lib/services/milestones-service'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await req.json()

    if (body.startYear !== undefined) {
      const parsedStart = Number(body.startYear)
      if (!Number.isInteger(parsedStart) || parsedStart < 1990 || parsedStart > 2100) {
        return NextResponse.json(
          { success: false, error: 'Start year must be a valid 4-digit year' },
          { status: 400 }
        )
      }
      body.startYear = parsedStart
    }

    if (body.endYear !== undefined) {
      if (body.endYear === null || body.endYear === '') {
        body.endYear = null
      } else {
        const parsedEnd = Number(body.endYear)
        if (
          !Number.isInteger(parsedEnd) ||
          parsedEnd > 2100 ||
          (body.startYear !== undefined && parsedEnd < body.startYear)
        ) {
          return NextResponse.json(
            {
              success: false,
              error: 'End year must be a valid year greater than or equal to start year',
            },
            { status: 400 }
          )
        }
        body.endYear = parsedEnd
      }
    }

    const milestone = await updateWorkMilestone(id, body)
    return NextResponse.json({ success: true, milestone })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to update milestone' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await deleteWorkMilestone(id)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to delete milestone' },
      { status: 500 }
    )
  }
}
