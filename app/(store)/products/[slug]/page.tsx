'use client'

// TODO: install firebase
// TODO: import { db } from '@/lib/firebase'
// TODO: import { collection, getDocs, query, where, limit, getDoc, doc } from 'firebase/firestore'
// TODO: Switch this page to a Server Component once cart state is managed via a server-compatible
//       solution (e.g. cookies) — currently 'use client' is needed for useCart and recently-viewed

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

// ─── Placeholder Types (move to @/types/product.ts) ──────────────────────────
type ProductSize = {
  label: string     // e.g. 'XS', 'S', 'M', 'L', 'XL', 'XXL'
  stock: number
}

type Product = {
  id: string
  name: string
  slug: string
  description: string
  price: number
  compareAtPrice?: number   // original price for strike-through
  images: string[]          // ordered array of image URLs
  sizes: ProductSize[]
  category: string
  collectionSlug?: string
  tags: string[]
  isActive: boolean
  totalStock: number
  lowStockThreshold: number // show "Only N left!" badge below this number
}

// ─── Stub fetch (replace with real Firestore call) ────────────────────────────
async function fetchProductBySlug(_slug: string): Promise<Product | null> {
  // TODO: const snap = await getDocs(
  //         query(collection(db, 'products'), where('slug', '==', slug), where('isActive', '==', true), limit(1))
  //       )
  // TODO: if (snap.empty) return null
  // TODO: return { id: snap.docs[0].id, ...snap.docs[0].data() } as Product
  return null
}

// ─── Recently Viewed helpers ──────────────────────────────────────────────────
function addToRecentlyViewed(slug: string) {
  // TODO: Read 'btp_recently_viewed' from localStorage, prepend slug, deduplicate, cap at 10, write back
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>()
  const slug = params.slug

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [addingToCart, setAddingToCart] = useState(false)

  // TODO: Replace with useCart() hook once implemented
  const addToCart = async (_productId: string, _size: string) => {
    // TODO: useCart().addItem({ productId, size, quantity: 1 })
  }

  useEffect(() => {
    async function load() {
      setLoading(true)
      const data = await fetchProductBySlug(slug)
      setProduct(data)
      setLoading(false)
      if (data) {
        addToRecentlyViewed(data.slug)
        // TODO: Initialise selectedSize to user's usualSize from Firestore user profile if logged in
      }
    }
    load()
  }, [slug])

  const handleAddToCart = async () => {
    if (!selectedSize || !product) return
    setAddingToCart(true)
    await addToCart(product.id, selectedSize)
    setAddingToCart(false)
    // TODO: Show a success toast / mini cart drawer after adding
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* TODO: Replace with a proper <ProductDetailSkeleton /> component */}
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="aspect-square bg-neutral-200 rounded-lg" />
          <div className="space-y-4">
            <div className="h-6 bg-neutral-200 rounded w-3/4" />
            <div className="h-4 bg-neutral-200 rounded w-1/4" />
            <div className="h-32 bg-neutral-200 rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <p className="text-gray-500 text-sm">Product not found.</p>
        {/* TODO: Add a link back to /products and a 404 page */}
      </div>
    )
  }

  const isLowStock = product.totalStock > 0 && product.totalStock <= product.lowStockThreshold
  const isOutOfStock = product.totalStock === 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

        {/* ── Image Gallery ──────────────────────────────────────────────── */}
        <div>
          {/* Main image */}
          <div className="aspect-[3/4] bg-neutral-100 rounded-lg overflow-hidden">
            {product.images.length > 0 ? (
              // TODO: Replace with a proper <ImageZoom> or <Lightbox> component
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-300 text-sm">
                No image
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? 'border-black' : 'border-transparent'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Product Info ────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-black leading-tight">{product.name}</h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-xl font-semibold text-black">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.compareAtPrice.toLocaleString('en-IN')}
                </span>
              )}
              {/* TODO: Calculate and show discount percentage badge if compareAtPrice exists */}
            </div>

            {/* Low stock / out of stock badge */}
            {isOutOfStock && (
              <span className="inline-block mt-2 text-xs font-medium text-white bg-red-500 px-2 py-0.5 rounded-full">
                Out of Stock
              </span>
            )}
            {!isOutOfStock && isLowStock && (
              <span className="inline-block mt-2 text-xs font-medium text-white bg-orange-500 px-2 py-0.5 rounded-full">
                Only {product.totalStock} left!
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>

          {/* ── Size Selector ──────────────────────────────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-black">Select Size</p>
              {/* TODO: Add a size guide modal trigger */}
              <button className="text-xs text-gray-400 underline hover:text-black">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => {
                const outOfStock = s.stock === 0
                return (
                  <button
                    key={s.label}
                    disabled={outOfStock}
                    onClick={() => setSelectedSize(s.label)}
                    className={`px-4 py-2 text-sm border rounded-md transition-colors
                      ${outOfStock ? 'opacity-40 cursor-not-allowed border-neutral-200 text-neutral-400' : 'cursor-pointer'}
                      ${selectedSize === s.label && !outOfStock
                        ? 'border-black bg-black text-white'
                        : !outOfStock ? 'border-neutral-300 text-black hover:border-black' : ''
                      }`}
                  >
                    {s.label}
                  </button>
                )
              })}
            </div>
            {/* TODO: Show a size recommendation ("We recommend M based on your profile") if user is logged in
                      and has usualSize set in their Firestore user doc */}
          </div>

          {/* ── Add to Cart ────────────────────────────────────────────── */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize || isOutOfStock || addingToCart}
            className="w-full py-3 bg-black text-white text-sm font-semibold rounded-lg
              hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {addingToCart ? 'Adding…' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>

          {/* TODO: Add "Buy Now" button that adds to cart and immediately redirects to /checkout */}
          {/* TODO: Add "Save to Wishlist" button — requires useWishlist hook and Firestore write */}
        </div>
      </div>

      {/* ── JSON-LD Structured Data ───────────────────────────────────────── */}
      {/* TODO: In server component version, import generateProductSchema from './schema' and inject:
               <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateProductSchema(product)) }} /> */}

      {/* ── Recently Viewed ──────────────────────────────────────────────── */}
      <section className="mt-20">
        <h2 className="text-xl font-semibold text-black mb-6">Recently Viewed</h2>
        {/* TODO: Read from localStorage and render a horizontal <ProductGrid /> */}
        <p className="text-sm text-gray-400">Products you viewed will appear here.</p>
      </section>
    </div>
  )
}
