/**
 * JSON-LD Product schema generator for Be That Percent (BTP).
 *
 * Usage note: inject the returned object via
 *   <Script
 *     id="product-schema"
 *     type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: JSON.stringify(generateProductSchema(product)) }}
 *   />
 * Place at the individual product page level only.
 */

import { generateOfferSchema, type OfferSchema } from "./offer";

export interface ProductSchemaInput {
  name: string;
  description: string;
  images: string[];
  /** Original / MRP price */
  price: number;
  /** Discounted / current selling price */
  currentSellingPrice: number;
  slug: string;
}

export interface ProductSchema {
  "@context": "https://schema.org";
  "@type": "Product";
  name: string;
  description: string;
  image: string[];
  brand: {
    "@type": "Brand";
    name: string;
  };
  offers: OfferSchema;
  url: string;
}

/**
 * Returns a typed JSON-LD Product object for a BTP product.
 *
 * @param product  Product data required for schema generation.
 */
export function generateProductSchema(product: ProductSchemaInput): ProductSchema {
  // TODO: replace base URL with production domain once confirmed
  const baseUrl = "https://www.bethatpercent.com";
  const productUrl = `${baseUrl}/shop/${product.slug}`;

  // Determine availability based on stock — caller should pass appropriate value.
  // Defaulting to InStock; product pages should resolve real availability first.
  const offer = generateOfferSchema(product.currentSellingPrice, "InStock", productUrl);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    brand: {
      "@type": "Brand",
      name: "Be That Percent",
    },
    offers: offer,
    url: productUrl,
  };
}
