'use client';

import Image from 'next/image';

export interface CartItemData {
  id: string;
  productRef: string;
  sizeRef: string;
  quantity: number;
  productName: string;
  productImage: string;
  price: number;
  size: string;
}

interface CartItemProps {
  item: CartItemData;
}

function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

export default function CartItem({ item }: CartItemProps) {
  const { productName, productImage, price, size, quantity } = item;

  // TODO: wire these to useCart() methods:
  // - incrementQuantity(item.id)
  // - decrementQuantity(item.id)
  // - removeItem(item.id)
  function handleIncrement() {
    console.log('[CartItem stub] increment:', item.id);
  }

  function handleDecrement() {
    console.log('[CartItem stub] decrement:', item.id);
  }

  function handleRemove() {
    console.log('[CartItem stub] remove:', item.id);
  }

  return (
    <div className="flex gap-3">
      {/* Thumbnail */}
      <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded bg-neutral-100">
        <Image
          src={productImage}
          alt={productName}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-sm font-medium text-black">{productName}</p>
          <button
            aria-label={`Remove ${productName} from cart`}
            onClick={handleRemove}
            className="shrink-0 text-neutral-400 hover:text-red-500 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          </button>
        </div>

        <p className="text-xs text-neutral-500">Size: {size}</p>

        <div className="flex items-center justify-between">
          {/* Quantity controls */}
          <div className="flex items-center gap-2 rounded border border-neutral-200">
            <button
              aria-label="Decrease quantity"
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="px-2 py-0.5 text-neutral-600 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              −
            </button>
            <span className="min-w-[1.5rem] text-center text-sm">{quantity}</span>
            <button
              aria-label="Increase quantity"
              onClick={handleIncrement}
              className="px-2 py-0.5 text-neutral-600 hover:bg-neutral-100"
            >
              +
            </button>
          </div>

          {/* Line total */}
          <p className="text-sm font-medium text-black">{formatINR(price * quantity)}</p>
        </div>
      </div>
    </div>
  );
}
