'use client'

// TODO: install firebase
// TODO: import { db } from '@/lib/firebase'
// TODO: import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
// TODO: import { useAuth } from '@/hooks/useAuth'
// TODO: import { useCart } from '@/hooks/useCart'
// TODO: import { useCheckout } from '@/hooks/useCheckout'

import { useState } from 'react'
import type { CheckoutFormData } from './schema'

// ─── Step definitions ─────────────────────────────────────────────────────────
type Step = 'address' | 'payment' | 'confirmation'

const STEPS: { key: Step; label: string }[] = [
  { key: 'address', label: 'Address' },
  { key: 'payment', label: 'Payment' },
  { key: 'confirmation', label: 'Confirmation' },
]

// ─── Stub hooks — replace with real implementations ──────────────────────────
function useCheckoutStub() {
  // TODO: Replace with useCheckout() hook
  // Hook should manage: formData, currentStep, submitOrder, loading, error, orderId
  const submitOrder = async (_data: CheckoutFormData): Promise<string> => {
    // TODO: POST to /api/checkout or write order doc to Firestore:
    //   const orderRef = await addDoc(collection(db, 'orders'), {
    //     ...data,
    //     userId: user?.uid ?? null,
    //     cartItems,
    //     status: 'pending',
    //     createdAt: serverTimestamp(),
    //   })
    //   Then clear cart via useCart().clearCart()
    //   Return orderRef.id
    return 'ORDER-STUB-001'
  }
  return { submitOrder, loading: false, error: null }
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function AddressStep({
  data,
  onChange,
  onNext,
}: {
  data: Partial<CheckoutFormData>
  onChange: (field: keyof CheckoutFormData, value: string) => void
  onNext: () => void
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-black">Delivery Address</h2>

      {[
        { id: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Priya Sharma' },
        { id: 'email', label: 'Email', type: 'email', placeholder: 'priya@example.com' },
        { id: 'phoneNumber', label: 'Phone Number', type: 'tel', placeholder: '+91 98765 43210' },
        { id: 'addressLine1', label: 'Address Line 1', type: 'text', placeholder: 'Flat 4B, Rose Apartments' },
        { id: 'addressLine2', label: 'Address Line 2 (optional)', type: 'text', placeholder: 'Near City Mall' },
        { id: 'city', label: 'City', type: 'text', placeholder: 'Mumbai' },
        { id: 'state', label: 'State', type: 'text', placeholder: 'Maharashtra' },
        { id: 'pincode', label: 'PIN Code', type: 'text', placeholder: '400001' },
      ].map(({ id, label, type, placeholder }) => (
        <div key={id}>
          <label htmlFor={id} className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={(data as Record<string, string>)[id] ?? ''}
            onChange={(e) => onChange(id as keyof CheckoutFormData, e.target.value)}
            className="w-full border border-neutral-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
          {/* TODO: Show field-level validation error from checkoutSchema */}
        </div>
      ))}

      {/* TODO: Pre-fill address from logged-in user's saved address in Firestore */}
      {/* TODO: Add "Save this address" checkbox for logged-in users */}

      <button
        onClick={onNext}
        className="w-full py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-neutral-800 transition-colors"
      >
        Continue to Payment
      </button>
    </div>
  )
}

function PaymentStep({
  onBack,
  onSubmit,
  loading,
}: {
  onBack: () => void
  onSubmit: () => void
  loading: boolean
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-black">Payment</h2>

      {/* TODO: Integrate Razorpay / Stripe checkout
              On success, call onSubmit() to record the order in Firestore with status 'paid'
              On failure, show error and allow retry */}
      <div className="border border-neutral-200 rounded-lg p-6 text-center space-y-3">
        <p className="text-sm text-gray-500">Payment gateway integration pending.</p>
        {/* TODO: Mount <RazorpayButton /> or <StripePaymentElement /> here */}
        <p className="text-xs text-gray-400">
          TODO: Install and configure Razorpay or Stripe SDK
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 border border-neutral-300 text-black text-sm font-semibold rounded-lg hover:bg-neutral-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="flex-1 py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50"
        >
          {loading ? 'Placing Order…' : 'Place Order'}
        </button>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<Step>('address')
  const [formData, setFormData] = useState<Partial<CheckoutFormData>>({})
  const [orderId, setOrderId] = useState<string | null>(null)
  const { submitOrder, loading } = useCheckoutStub()

  const handleFieldChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddressNext = () => {
    // TODO: Validate address fields using checkoutSchema before advancing
    setCurrentStep('payment')
  }

  const handlePaymentSubmit = async () => {
    // TODO: Validate that payment has been collected before calling submitOrder
    const id = await submitOrder(formData as CheckoutFormData)
    setOrderId(id)
    setCurrentStep('confirmation')
  }

  const activeIndex = STEPS.findIndex((s) => s.key === currentStep)

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-black mb-8">Checkout</h1>

      {/* ── Step Indicator ───────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((step, i) => (
          <div key={step.key} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                i < activeIndex
                  ? 'bg-black text-white'
                  : i === activeIndex
                  ? 'bg-black text-white ring-2 ring-black ring-offset-2'
                  : 'bg-neutral-200 text-gray-400'
              }`}
            >
              {i < activeIndex ? '✓' : i + 1}
            </div>
            <span className={`text-xs hidden sm:inline ${i === activeIndex ? 'font-semibold text-black' : 'text-gray-400'}`}>
              {step.label}
            </span>
            {i < STEPS.length - 1 && <div className="w-8 h-px bg-neutral-200 mx-1" />}
          </div>
        ))}
      </div>

      {/* ── Step Content ─────────────────────────────────────────────────── */}
      {currentStep === 'address' && (
        <AddressStep data={formData} onChange={handleFieldChange} onNext={handleAddressNext} />
      )}

      {currentStep === 'payment' && (
        <PaymentStep onBack={() => setCurrentStep('address')} onSubmit={handlePaymentSubmit} loading={loading} />
      )}

      {currentStep === 'confirmation' && (
        <div className="text-center space-y-4 py-12">
          <div className="text-4xl">🎉</div>
          <h2 className="text-xl font-bold text-black">Order Placed!</h2>
          <p className="text-sm text-gray-600">
            Your order <span className="font-semibold text-black">{orderId}</span> has been placed successfully.
          </p>
          <a
            href={`/order-confirmation?orderId=${orderId}`}
            className="inline-block mt-4 px-6 py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-neutral-800 transition-colors"
          >
            View Order Confirmation
          </a>
          {/* TODO: Also send confirmation email via /api/send-confirmation-email */}
        </div>
      )}
    </div>
  )
}
