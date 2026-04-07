// TODO: install firebase — run: npm install firebase
import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/products
 * Query params: ?category=&collection=&search=&page=
 * TODO: query Firestore products collection with filters
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') ?? undefined
    const collection = searchParams.get('collection') ?? undefined
    const search = searchParams.get('search') ?? undefined
    const page = parseInt(searchParams.get('page') ?? '1', 10)
    const pageSize = 20

    // TODO: replace with Firestore query
    // import { getProducts } from '@/lib/db/schema/products.firestore'
    // const products = await getProducts({ category, collection, search, page, pageSize })

    const filters = { category, collection, search, page, pageSize }
    console.log('[GET /api/products] filters:', filters)

    // Placeholder response until Firestore is wired up
    const products: unknown[] = []

    return NextResponse.json(
      {
        products,
        page,
        pageSize,
        total: 0,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[GET /api/products] error:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
