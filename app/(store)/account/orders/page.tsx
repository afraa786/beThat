'use client'

// TODO: install firebase
// TODO: import { db } from '@/lib/firebase'
// TODO: import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
// TODO: import { useAuth } from '@/hooks/useAuth'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { OrderStatus } from '@/app/(store)/order-confirmation/schema'

// ─── Placeholder Types ────────────────────────────────────────────────────────
type OrderSummary = {
  orderId: string
  orderNumber: string
  createdAt: string       // ISO timestamp
  total: number
  status: OrderStatus
  itemCount: number
  previewImageUrl: string // first product's image
}

// ─── Status badge helper ──────────────────────────────────────────────────────
const STATUS_STYLES: Record<OrderStatus, string> = {
  pending:     'bg-yellow-100 text-yellow-700',
  confirmed:   'bg-blue-100 text-blue-700',
  processing:  'bg-blue-100 text-blue-700',
  shipped:     'bg-purple-100 text-purple-700',
  delivered:   'bg-green-100 text-green-700',
  cancelled:   'bg-red-100 text-red-700',
  refunded:    'bg-gray-100 text-gray-600',
}

// ─── Stub data fetch — replace with Firestore call ───────────────────────────
async function fetchOrders(_userId: string): Promise<OrderSummary[]> {
  // TODO: const snap = await getDocs(
  //         query(
  //           collection(db, 'orders'),
  //           where('userId', '==', userId),
  //           orderBy('createdAt', 'desc')
  //         )
  //       )
  // TODO: return snap.docs.map(d => ({ orderId: d.id, ...d.data() })) as OrderSummary[]
  return []
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function OrderHistoryPage() {
  // TODO: const { user, loading: authLoading } = useAuth()
  // TODO: Redirect to /login if user is null and authLoading is false

  const [orders, setOrders] = useState<OrderSummary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      // TODO: Replace 'stub-user-id' with user.uid from useAuth()
      const data = await fetchOrders('stub-user-id')
      setOrders(data)
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-black mb-8">My Orders</h1>

      {loading ? (
        /* Skeleton */
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse border border-neutral-200 rounded-lg p-5 flex gap-4">
              <div className="w-16 h-16 bg-neutral-200 rounded-md shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-neutral-200 rounded w-1/3" />
                <div className="h-3 bg-neutral-200 rounded w-1/4" />
                <div className="h-3 bg-neutral-200 rounded w-1/5" />
              </div>
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        /* Empty state */
        <div className="text-center py-24 space-y-4">
          {/* TODO: Add empty orders illustration */}
          <p className="text-gray-500 text-sm">You haven&apos;t placed any orders yet.</p>
          <Link href="/products" className="inline-block text-sm text-black underline hover:text-gray-600">
            Start Shopping
          </Link>
        </div>
      ) : (
        /* Order list */
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.orderId} className="border border-neutral-200 rounded-lg p-5 flex items-center gap-4">
              {/* Preview image */}
              <div className="w-16 h-16 bg-neutral-100 rounded-md shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={order.previewImageUrl}
                  alt="Order preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-black">{order.orderNumber}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[order.status]}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                  {' · '}{order.itemCount} item{order.itemCount !== 1 ? 's' : ''}
                </p>
                <p className="text-sm font-medium text-black mt-1">
                  ₹{order.total.toLocaleString('en-IN')}
                </p>
              </div>

              {/* Action */}
              <Link
                href={`/order-confirmation?orderId=${order.orderId}`}
                className="shrink-0 text-xs text-black underline hover:text-gray-600"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
