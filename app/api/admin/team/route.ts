import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getTeamMembers, createTeamMember } from '@/lib/services/team-service'

export async function GET() {
  try {
    const team = await getTeamMembers()
    return NextResponse.json({ team })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to fetch team members' },
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
    const { name, roleEn, roleFr, bioEn, bioFr, image, order } = body

    if (!name || !roleEn) {
      return NextResponse.json(
        { error: 'Name and English role are required' },
        { status: 400 }
      )
    }

    const created = await createTeamMember({
      name,
      roleEn,
      roleFr,
      bioEn,
      bioFr,
      image,
      order: typeof order === 'number' ? order : 0,
    })

    return NextResponse.json({ success: true, teamMember: created }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to create team member' },
      { status: 500 }
    )
  }
}
