import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { updateResource, deleteResource } from '@/lib/services/resources-service'

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

    const updated = await updateResource(id, body)
    return NextResponse.json({ success: true, resource: updated })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to update resource' },
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
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await deleteResource(id)
    return NextResponse.json({ success: true, message: 'Resource deleted' })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to delete resource' },
      { status: 500 }
    )
  }
}
