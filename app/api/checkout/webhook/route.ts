// TODO: install stripe — run: npm install stripe
// import Stripe from 'stripe'
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })

import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/checkout/webhook
 * Stripe webhook handler.
 *
 * TODO:
 *  1. npm install stripe
 *  2. Set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET in .env.local
 *  3. Register this endpoint in the Stripe Dashboard under Webhooks
 *  4. Handle the following events:
 *     - payment_intent.succeeded  → confirm order (set status: 'CONFIRMED')
 *     - payment_intent.payment_failed → update order status to 'CANCELLED' or add failure note
 *
 * NOTE: Next.js 16 requires the raw request body for signature verification.
 * Use `request.text()` (not `.json()`) before calling stripe.webhooks.constructEvent.
 */
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing Stripe signature header' }, { status: 400 })
    }

    // TODO: verify Stripe webhook signature
    // const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
    // let event: Stripe.Event
    // try {
    //   event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
    // } catch (err) {
    //   console.error('[POST /api/checkout/webhook] signature verification failed:', err)
    //   return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 })
    // }
    //
    // switch (event.type) {
    //   case 'payment_intent.succeeded': {
    //     const paymentIntent = event.data.object as Stripe.PaymentIntent
    //     const orderNumber = paymentIntent.metadata?.orderNumber
    //     if (orderNumber) {
    //       // TODO: import { updateOrderStatus } from '@/lib/db/schema/orders.firestore'
    //       // await updateOrderStatus(orderNumber, 'CONFIRMED', 'Payment successful')
    //       console.log('[webhook] payment_intent.succeeded — orderNumber:', orderNumber)
    //     }
    //     break
    //   }
    //
    //   case 'payment_intent.payment_failed': {
    //     const paymentIntent = event.data.object as Stripe.PaymentIntent
    //     const orderNumber = paymentIntent.metadata?.orderNumber
    //     if (orderNumber) {
    //       // await updateOrderStatus(orderNumber, 'CANCELLED', 'Payment failed')
    //       console.log('[webhook] payment_intent.payment_failed — orderNumber:', orderNumber)
    //     }
    //     break
    //   }
    //
    //   default:
    //     console.log('[webhook] unhandled event type:', event.type)
    // }
    //
    // return NextResponse.json({ received: true }, { status: 200 })

    console.log('[POST /api/checkout/webhook] raw body length:', rawBody.length)

    // Placeholder — remove once Stripe is integrated
    return NextResponse.json(
      { error: 'Stripe webhook not yet configured. TODO: npm install stripe and set STRIPE_WEBHOOK_SECRET' },
      { status: 501 }
    )
  } catch (error) {
    console.error('[POST /api/checkout/webhook] error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
