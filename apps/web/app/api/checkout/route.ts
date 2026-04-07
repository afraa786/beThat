// TODO: install firebase — run: npm install firebase
import { NextRequest, NextResponse } from 'next/server'

interface CheckoutAddress {
  fullName: string
  phoneNumber: string
  line1: string
  line2?: string
  city?: string
  country: string
  pinCode: string
  latitude: number
  longitude: number
}

interface CheckoutItem {
  productId: string
  sizeId: string
  quantity: number
  price: number
}

interface PlaceOrderBody {
  userId: string
  items: CheckoutItem[]
  address: CheckoutAddress
  subtotal: number
  shippingCost: number
  discount: number
  totalAmount: number
  coupon?: string
}

/**
 * Generates a unique BTP order number in the format BTPXXXXX (5 random digits).
 */
function generateOrderNumber(): string {
  const digits = Math.floor(10000 + Math.random() * 90000).toString()
  return `BTP${digits}`
}

function validateAddress(address: CheckoutAddress): string | null {
  if (!address.fullName?.trim()) return 'fullName is required in address'
  if (!address.phoneNumber?.trim()) return 'phoneNumber is required in address'
  if (!address.line1?.trim()) return 'line1 is required in address'
  if (!address.country?.trim()) return 'country is required in address'
  if (!address.pinCode?.trim()) return 'pinCode is required in address'
  return null
}

/**
 * POST /api/checkout
 * Place an order. Validates address, checks inventory, creates order doc,
 * auto-generates orderNumber (format BTPXXXXX), and updates cart.
 * TODO: wrap in a Firestore transaction for atomicity
 */
export async function POST(request: NextRequest) {
  try {
    const body: PlaceOrderBody = await request.json()
    const { userId, items, address, subtotal, shippingCost, discount, totalAmount, coupon } = body

    // --- Input validation ---
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Order must contain at least one item' }, { status: 400 })
    }

    if (!address) {
      return NextResponse.json({ error: 'Delivery address is required' }, { status: 400 })
    }

    const addressError = validateAddress(address)
    if (addressError) {
      return NextResponse.json({ error: addressError }, { status: 400 })
    }

    for (const item of items) {
      if (!item.productId || !item.sizeId || !item.quantity || item.quantity < 1) {
        return NextResponse.json(
          { error: 'Each item must have productId, sizeId, and quantity >= 1' },
          { status: 400 }
        )
      }
    }

    const orderNumber = generateOrderNumber()

    // TODO: replace with Firestore transaction
    // import { db } from '@/lib/firebase'
    // import { runTransaction, collection, doc, serverTimestamp } from 'firebase/firestore'
    // import { getProductById } from '@/lib/db/schema/products.firestore'
    // import { createOrder } from '@/lib/db/schema/orders.firestore'
    // import { clearCart } from '@/lib/db/schema/cart.firestore'
    //
    // await runTransaction(db, async (transaction) => {
    //   // 1. Check inventory for each item
    //   for (const item of items) {
    //     const product = await getProductById(item.productId)  // use transaction.get inside runTransaction
    //     const sizeEntry = product?.sizes.find((s) => s.sizeRef === item.sizeId)
    //     if (!sizeEntry || sizeEntry.inventory < item.quantity) {
    //       throw new Error(`Insufficient inventory for product ${item.productId}, size ${item.sizeId}`)
    //     }
    //   }
    //
    //   // 2. Decrement inventory
    //   // (update each product doc inside the transaction)
    //
    //   // 3. Create order document
    //   const now = serverTimestamp()
    //   await createOrder({
    //     userId,
    //     orderNumber,
    //     products: items.map((i) => ({
    //       productRef: i.productId,
    //       sizeRef: i.sizeId,
    //       price: i.price,
    //       quantity: i.quantity,
    //     })),
    //     address,
    //     subtotal, shippingCost, discount, totalAmount,
    //     coupon,
    //     status: 'PLACED',
    //     statusUpdates: [{ status: 'PLACED', timestamp: now }],
    //   })
    //
    //   // 4. Clear cart
    //   await clearCart(userId)
    // })

    console.log('[POST /api/checkout] placing order:', orderNumber, 'for userId:', userId)

    return NextResponse.json(
      {
        message: 'Order placed successfully',
        orderNumber,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[POST /api/checkout] error:', error)
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 })
  }
}
