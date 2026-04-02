"use client";

/**
 * useCart — shopping cart state hook for Be That Percent (BTP).
 *
 * TODO: sync cart with /api/cart on mount (getCart) and after every mutation
 *       (addToCart, removeFromCart, applyCoupon from lib/api/cart.ts).
 *       Use a session cookie or guest token to identify anonymous carts.
 */

import { useState, useCallback } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  slug: string;
  image: string;
  sizeId: string;
  sizeLabel: string;
  quantity: number;
  unitPrice: number;
}

export interface CouponState {
  code: string;
  discountAmount: number;
}

export interface UseCartReturn {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  couponDiscount: number;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (itemIndex: number) => void;
  updateQuantity: (itemIndex: number, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => Promise<void>;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useCart(): UseCartReturn {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<CouponState | null>(null);

  // TODO: sync with /api/cart on mount
  // useEffect(() => {
  //   getCart().then((cart) => {
  //     setItems(cart.items);
  //     if (cart.coupon) setCoupon({ code: cart.coupon.code, discountAmount: cart.coupon.discountAmount });
  //   });
  // }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );

  const addItem = useCallback((newItem: Omit<CartItem, "id">) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.productId === newItem.productId && i.sizeId === newItem.sizeId,
      );
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + newItem.quantity,
        };
        return updated;
      }
      return [
        ...prev,
        { ...newItem, id: `${newItem.productId}_${newItem.sizeId}_${Date.now()}` },
      ];
    });

    // TODO: call addToCart(newItem.productId, newItem.sizeId, newItem.quantity)
    //       from lib/api/cart.ts and update state from the response
  }, []);

  const removeItem = useCallback((itemIndex: number) => {
    setItems((prev) => prev.filter((_, i) => i !== itemIndex));

    // TODO: call removeFromCart(itemIndex) from lib/api/cart.ts
  }, []);

  const updateQuantity = useCallback((itemIndex: number, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((_, i) => i !== itemIndex));
      return;
    }
    setItems((prev) => {
      const updated = [...prev];
      if (updated[itemIndex]) {
        updated[itemIndex] = { ...updated[itemIndex], quantity };
      }
      return updated;
    });

    // TODO: call a PATCH /api/cart endpoint to persist the quantity change
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCoupon(null);

    // TODO: call DELETE /api/cart/all or equivalent to clear server-side cart
  }, []);

  const applyCoupon = useCallback(async (code: string): Promise<void> => {
    // TODO: call applyCoupon(code) from lib/api/cart.ts
    //       and update coupon state from the returned Cart object:
    // const updatedCart = await applyCouponApi(code);
    // if (updatedCart.coupon) {
    //   setCoupon({ code: updatedCart.coupon.code, discountAmount: updatedCart.coupon.discountAmount });
    // }

    console.warn(`[useCart] applyCoupon("${code}") — stub`);
    setCoupon({ code, discountAmount: 0 });
  }, []);

  return {
    items,
    totalItems,
    subtotal,
    couponDiscount: coupon?.discountAmount ?? 0,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyCoupon,
  };
}
