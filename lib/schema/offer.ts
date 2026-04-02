/**
 * JSON-LD Offer schema generator for Be That Percent (BTP).
 * Typically composed inside a Product schema via generateProductSchema().
 */

export type OfferAvailability = "InStock" | "OutOfStock";

export interface OfferSchema {
  "@type": "Offer";
  priceCurrency: string;
  price: number;
  availability: `https://schema.org/${OfferAvailability}`;
  url: string;
  priceValidUntil: string;
}

/**
 * Returns a typed JSON-LD Offer object.
 *
 * @param price            Selling price (in INR by default).
 * @param availability     Stock status — 'InStock' or 'OutOfStock'.
 * @param url              Canonical product page URL.
 */
export function generateOfferSchema(
  price: number,
  availability: OfferAvailability,
  url: string,
): OfferSchema {
  // priceValidUntil defaults to end of current calendar year
  const priceValidUntil = new Date(
    new Date().getFullYear(),
    11, // December
    31,
  )
    .toISOString()
    .split("T")[0];

  return {
    "@type": "Offer",
    priceCurrency: "INR",
    price,
    availability: `https://schema.org/${availability}`,
    url,
    priceValidUntil,
  };
}
