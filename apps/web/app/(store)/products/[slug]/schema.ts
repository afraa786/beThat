// TODO: Replace `any` with the proper Product type from @/types/product.ts once defined
// TODO: Populate `offers.seller` with the brand name from Firestore settings doc
// TODO: Add `aggregateRating` once a reviews feature is implemented

/**
 * Generates a JSON-LD Product schema object for use in a <script type="application/ld+json"> tag.
 * Inject this in the Server Component version of the product detail page.
 *
 * @example
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{ __html: JSON.stringify(generateProductSchema(product)) }}
 * />
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateProductSchema(product: any): Record<string, unknown> {
  // TODO: Narrow `product` to the proper Product type once @/types/product.ts exists

  const offers = {
    '@type': 'Offer',
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/products/${product.slug}`,
    priceCurrency: 'INR',
    price: product.price,
    // TODO: Map Firestore `totalStock` field to the correct schema availability value
    availability:
      (product.totalStock ?? 0) > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    // TODO: Set `priceValidUntil` to a reasonable future date or fetch from settings
    priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    // TODO: Replace with Firestore settings doc seller name
    seller: {
      '@type': 'Organization',
      name: 'Be That Percent',
    },
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description ?? '',
    // TODO: Use the first image from product.images array — ensure it's an absolute URL
    image: product.images?.[0] ?? '',
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Be That Percent',
    },
    offers,
    // TODO: Add `aggregateRating` once reviews are implemented:
    // aggregateRating: {
    //   '@type': 'AggregateRating',
    //   ratingValue: product.avgRating,
    //   reviewCount: product.reviewCount,
    // },
  }
}
