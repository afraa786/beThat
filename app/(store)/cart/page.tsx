'use client'

// TODO: import { useCart } from '@/hooks/useCart'
// TODO: The useCart hook should expose: items, removeItem, updateQuantity, subtotal, clearCart
// TODO: install firebase — cart can be persisted to Firestore for logged-in users or localStorage for guests

import Link from 'next/link'

// ─── Placeholder Types (move to @/types/cart.ts) ─────────────────────────────
type CartItem = {
  productId: string
  productName: string
  slug: string
  imageUrl: string
  size: string
  price: number
  quantity: number
}

// ─── Stub cart state — replace entirely with useCart() hook ──────────────────
function useCartStub() {
  // TODO: Replace this stub with the real useCart hook
  const items: CartItem[] = []
  const subtotal = 0
  const removeItem = (_productId: string, _size: string) => { /* TODO */ }
  const updateQuantity = (_productId: string, _size: string, _qty: number) => { /* TODO */ }
  const clearCart = () => { /* TODO */ }
  return { items, subtotal, removeItem, updateQuantity, clearCart }
}

export default function CartPage() {
  const { items, subtotal, removeItem, updateQuantity } = useCartStub()

  // TODO: Apply coupon code — POST to /api/coupon/validate with { code, subtotal }
  //       and store { discount, discountType } in local state
  const applyCoupon = async (_code: string) => { /* TODO */ }

  const isEmpty = items.length === 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-black mb-8">Your Cart</h1>

      {isEmpty ? (
        /* ── Empty State ─────────────────────────────────────────────────── */
        <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
          {/* TODO: Add an empty cart illustration */}
          <p className="text-gray-500 text-sm">Your cart is empty.</p>
          <Link href="/products" className="text-sm underline text-black hover:text-gray-600">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Cart Items ───────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.size}`}
                className="flex gap-4 border border-neutral-200 rounded-lg p-4"
              >
                {/* Product image */}
                <div className="w-24 h-24 shrink-0 bg-neutral-100 rounded-md overflow-hidden">
                  {/* TODO: Replace with <Image> from next/image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.slug}`} className="text-sm font-semibold text-black hover:underline truncate block">
                    {item.productName}
                  </Link>
                  <p className="text-xs text-gray-500 mt-0.5">Size: {item.size}</p>
                  <p className="text-sm font-medium text-black mt-1">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    {/* Quantity stepper */}
                    <div className="flex items-center border border-neutral-200 rounded-md">
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="px-2 py-1 text-sm text-gray-600 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        −
                      </button>
                      <span className="px-3 text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                        className="px-2 py-1 text-sm text-gray-600 hover:bg-neutral-50"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.productId, item.size)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Order Summary ────────────────────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="border border-neutral-200 rounded-lg p-6 space-y-4">
              <h2 className="text-lg font-semibold text-black">Order Summary</h2>

              {/* Coupon input */}
              <div>
                <label htmlFor="coupon" className="text-xs font-medium text-gray-600 block mb-1">
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    id="coupon"
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 border border-neutral-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <button
                    onClick={() => {
                      const el = document.getElementById('coupon') as HTMLInputElement
                      applyCoupon(el?.value ?? '')
                    }}
                    className="px-3 py-2 bg-black text-white text-sm rounded-md hover:bg-neutral-800 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {/* TODO: Show success/error message after coupon validation */}
                {/* TODO: Show discount line item if coupon is valid */}
              </div>

              <hr className="border-neutral-200" />

              {/* Subtotal */}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-black">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {/* TODO: Add shipping estimate line — free above a threshold, otherwise show flat rate */}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-500">Calculated at checkout</span>
              </div>

              <hr className="border-neutral-200" />

              <div className="flex justify-between text-base font-semibold text-black">
                <span>Total</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              <Link
                href="/checkout"
                className="block w-full text-center py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-neutral-800 transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
