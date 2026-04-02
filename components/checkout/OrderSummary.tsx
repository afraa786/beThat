// Read-only panel — no interactivity needed

import Image from 'next/image';
import type { Address } from './AddressForm';

export interface OrderProduct {
  id: string;
  name: string;
  imageUrl: string;
  size: string;
  quantity: number;
  currentSellingPrice: number;
}

interface OrderSummaryProps {
  products: OrderProduct[];
  address: Address;
  subtotal: number;
  shippingCost: number;
  discount: number;
  totalAmount: number;
}

function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

export default function OrderSummary({
  products,
  address,
  subtotal,
  shippingCost,
  discount,
  totalAmount,
}: OrderSummaryProps) {
  const isFreeShipping = shippingCost === 0;

  return (
    <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 space-y-5">
      <h2 className="text-base font-semibold text-black">Order Summary</h2>

      {/* Products */}
      <ul className="space-y-3" aria-label="Items in order">
        {products.map((p) => (
          <li key={`${p.id}-${p.size}`} className="flex items-center gap-3">
            <div className="relative h-14 w-11 shrink-0 overflow-hidden rounded bg-neutral-200">
              <Image src={p.imageUrl} alt={p.name} fill sizes="44px" className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-black">{p.name}</p>
              <p className="text-xs text-neutral-500">Size: {p.size} &bull; Qty: {p.quantity}</p>
            </div>
            <p className="shrink-0 text-sm font-medium text-black">
              {formatINR(p.currentSellingPrice * p.quantity)}
            </p>
          </li>
        ))}
      </ul>

      <hr className="border-neutral-200" />

      {/* Delivery address */}
      <div>
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-500">Deliver to</p>
        <p className="text-sm text-black">{address.fullName}</p>
        <p className="text-sm text-neutral-600">
          {[address.line1, address.line2, address.city, address.pinCode, address.country]
            .filter(Boolean)
            .join(', ')}
        </p>
        <p className="text-sm text-neutral-600">{address.phoneNumber}</p>
      </div>

      <hr className="border-neutral-200" />

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
    </div>
  );
}
