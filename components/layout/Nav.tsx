'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collections' },
  { label: 'Shop the Look', href: '/shop-the-look' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation">
      <ul className="hidden items-center gap-6 md:flex">
        {NAV_ITEMS.map(({ label, href }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

          return (
            <li key={href}>
              <Link
                href={href}
                className={[
                  'text-sm font-medium transition-colors hover:text-black focus:outline-none focus-visible:underline',
                  isActive
                    ? 'border-b-2 border-black pb-0.5 text-black'
                    : 'text-neutral-600',
                ].join(' ')}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Mobile: hamburger placeholder — TODO: implement mobile drawer */}
      <button
        aria-label="Open menu"
        className="rounded p-1 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-black md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
    </nav>
  );
}
