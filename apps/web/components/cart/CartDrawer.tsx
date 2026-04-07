'use client';

import { useEffect } from 'react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

// TODO: import useCart from '@/hooks/useCart'
// Stub cart item shape — align with real Firestore cart document structure
interface CartItemData {
  id: string;
  productRef: string;
  sizeRef: string;
  quantity: number;
  productName: string;
  productImage: string;
  price: number;
  size: string;
}

// Stub hook — replace with real useCart
function useCartStub() {
  return {
    items: [] as CartItemData[],
    subtotal: 0,
    shippingCost: 0,
    discount: 0,
    totalAmount: 0,
    couponCode: undefined as string | undefined,
  };
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  // TODO: replace stub with useCart()
  const { items, subtotal, shippingCost, discount, totalAmount, couponCode } = useCartStub();

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (isOpen) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          aria-hidden="true"
          onClick={onClose}
        />
      )}

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={[
          'fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4">
          <h2 className="text-lg font-semibold text-black">Your Cart</h2>
          <button
            aria-label="Close cart"
            onClick={onClose}
            className="rounded p-1 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p className="text-sm">Your cart is empty.</p>
            </div>
          ) : (
            <ul className="space-y-4" aria-label="Cart items">
              {items.map((item) => (
                <li key={item.id}>
                  <CartItem item={item} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — cart summary */}
        {items.length > 0 && (
          <div className="border-t border-neutral-200 px-4 py-4">
            <CartSummary
              subtotal={subtotal}
              shippingCost={shippingCost}
              discount={discount}
              totalAmount={totalAmount}
              couponCode={couponCode}
            />
          </div>
        )}
      </div>
    </>
  );
}
