// TODO: install firebase — run: npm install firebase
import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{ id: string }>
}

type OrderStatus = 'PLACED' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'

interface AdminOrderPatchBody {
  address?: {
    fullName?: string
    phoneNumber?: string
    line1?: string
    line2?: string
    city?: string
    country?: string
    pinCode?: string
    latitude?: number
    longitude?: number
  }
  sizeChange?: {
    itemIndex: number
    newSizeRef: string
  }
  note?: string
  status?: OrderStatus
}

/**
 * GET /api/orders/[id]
 * Get a single order by ID.
 * TODO: Firestore — getOrderById(id). Add auth check to ensure user owns the order.
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
    }

    // TODO: auth check — verify the requesting user owns this order or is admin
    // import { getOrderById } from '@/lib/db/schema/orders.firestore'
    // const order = await getOrderById(id)
    // if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    // return NextResponse.json({ order }, { status: 200 })

    console.log('[GET /api/orders/:id] id:', id)

    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  } catch (error) {
    console.error('[GET /api/orders/:id] error:', error)
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 })
  }
}

/**
 * PATCH /api/orders/[id]
 * Admin edit of an order. Allowed fields: address, size change (before SHIPPED), note.
 * Body: { address?, sizeChange?, note?, status? }
 * TODO: Firestore update. Validate that order status allows edits (not SHIPPED/DELIVERED).
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
    }

    const body: AdminOrderPatchBody = await request.json()
    const { address, sizeChange, note, status } = body

    if (!address && !sizeChange && !note && !status) {
      return NextResponse.json(
        { error: 'At least one field (address, sizeChange, note, status) must be provided' },
        { status: 400 }
      )
    }

    // TODO: admin auth check — verify requesting user has admin role
    // TODO: fetch order and validate status allows edits
    // import { getOrderById, updateOrderStatus } from '@/lib/db/schema/orders.firestore'
    // const order = await getOrderById(id)
    // if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    //
    // const nonEditableStatuses: OrderStatus[] = ['SHIPPED', 'DELIVERED', 'CANCELLED']
    // if (sizeChange && nonEditableStatuses.includes(order.status)) {
    //   return NextResponse.json({ error: 'Size cannot be changed after order is shipped' }, { status: 400 })
    // }
    //
    // Build update payload and write to Firestore

    console.log('[PATCH /api/orders/:id] id:', id, 'body:', body)

    return NextResponse.json({ message: 'Order updated successfully' }, { status: 200 })
  } catch (error) {
    console.error('[PATCH /api/orders/:id] error:', error)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}
