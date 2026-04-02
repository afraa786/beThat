// TODO: install stripe — run: npm install stripe
// import Stripe from 'stripe'
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })

import { NextRequest, NextResponse } from 'next/server'

interface PaymentIntentBody {
  amount: number   // in smallest currency unit, e.g. paise for INR, cents for USD
  currency: string // e.g. 'inr', 'usd'
  userId?: string
  orderNumber?: string
}

/**
 * POST /api/checkout/payment-intent
 * Create a Stripe PaymentIntent.
 * Body: { amount, currency, userId?, orderNumber? }
 * TODO: install stripe, set STRIPE_SECRET_KEY in .env.local
 */
export async function POST(request: NextRequest) {
  try {
    const body: PaymentIntentBody = await request.json()
    const { amount, currency, userId, orderNumber } = body

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'amount must be a positive number' }, { status: 400 })
    }

    if (!currency) {
      return NextResponse.json({ error: 'currency is required' }, { status: 400 })
    }

    // TODO: replace with Stripe PaymentIntent creation
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: Math.round(amount),   // must be integer
    //   currency: currency.toLowerCase(),
    //   metadata: {
    //     ...(userId ? { userId } : {}),
    //     ...(orderNumber ? { orderNumber } : {}),
    //   },
    //   automatic_payment_methods: { enabled: true },
    // })
    //
    // return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 200 })

    console.log('[POST /api/checkout/payment-intent] amount:', amount, 'currency:', currency)

    // Placeholder — remove once Stripe is integrated
    return NextResponse.json(
      { error: 'Stripe not yet configured. TODO: npm install stripe and set STRIPE_SECRET_KEY' },
      { status: 501 }
    )
  } catch (error) {
    console.error('[POST /api/checkout/payment-intent] error:', error)
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 })
  }
}
