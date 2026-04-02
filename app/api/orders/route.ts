// TODO: install firebase — run: npm install firebase
import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/orders
 * List all orders for an authenticated user.
 * Expects ?userId= query param (replace with session-based auth once next-auth is configured).
 * TODO: Firestore query — getOrdersByUserId(userId)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    // TODO: replace with Firestore query
    // import { getOrdersByUserId } from '@/lib/db/schema/orders.firestore'
    // const orders = await getOrdersByUserId(userId)
    // return NextResponse.json({ orders }, { status: 200 })

    console.log('[GET /api/orders] userId:', userId)

    // Placeholder response until Firestore is wired up
    const orders: unknown[] = []
    return NextResponse.json({ orders }, { status: 200 })
  } catch (error) {
    console.error('[GET /api/orders] error:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}
