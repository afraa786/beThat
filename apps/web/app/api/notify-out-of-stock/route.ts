// TODO: install firebase — run: npm install firebase
import { NextRequest, NextResponse } from 'next/server'

interface NotifyOutOfStockBody {
  email: string
  productId: string
  sizeId: string
  userId?: string
}

/**
 * POST /api/notify-out-of-stock
 * Register a user's email to be notified when a product/size comes back in stock.
 * Body: { email, productId, sizeId, userId? }
 * Writes a doc to the notifyOutOfStock collection with isNotified: false.
 * TODO: Firestore write — createNotification(data)
 */
export async function POST(request: NextRequest) {
  try {
    const body: NotifyOutOfStockBody = await request.json()
    const { email, productId, sizeId, userId } = body

    if (!email?.trim()) {
      return NextResponse.json({ error: 'email is required' }, { status: 400 })
    }

    if (!productId) {
      return NextResponse.json({ error: 'productId is required' }, { status: 400 })
    }

    if (!sizeId) {
      return NextResponse.json({ error: 'sizeId is required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // TODO: replace with Firestore write
    // import { createNotification } from '@/lib/db/schema/notify-out-of-stock.firestore'
    // await createNotification({
    //   emailId: email,
    //   productRef: productId,
    //   sizeRef: sizeId,
    //   isNotified: false,
    //   ...(userId ? { userId } : {}),
    // })

    console.log('[POST /api/notify-out-of-stock] email:', email, 'productId:', productId, 'sizeId:', sizeId)

    return NextResponse.json(
      { message: 'You will be notified when this item is back in stock' },
      { status: 201 }
    )
  } catch (error) {
    console.error('[POST /api/notify-out-of-stock] error:', error)
    return NextResponse.json({ error: 'Failed to register out-of-stock notification' }, { status: 500 })
  }
}
