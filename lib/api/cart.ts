/**
 * API client — Cart
 * Calls the /api/cart Next.js route handler.
 */

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
  totalPrice: number;
}

export interface AppliedCoupon {
  code: string;
  discountType: "flat" | "percentage";
  discountValue: number;
  discountAmount: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  coupon: AppliedCoupon | null;
  total: number;
  itemCount: number;
}

export interface AddToCartPayload {
  productId: string;
  sizeId: string;
  quantity: number;
}

export interface ApplyCouponPayload {
  code: string;
}

// ---------------------------------------------------------------------------
// API functions
// ---------------------------------------------------------------------------

/**
 * Fetches the current cart for the authenticated session / guest token.
 *
 * TODO: call GET /api/cart.
 *       Pass session cookie or guest token header as needed.
 */
export async function getCart(): Promise<Cart> {
  // TODO: replace with real fetch once /api/cart GET is implemented
  // const res = await fetch("/api/cart", { cache: "no-store" });
  // if (!res.ok) throw new Error(`Failed to fetch cart: ${res.statusText}`);
  // return res.json() as Promise<Cart>;

  console.warn("[cart.ts] getCart() — stub, returning empty cart");
  return { items: [], subtotal: 0, coupon: null, total: 0, itemCount: 0 };
}

/**
 * Adds a product (in a specific size) to the cart.
 *
 * TODO: call POST /api/cart with { productId, sizeId, quantity } body.
 *       Server should merge quantity if the item already exists.
 *
 * @param productId  Firestore product document ID.
 * @param sizeId     Firestore size variant ID within the product.
 * @param quantity   Number of units to add (must be >= 1).
 */
export async function addToCart(
  productId: string,
  sizeId: string,
  quantity: number,
): Promise<Cart> {
  const payload: AddToCartPayload = { productId, sizeId, quantity };

  // TODO: replace with real fetch once /api/cart POST is implemented
  // const res = await fetch("/api/cart", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // });
  // if (!res.ok) throw new Error(`Failed to add to cart: ${res.statusText}`);
  // return res.json() as Promise<Cart>;

  console.warn("[cart.ts] addToCart() — stub, payload:", payload);
  return { items: [], subtotal: 0, coupon: null, total: 0, itemCount: 0 };
}

/**
 * Removes the cart item at the given index.
 *
 * TODO: call DELETE /api/cart with { itemIndex } body.
 *       Consider switching to item ID once the API stabilises.
 *
 * @param itemIndex  Zero-based index of the item in Cart.items array.
 */
export async function removeFromCart(itemIndex: number): Promise<Cart> {
  // TODO: replace with real fetch once /api/cart DELETE is implemented
  // const res = await fetch("/api/cart", {
  //   method: "DELETE",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ itemIndex }),
  // });
  // if (!res.ok) throw new Error(`Failed to remove cart item: ${res.statusText}`);
  // return res.json() as Promise<Cart>;

  console.warn(`[cart.ts] removeFromCart(${itemIndex}) — stub`);
  return { items: [], subtotal: 0, coupon: null, total: 0, itemCount: 0 };
}

/**
 * Applies a coupon code to the current cart.
 * Server validates the coupon and returns the updated cart with discount applied.
 *
 * TODO: call POST /api/cart/coupon with { code } body.
 *       Throw a user-friendly error when the server returns 4xx.
 *
 * @param code  Coupon code string (case-insensitive — normalise server-side).
 */
export async function applyCoupon(code: string): Promise<Cart> {
  const payload: ApplyCouponPayload = { code };

  // TODO: replace with real fetch once /api/cart/coupon POST is implemented
  // const res = await fetch("/api/cart/coupon", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // });
  // if (!res.ok) {
  //   const err = await res.json().catch(() => ({}));
  //   throw new Error(err?.message ?? `Failed to apply coupon: ${res.statusText}`);
  // }
  // return res.json() as Promise<Cart>;

  console.warn("[cart.ts] applyCoupon() — stub, payload:", payload);
  return { items: [], subtotal: 0, coupon: null, total: 0, itemCount: 0 };
}
