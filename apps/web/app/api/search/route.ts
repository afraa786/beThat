// TODO: install firebase — run: npm install firebase
// TODO (optional): install Algolia — run: npm install algoliasearch
import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/search
 * Search products by name and tags.
 * Query params: ?q=
 * TODO: implement Firestore text query or integrate Algolia for full-text search.
 *
 * Note on Firestore: native Firestore does not support full-text search.
 * Options:
 *  A) Algolia integration — index products on write, search via Algolia client
 *  B) Firestore array-contains on tags field for tag-based search
 *  C) Typesense / Meilisearch as a self-hosted alternative
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q')?.trim()

    if (!q) {
      return NextResponse.json({ error: 'Query param ?q= is required' }, { status: 400 })
    }

    if (q.length < 2) {
      return NextResponse.json({ error: 'Search query must be at least 2 characters' }, { status: 400 })
    }

    // TODO: Option A — Algolia search
    // import algoliasearch from 'algoliasearch'
    // const client = algoliasearch(process.env.ALGOLIA_APP_ID!, process.env.ALGOLIA_SEARCH_KEY!)
    // const index = client.initIndex('products')
    // const { hits } = await index.search(q)
    // return NextResponse.json({ results: hits, query: q }, { status: 200 })

    // TODO: Option B — Firestore tag search (partial text search not supported natively)
    // import { getProducts } from '@/lib/db/schema/products.firestore'
    // Firestore supports array-contains for tags, but not substring match on name.
    // Consider storing a `searchTokens` array on each product doc (generated on write)
    // and using array-contains-any here.

    console.log('[GET /api/search] query:', q)

    // Placeholder response until search backend is integrated
    const results: unknown[] = []
    return NextResponse.json({ results, query: q }, { status: 200 })
  } catch (error) {
    console.error('[GET /api/search] error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
