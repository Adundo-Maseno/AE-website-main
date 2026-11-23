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
