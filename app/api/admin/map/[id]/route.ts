import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { updateCountry, deleteCountry } from '@/lib/services/map-service'

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
    const updated = await updateCountry(id, body)
    return NextResponse.json({ success: true, country: updated })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to update country' },
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
    await deleteCountry(id)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to delete country record' },
      { status: 500 }
    )
  }
}

