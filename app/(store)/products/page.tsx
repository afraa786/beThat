// TODO: install firebase
// TODO: import { db } from '@/lib/firebase'
// TODO: import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'

import type { Metadata } from 'next'

// ─── Types (placeholder — define in @/types/product.ts) ──────────────────────
type Product = {
  id: string
  name: string
  slug: string
  imageUrl: string
  price: number
  category: string
  isActive: boolean
  stock: number
  createdAt: string
}

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular'

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse all Be That Percent products.',
}

// ─── Data Fetching ────────────────────────────────────────────────────────────
async function getProducts(params: {
  category?: string
  sort?: SortOption
  minPrice?: number
  maxPrice?: number
}): Promise<Product[]> {
  // TODO: Build a Firestore query:
  //   let q = query(collection(db, 'products'), where('isActive', '==', true))
  //   if (params.category) q = query(q, where('category', '==', params.category))
  //   Apply ordering based on params.sort:
  //     'newest'     → orderBy('createdAt', 'desc')
  //     'price-asc'  → orderBy('price', 'asc')
  //     'price-desc' → orderBy('price', 'desc')
  //     'popular'    → orderBy('soldCount', 'desc')   (requires soldCount field on product doc)
  //   Apply price range filter client-side (or with composite index for Firestore)
  //   Map snapshot docs to Product[]

  // Stub — remove once Firestore is wired up
  return []
}

// ─── Page ─────────────────────────────────────────────────────────────────────
// searchParams come from the URL: /products?category=tops&sort=newest&minPrice=500
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string; minPrice?: string; maxPrice?: string }>
}) {
  const sp = await searchParams
  const products = await getProducts({
    category: sp.category,
    sort: (sp.sort as SortOption) ?? 'newest',
    minPrice: sp.minPrice ? Number(sp.minPrice) : undefined,
    maxPrice: sp.maxPrice ? Number(sp.maxPrice) : undefined,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-black">All Products</h1>
        <p className="text-sm text-gray-500">{products.length} items</p>
      </div>

      <div className="flex gap-8">
        {/* ── Filters Sidebar ────────────────────────────────────────────── */}
        <aside className="hidden md:block w-56 shrink-0">
          {/* TODO: Replace with a client-side <FilterSidebar /> component that
                    reads/writes URL search params for category, price range, size, colour */}
          <div className="border border-neutral-200 rounded-lg p-4 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Category</p>
              {/* TODO: Render category list fetched from Firestore `categories` collection */}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Price</p>
              {/* TODO: Add min/max price range slider */}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Size</p>
              {/* TODO: Render available sizes as toggleable chips */}
            </div>
          </div>
        </aside>

        {/* ── Product Grid ───────────────────────────────────────────────── */}
        <div className="flex-1">
          {/* TODO: Add sort dropdown (select) that updates ?sort= URL param without full page reload */}
          <div className="flex justify-end mb-4">
            <select className="text-sm border border-neutral-200 rounded px-3 py-1.5 bg-white" defaultValue={sp.sort ?? 'newest'}>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-gray-400 text-sm">No products found.</p>
              {/* TODO: Show skeleton loaders while fetching, and an empty state illustration */}
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

          {/* TODO: Add infinite scroll or pagination once product list grows */}
        </div>
      </div>
    </div>
  )
}
