/**
 * JSON-LD Organization schema generator for Be That Percent (BTP).
 *
 * Usage note: inject the returned object via
 *   <Script
 *     id="org-schema"
 *     type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationSchema()) }}
 *   />
 * Place that <Script> at the page level only (e.g. in app/layout.tsx or a specific
 * page component), never inside a shared child component that may render multiple times.
 */

export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  sameAs: string[];
  contactPoint: {
    "@type": "ContactPoint";
    contactType: string;
    availableLanguage: string[];
  };
}

/**
 * Returns a typed JSON-LD Organization object for Be That Percent.
 * Replace placeholder values (URL, logo, sameAs links) once the
 * production domain and social profiles are confirmed.
 */
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Be That Percent",
    // TODO: replace with production URL once domain is live
    url: "https://www.bethatpercent.com",
    // TODO: replace with actual hosted logo asset URL
    logo: "https://www.bethatpercent.com/logo.png",
    sameAs: [
      // TODO: add real social media profile URLs
      "https://www.instagram.com/bethatpercent",
      "https://www.facebook.com/bethatpercent",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: ["English"],
    },
  };
}
