// No interactivity needed — server component is fine
// TODO: inject JSON-LD BreadcrumbList schema via next/script or a <script> tag

import Link from 'next/link';
import Script from 'next/script';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  // TODO: move JSON-LD generation to lib/schema/breadcrumb.ts
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: item.href } : {}),
    })),
  };

  return (
    <>
      {/* JSON-LD structured data for SEO */}
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        // TODO: inject JSON-LD via lib/schema/breadcrumb.ts generator
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="afterInteractive"
      />

      <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="flex items-center gap-1">
                {index > 0 && (
                  <span aria-hidden="true" className="select-none">
                    /
                  </span>
                )}
                {item.href && !isLast ? (
                  <Link href={item.href} className="hover:text-black hover:underline">
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={isLast ? 'font-medium text-black' : undefined}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
