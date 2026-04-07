// TODO: install firebase — run: npm install firebase
import { NextRequest, NextResponse } from 'next/server'

interface ApplyCouponBody {
  code: string
  userId: string
  cartTotal: number
}

/**
 * POST /api/cart/apply-coupon
 * Validate and apply a coupon code to the cart.
 * Body: { code, userId, cartTotal }
 * TODO: call coupon validation logic from coupons.firestore.ts
 */
export async function POST(request: NextRequest) {
  try {
    const body: ApplyCouponBody = await request.json()
    const { code, userId, cartTotal } = body

    if (!code || !userId || cartTotal === undefined || cartTotal === null) {
      return NextResponse.json(
        { error: 'code, userId, and cartTotal are required' },
        { status: 400 }
      )
    }

    if (cartTotal < 0) {
      return NextResponse.json({ error: 'cartTotal must be a non-negative number' }, { status: 400 })
    }

    // TODO: replace with Firestore coupon validation
    // import { getCouponByCode, incrementUsageCount } from '@/lib/db/schema/coupons.firestore'
    // const coupon = await getCouponByCode(code)
    //
    // if (!coupon || !coupon.isActive) {
    //   return NextResponse.json({ error: 'Invalid or inactive coupon' }, { status: 400 })
    // }
    //
    // const now = new Date()
    // if (coupon.expiryDate && coupon.expiryDate.seconds * 1000 < now.getTime()) {
    //   return NextResponse.json({ error: 'Coupon has expired' }, { status: 400 })
    // }
    //
    // if (coupon.limit !== undefined && coupon.usageCount >= coupon.limit) {
    //   return NextResponse.json({ error: 'Coupon usage limit reached' }, { status: 400 })
    // }
    //
    // if (coupon.minAmount !== undefined && cartTotal < coupon.minAmount) {
    //   return NextResponse.json(
    //     { error: `Minimum order amount of ${coupon.minAmount} required` },
    //     { status: 400 }
    //   )
    // }
    //
    // if (coupon.applicableUsers?.length && !coupon.applicableUsers.includes(userId)) {
    //   return NextResponse.json({ error: 'Coupon not applicable for this user' }, { status: 400 })
    // }
    //
    // const rawDiscount = (cartTotal * coupon.discountPercentage) / 100
    // const discount = coupon.maxAmount ? Math.min(rawDiscount, coupon.maxAmount) : rawDiscount
    //
    // return NextResponse.json({ valid: true, discount, coupon })

    console.log('[POST /api/cart/apply-coupon] code:', code, 'userId:', userId, 'cartTotal:', cartTotal)

    // Placeholder — remove once Firestore is integrated
    return NextResponse.json({ error: 'Coupon validation not yet implemented' }, { status: 501 })
  } catch (error) {
    console.error('[POST /api/cart/apply-coupon] error:', error)
    return NextResponse.json({ error: 'Failed to apply coupon' }, { status: 500 })
  }
}
