// TODO: install firebase — run: npm install firebase
import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{ id: string }>
}

/**
 * GET /api/products/[id]
 * Fetch a single product by Firestore document ID or slug.
 * TODO: Firestore lookup — try getProductById(id), fall back to getProductBySlug(id)
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json({ error: 'Product ID or slug is required' }, { status: 400 })
    }

    // TODO: replace with Firestore lookup
    // import { getProductById, getProductBySlug } from '@/lib/db/schema/products.firestore'
    // let product = await getProductById(id)
    // if (!product) product = await getProductBySlug(id)
    // if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

    console.log('[GET /api/products/:id] id:', id)

    // Placeholder — remove once Firestore is integrated
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  } catch (error) {
    console.error('[GET /api/products/:id] error:', error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}
