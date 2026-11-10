import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { updateTeamMember, deleteTeamMember } from '@/lib/services/team-service'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await req.json()

    const updated = await updateTeamMember(id, body)
    return NextResponse.json({ success: true, teamMember: updated })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to update team member' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await deleteTeamMember(id)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to delete team member' },
      { status: 500 }
    )
  }
}
