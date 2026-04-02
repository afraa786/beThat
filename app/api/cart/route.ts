// TODO: install firebase — run: npm install firebase
import { NextRequest, NextResponse } from 'next/server'

interface AddItemBody {
  productId: string
  sizeId: string
  quantity: number
  userId: string
}

interface RemoveItemBody {
  itemIndex: number
  userId: string
}

/**
 * GET /api/cart
 * Get cart for authenticated user.
 * Expects ?userId= query param (replace with session-based auth once next-auth is configured).
 * TODO: Firestore — getCartByUserId(userId)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    // TODO: replace with Firestore cart lookup
    // import { getCartByUserId } from '@/lib/db/schema/cart.firestore'
    // const cart = await getCartByUserId(userId)
    // return NextResponse.json({ cart: cart ?? { userId, items: [] } })

    console.log('[GET /api/cart] userId:', userId)

    return NextResponse.json({ cart: { userId, items: [] } }, { status: 200 })
  } catch (error) {
    console.error('[GET /api/cart] error:', error)
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 })
  }
}

/**
 * POST /api/cart
 * Add an item to the cart.
 * Body: { productId, sizeId, quantity, userId }
 * TODO: Firestore — addItemToCart(userId, { productRef, sizeRef, quantity })
 */
export async function POST(request: NextRequest) {
  try {
    const body: AddItemBody = await request.json()
    const { productId, sizeId, quantity, userId } = body

    if (!productId || !sizeId || !quantity || !userId) {
      return NextResponse.json(
        { error: 'productId, sizeId, quantity, and userId are required' },
        { status: 400 }
      )
    }

    if (quantity < 1) {
      return NextResponse.json({ error: 'quantity must be at least 1' }, { status: 400 })
    }

    // TODO: replace with Firestore cart operation
    // import { addItemToCart } from '@/lib/db/schema/cart.firestore'
    // await addItemToCart(userId, { productRef: productId, sizeRef: sizeId, quantity })

    console.log('[POST /api/cart] adding item:', { productId, sizeId, quantity, userId })

    return NextResponse.json({ message: 'Item added to cart' }, { status: 200 })
  } catch (error) {
    console.error('[POST /api/cart] error:', error)
    return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 })
  }
}

/**
 * DELETE /api/cart
 * Remove an item from cart by index.
 * Body: { itemIndex, userId }
 * TODO: Firestore — removeItemFromCart(userId, itemIndex)
 */
export async function DELETE(request: NextRequest) {
  try {
    const body: RemoveItemBody = await request.json()
    const { itemIndex, userId } = body

    if (itemIndex === undefined || itemIndex === null || !userId) {
      return NextResponse.json({ error: 'itemIndex and userId are required' }, { status: 400 })
    }

    if (itemIndex < 0) {
      return NextResponse.json({ error: 'itemIndex must be a non-negative integer' }, { status: 400 })
    }

    // TODO: replace with Firestore cart operation
    // import { removeItemFromCart } from '@/lib/db/schema/cart.firestore'
    // await removeItemFromCart(userId, itemIndex)

    console.log('[DELETE /api/cart] removing item at index:', itemIndex, 'for userId:', userId)

    return NextResponse.json({ message: 'Item removed from cart' }, { status: 200 })
  } catch (error) {
    console.error('[DELETE /api/cart] error:', error)
    return NextResponse.json({ error: 'Failed to remove item from cart' }, { status: 500 })
  }
}
