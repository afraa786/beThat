// TODO: install firebase
// TODO: import { db } from '@/lib/firebase'
// TODO: import { doc, getDoc } from 'firebase/firestore'

import type { Metadata } from 'next'
import Link from 'next/link'
import type { OrderConfirmationData } from './schema'

export const metadata: Metadata = {
  title: 'Order Confirmed',
  description: 'Your Be That Percent order has been placed successfully.',
}

// ─── Data Fetching ────────────────────────────────────────────────────────────
async function getOrder(orderId: string): Promise<OrderConfirmationData | null> {
  // TODO: const snap = await getDoc(doc(db, 'orders', orderId))
  // TODO: if (!snap.exists()) return null
  // TODO: Validate that the logged-in user owns this order before returning data
  //       (compare snap.data().userId with auth.currentUser?.uid)
  // TODO: return { orderId: snap.id, ...snap.data() } as OrderConfirmationData

  // Stub — remove once Firestore is wired up
  void orderId
  return null
}

// ─── Page ─────────────────────────────────────────────────────────────────────
// orderId comes from the query string: /order-confirmation?orderId=abc123
export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>
}) {
  const { orderId } = await searchParams

  if (!orderId) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="text-gray-500 text-sm">No order ID provided.</p>
        <Link href="/products" className="mt-4 inline-block text-sm underline text-black">
          Continue Shopping
        </Link>
      </div>
    )
  }

  const order = await getOrder(orderId)

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="text-gray-500 text-sm">Order not found or you don&apos;t have access.</p>
        <Link href="/account/orders" className="mt-4 inline-block text-sm underline text-black">
          View My Orders
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      {/* ── Success Header ────────────────────────────────────────────────── */}
      <div className="text-center space-y-3 mb-10">
        {/* TODO: Replace with a Lottie / CSS success animation */}
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto text-2xl">
          ✓
        </div>
        <h1 className="text-2xl font-bold text-black">Thank you for your order!</h1>
        <p className="text-sm text-gray-600">
          Order <span className="font-semibold text-black">{order.orderNumber}</span> confirmed.
        </p>
        {order.estimatedDelivery && (
          <p className="text-sm text-gray-500">
            Estimated delivery:{' '}
            <span className="font-medium text-black">
              {new Date(order.estimatedDelivery).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </span>
          </p>
        )}
        {/* TODO: Send order confirmation email via /api/send-confirmation-email once order is confirmed */}
      </div>

      {/* ── Order Items ───────────────────────────────────────────────────── */}
      <section className="border border-neutral-200 rounded-lg divide-y divide-neutral-100 mb-6">
        {order.items.map((item, i) => (
          <div key={i} className="flex gap-4 p-4">
            <div className="w-16 h-16 bg-neutral-100 rounded-md shrink-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-black truncate">{item.productName}</p>
              <p className="text-xs text-gray-500 mt-0.5">Size: {item.size} · Qty: {item.quantity}</p>
              <p className="text-sm font-medium text-black mt-1">
                ₹{(item.priceAtPurchase * item.quantity).toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* ── Price Summary ─────────────────────────────────────────────────── */}
      <section className="border border-neutral-200 rounded-lg p-5 space-y-2 text-sm mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
        </div>
        {order.discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount {order.couponCode ? `(${order.couponCode})` : ''}</span>
            <span>−₹{order.discount.toLocaleString('en-IN')}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{order.shippingCharge === 0 ? 'Free' : `₹${order.shippingCharge.toLocaleString('en-IN')}`}</span>
        </div>
        <hr className="border-neutral-200" />
        <div className="flex justify-between font-semibold text-black text-base">
          <span>Total</span>
          <span>₹{order.total.toLocaleString('en-IN')}</span>
        </div>
      </section>

      {/* ── Shipping Address ──────────────────────────────────────────────── */}
      <section className="border border-neutral-200 rounded-lg p-5 mb-6">
        <h2 className="text-sm font-semibold text-black mb-2">Shipping To</h2>
        <p className="text-sm text-gray-600">{order.shippingAddress.fullName}</p>
        <p className="text-sm text-gray-600">{order.shippingAddress.addressLine1}</p>
        {order.shippingAddress.addressLine2 && (
          <p className="text-sm text-gray-600">{order.shippingAddress.addressLine2}</p>
        )}
        <p className="text-sm text-gray-600">
          {order.shippingAddress.city}, {order.shippingAddress.state} — {order.shippingAddress.pincode}
        </p>
        <p className="text-sm text-gray-600 mt-1">{order.shippingAddress.phoneNumber}</p>
      </section>

      {/* ── Tracking ─────────────────────────────────────────────────────── */}
      {order.trackingUrl && (
        <section className="border border-neutral-200 rounded-lg p-5 mb-6">
          <h2 className="text-sm font-semibold text-black mb-2">Track Your Order</h2>
          {/* TODO: Embed tracking widget or simply link to courier tracking URL */}
          <a
            href={order.trackingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-black underline hover:text-gray-600"
          >
            Track Shipment →
          </a>
        </section>
      )}

      {/* ── Actions ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/account/orders"
          className="flex-1 text-center py-3 border border-black text-black text-sm font-semibold rounded-lg hover:bg-neutral-50 transition-colors"
        >
          View All Orders
        </Link>
        <Link
          href="/products"
          className="flex-1 text-center py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-neutral-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
