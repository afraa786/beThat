/**
 * JSON-LD BreadcrumbList schema generator for Be That Percent (BTP).
 *
 * Usage note: inject the returned object via
 *   <Script
 *     id="breadcrumb-schema"
 *     type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(items)) }}
 *   />
 * Place at the page level only — never inside shared layout components that
 * render across multiple routes simultaneously.
 */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface BreadcrumbListElementSchema {
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
}

export interface BreadcrumbSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: BreadcrumbListElementSchema[];
}

/**
 * Returns a typed JSON-LD BreadcrumbList object.
 *
 * @param items  Ordered array of breadcrumb entries (first = home, last = current page).
 *               Each item should carry its canonical absolute URL.
 *
 * @example
 *   generateBreadcrumbSchema([
 *     { name: 'Home',    url: 'https://www.bethatpercent.com' },
 *     { name: 'Shop',   url: 'https://www.bethatpercent.com/shop' },
 *     { name: 'Kurtas', url: 'https://www.bethatpercent.com/shop/kurtas' },
 *   ])
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): BreadcrumbSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
