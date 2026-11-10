import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { updateInsight, deleteInsight } from '@/lib/services/insights-service'

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
    const updated = await updateInsight(id, body)
    return NextResponse.json({ success: true, insight: updated })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to update insight' },
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
    await deleteInsight(id)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to delete insight' },
      { status: 500 }
    )
  }
}

