/**
 * API client — Orders
 * Calls the /api/orders Next.js route handler.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "return_requested"
  | "returned";

export interface OrderItem {
  productId: string;
  productName: string;
  slug: string;
  image: string;
  sizeLabel: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface ShippingAddress {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  couponCode: string | null;
  total: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  paymentIntentId: string | null;
  trackingNumber: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ReturnRequest {
  orderId: string;
  reason: string;
  requestedAt: string;
  status: "pending" | "approved" | "rejected";
}

// ---------------------------------------------------------------------------
// API functions
// ---------------------------------------------------------------------------

/**
 * Fetches all orders for the currently authenticated user.
 *
 * TODO: call GET /api/orders.
 *       Authentication should be handled via session cookie / middleware.
 */
export async function getOrders(): Promise<Order[]> {
  // TODO: replace with real fetch once /api/orders GET is implemented
  // const res = await fetch("/api/orders", { cache: "no-store" });
  // if (!res.ok) throw new Error(`Failed to fetch orders: ${res.statusText}`);
  // return res.json() as Promise<Order[]>;

  console.warn("[orders.ts] getOrders() — stub, returning empty array");
  return [];
}

/**
 * Fetches a single order by ID.
 * Returns null if the server responds with 404.
 *
 * TODO: call GET /api/orders/[id].
 *
 * @param id  Firestore order document ID.
 */
export async function getOrderById(id: string): Promise<Order | null> {
  // TODO: replace with real fetch once /api/orders/[id] GET is implemented
  // const res = await fetch(`/api/orders/${encodeURIComponent(id)}`, {
  //   cache: "no-store",
  // });
  // if (res.status === 404) return null;
  // if (!res.ok) throw new Error(`Failed to fetch order "${id}": ${res.statusText}`);
  // return res.json() as Promise<Order>;

  console.warn(`[orders.ts] getOrderById("${id}") — stub, returning null`);
  return null;
}

/**
 * Submits a return request for a delivered order.
 *
 * TODO: call POST /api/orders/[orderId]/return with { reason } body.
 *       Server should validate order status (must be 'delivered') before accepting.
 *
 * @param orderId  Firestore order document ID.
 * @param reason   Customer-provided reason for the return.
 */
export async function requestReturn(
  orderId: string,
  reason: string,
): Promise<ReturnRequest> {
  // TODO: replace with real fetch once /api/orders/[orderId]/return POST is implemented
  // const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}/return`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ reason }),
  // });
  // if (!res.ok) {
  //   const err = await res.json().catch(() => ({}));
  //   throw new Error(err?.message ?? `Failed to request return: ${res.statusText}`);
  // }
  // return res.json() as Promise<ReturnRequest>;

  console.warn(`[orders.ts] requestReturn("${orderId}") — stub`);
  return {
    orderId,
    reason,
    requestedAt: new Date().toISOString(),
    status: "pending",
  };
}
