// TODO: install firebase — run: npm install firebase
import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{ id: string }>
}

interface ReturnRequestBody {
  reason: string
  userId: string
}

/**
 * POST /api/orders/[id]/return
 * Submit a return request for an order.
 * Body: { reason, userId }
 * Writes returnRequested: true, returnReason, returnStatus: 'PENDING',
 * refundOrExchangeStatus: 'PENDING' to the order doc.
 * TODO: Firestore update — updateReturnStatus(id, data)
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
    }

    const body: ReturnRequestBody = await request.json()
    const { reason, userId } = body

    if (!reason?.trim()) {
      return NextResponse.json({ error: 'reason is required' }, { status: 400 })
    }

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    // TODO: auth check — verify the requesting user owns this order
    // TODO: validate order is in a returnable state (e.g. DELIVERED)
    // import { getOrderById, updateReturnStatus } from '@/lib/db/schema/orders.firestore'
    //
    // const order = await getOrderById(id)
    // if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    //
    // if (order.userId !== userId) {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    // }
    //
    // if (order.status !== 'DELIVERED') {
    //   return NextResponse.json({ error: 'Only delivered orders can be returned' }, { status: 400 })
    // }
    //
    // if (order.returnRequested) {
    //   return NextResponse.json({ error: 'Return already requested for this order' }, { status: 409 })
    // }
    //
    // await updateReturnStatus(id, {
    //   returnRequested: true,
    //   returnReason: reason,
    //   returnStatus: 'PENDING',
    //   refundOrExchangeStatus: 'PENDING',
    // })

    console.log('[POST /api/orders/:id/return] orderId:', id, 'userId:', userId, 'reason:', reason)

    return NextResponse.json(
      {
        message: 'Return request submitted successfully',
        returnStatus: 'PENDING',
        refundOrExchangeStatus: 'PENDING',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[POST /api/orders/:id/return] error:', error)
    return NextResponse.json({ error: 'Failed to submit return request' }, { status: 500 })
  }
}
