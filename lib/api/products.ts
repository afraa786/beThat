/**
 * API client — Products
 * Calls the /api/products Next.js route handler.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  /** Original / MRP price in INR */
  price: number;
  /** Discounted / current selling price in INR */
  currentSellingPrice: number;
  category: string;
  collection: string;
  sizes: ProductSize[];
  inStock: boolean;
  tags: string[];
  createdAt: string;
}

export interface ProductSize {
  id: string;
  label: string;
  stock: number;
}

export interface ProductFilters {
  category?: string;
  collection?: string;
  search?: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildQueryString(filters: ProductFilters): string {
  const params = new URLSearchParams();
  if (filters.category) params.set("category", filters.category);
  if (filters.collection) params.set("collection", filters.collection);
  if (filters.search) params.set("search", filters.search);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

// ---------------------------------------------------------------------------
// API functions
// ---------------------------------------------------------------------------

/**
 * Fetches the product listing, optionally filtered by category, collection,
 * or a search query string.
 *
 * TODO: call GET /api/products with the assembled query string.
 *       Consider adding pagination params (page, limit) as requirements grow.
 */
export async function getProducts(
  filters: ProductFilters = {},
): Promise<ProductsResponse> {
  const qs = buildQueryString(filters);

  // TODO: replace with real fetch once /api/products route is implemented
  // const res = await fetch(`/api/products${qs}`, { cache: "no-store" });
  // if (!res.ok) throw new Error(`Failed to fetch products: ${res.statusText}`);
  // return res.json() as Promise<ProductsResponse>;

  console.warn(`[products.ts] getProducts called with qs="${qs}" — stub, no data returned`);
  return { products: [], total: 0 };
}

/**
 * Fetches a single product by its URL slug.
 *
 * TODO: call GET /api/products/[slug].
 *       Return null (instead of throwing) when the route returns 404.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  // TODO: replace with real fetch once /api/products/[slug] route is implemented
  // const res = await fetch(`/api/products/${encodeURIComponent(slug)}`, {
  //   cache: "no-store",
  // });
  // if (res.status === 404) return null;
  // if (!res.ok) throw new Error(`Failed to fetch product "${slug}": ${res.statusText}`);
  // return res.json() as Promise<Product>;

  console.warn(`[products.ts] getProductBySlug("${slug}") — stub, no data returned`);
  return null;
}
