// Server component — injects product JSON-LD for SEO
// TODO: move schema generation to lib/schema/product.ts and import the helper here

import Script from 'next/script';

export interface ProductSchemaData {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  currentSellingPrice: number;
  currency?: string;
  images: string[];
  brand?: string;
  sku?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
}

interface ProductSchemaProps {
  product: ProductSchemaData;
}

export default function ProductSchema({ product }: ProductSchemaProps) {
  // TODO: replace inline object with lib/schema/product.ts generator
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description ?? '',
    image: product.images,
    sku: product.sku ?? product.id,
    brand: {
      '@type': 'Brand',
      name: product.brand ?? 'Be That Percent',
    },
    offers: {
      '@type': 'Offer',
      url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/shop/${product.slug}`,
      priceCurrency: product.currency ?? 'INR',
      price: product.currentSellingPrice,
      availability: `https://schema.org/${product.availability ?? 'InStock'}`,
      // TODO: add priceValidUntil from sale schedule if applicable
    },
  };

  return (
    <Script
      id={`product-jsonld-${product.id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      strategy="afterInteractive"
    />
  );
}
