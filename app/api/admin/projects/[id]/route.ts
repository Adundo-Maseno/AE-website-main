import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { updateProject, deleteProject } from '@/lib/services/projects-service'

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

    const updated = await updateProject(id, body)
    return NextResponse.json({ success: true, project: updated })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to update project' },
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
    await deleteProject(id)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to delete project' },
      { status: 500 }
    )
  }
}
