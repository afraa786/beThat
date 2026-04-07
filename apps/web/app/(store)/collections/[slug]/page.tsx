// TODO: install firebase
// TODO: import { db } from '@/lib/firebase'
// TODO: import { collection, getDocs, query, where, limit, getDoc, doc } from 'firebase/firestore'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// ─── Placeholder Types (move to @/types) ─────────────────────────────────────
type Collection = {
  id: string
  slug: string
  name: string
  description?: string
  bannerImageUrl?: string
  productIds: string[]   // ordered list of product IDs in this collection
  isActive: boolean
}

type Product = {
  id: string
  name: string
  slug: string
  price: number
  imageUrl: string
}

// ─── Data Fetching ────────────────────────────────────────────────────────────
async function getCollection(slug: string): Promise<Collection | null> {
  // TODO: const snap = await getDocs(
  //         query(collection(db, 'collections'), where('slug', '==', slug), where('isActive', '==', true), limit(1))
  //       )
  // TODO: if (snap.empty) return null
  // TODO: return { id: snap.docs[0].id, ...snap.docs[0].data() } as Collection
  return null
}

async function getProductsForCollection(_productIds: string[]): Promise<Product[]> {
  // TODO: Batch-fetch product docs by id (Firestore `in` operator supports up to 30 ids per query;
  //       split productIds into chunks of 30 and run parallel getDocs calls)
  // TODO: Preserve the order from collection.productIds when mapping results
  return []
}

// ─── Metadata (dynamic) ───────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const col = await getCollection(slug)
  if (!col) return { title: 'Collection Not Found' }
  return {
    title: col.name,
    description: col.description ?? `Shop the ${col.name} collection from Be That Percent.`,
    // TODO: Add OpenGraph image using col.bannerImageUrl
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const col = await getCollection(slug)

  if (!col) notFound()

  const products = await getProductsForCollection(col.productIds)

  return (
    <div>
      {/* ── Collection Banner ──────────────────────────────────────────── */}
      <div className="relative h-56 md:h-72 bg-neutral-200 flex items-end">
        {/* TODO: Mount col.bannerImageUrl as a full-bleed <Image> (next/image) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-black">{col.name}</h1>
          {col.description && (
            <p className="mt-2 text-sm text-gray-600 max-w-prose">{col.description}</p>
          )}
        </div>
      </div>

      {/* ── Product Grid ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-sm text-gray-500 mb-6">{products.length} items</p>

        {products.length === 0 ? (
          <div className="py-24 text-center text-sm text-gray-400">
            No products in this collection yet.
            {/* TODO: Show a "Back to shop" link */}
          </div>
        ) : (
          // TODO: Replace with <ProductGrid products={products} /> component
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="border border-neutral-200 rounded-lg overflow-hidden">
                {/* TODO: Replace with <ProductCard product={product} /> */}
                <div className="aspect-[3/4] bg-neutral-100" />
                <div className="p-3">
                  <p className="text-sm font-medium text-black truncate">{product.name}</p>
                  <p className="text-sm text-gray-600 mt-1">₹{product.price.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
