// TODO: Sync with the order document shape written to Firestore in /api/checkout
// TODO: Add review/rating fields once a reviews feature is built

// ─── Order Item ───────────────────────────────────────────────────────────────
export interface OrderItem {
  productId: string
  productName: string
  slug: string
  imageUrl: string
  size: string
  quantity: number
  priceAtPurchase: number  // price snapshotted at time of order (in case prices change later)
}

// ─── Shipping Address ─────────────────────────────────────────────────────────
export interface ShippingAddress {
  fullName: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  pincode: string
  phoneNumber: string
}

// ─── Order Status ─────────────────────────────────────────────────────────────
// TODO: Extend statuses as fulfilment flow is designed (e.g. 'dispatched', 'out_for_delivery')
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'

// ─── Payment Details ──────────────────────────────────────────────────────────
export interface PaymentDetails {
  method: 'razorpay' | 'cod'
  status: 'pending' | 'paid' | 'failed' | 'refunded'
  // TODO: Add razorpayOrderId and razorpayPaymentId once Razorpay is integrated
  transactionId?: string
}

// ─── Order Confirmation Data ──────────────────────────────────────────────────
export interface OrderConfirmationData {
  orderId: string               // Firestore document id
  orderNumber: string           // Human-readable order number, e.g. "BTP-20260402-001"
  userId?: string               // null for guest orders
  items: OrderItem[]
  shippingAddress: ShippingAddress
  payment: PaymentDetails
  status: OrderStatus
  subtotal: number
  shippingCharge: number
  discount: number              // coupon discount applied (0 if none)
  couponCode?: string
  total: number                 // subtotal - discount + shippingCharge
  createdAt: string             // ISO timestamp
  estimatedDelivery?: string    // ISO date string — populate after shipping label is created
  trackingUrl?: string          // third-party courier tracking link
}
