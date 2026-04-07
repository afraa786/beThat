'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

interface CartSummaryProps {
  subtotal: number;
  shippingCost: number;
  discount: number;
  totalAmount: number;
  couponCode?: string;
}

function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

// TODO: POST to /api/cart/apply-coupon — replace stub
async function applyCoupon(code: string): Promise<{ success: boolean; message: string }> {
  console.log('[CartSummary stub] applying coupon:', code);
  // TODO: const res = await fetch('/api/cart/apply-coupon', { method: 'POST', body: JSON.stringify({ code }) });
  return { success: false, message: 'Coupon API not yet implemented.' };
}

export default function CartSummary({
  subtotal,
  shippingCost,
  discount,
  totalAmount,
  couponCode,
}: CartSummaryProps) {
  const [couponInput, setCouponInput] = useState(couponCode ?? '');
  const [couponStatus, setCouponStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  async function handleApplyCoupon(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    try {
      const result = await applyCoupon(couponInput.trim());
      setCouponStatus(result);
    } catch {
      setCouponStatus({ success: false, message: 'Something went wrong. Please try again.' });
    } finally {
      setCouponLoading(false);
    }
  }

  const isFreeShipping = shippingCost === 0;

  return (
    <div className="space-y-3">
      {/* Coupon input */}
      <form onSubmit={handleApplyCoupon} className="flex gap-2">
        <label htmlFor="coupon-code" className="sr-only">
          Coupon code
        </label>
        <input
          id="coupon-code"
          type="text"
          value={couponInput}
          onChange={(e) => setCouponInput(e.target.value)}
          placeholder="Coupon code"
          className="flex-1 rounded border border-neutral-300 px-3 py-1.5 text-sm focus:border-black focus:outline-none"
        />
        <button
          type="submit"
          disabled={couponLoading}
          className="rounded bg-neutral-800 px-3 py-1.5 text-sm font-medium text-white hover:bg-black disabled:opacity-50"
        >
          {couponLoading ? '...' : 'Apply'}
        </button>
      </form>

      {couponStatus && (
        <p className={`text-xs ${couponStatus.success ? 'text-green-600' : 'text-red-600'}`}>
          {couponStatus.message}
        </p>
      )}

      {/* Price breakdown */}
      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between text-neutral-600">
          <span>Subtotal</span>
          <span>{formatINR(subtotal)}</span>
        </div>
        <div className="flex justify-between text-neutral-600">
          <span>Shipping</span>
          <span>{isFreeShipping ? <span className="text-green-600">Free</span> : formatINR(shippingCost)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>−{formatINR(discount)}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-neutral-200 pt-2 font-semibold text-black">
          <span>Total</span>
          <span>{formatINR(totalAmount)}</span>
        </div>
      </div>

      {/* Checkout CTA */}
      <Link
        href="/checkout"
        className="block w-full rounded bg-black py-3 text-center text-sm font-semibold text-white hover:bg-neutral-800"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
