'use client';

// TODO: create hooks/useRecentlyViewed.ts that reads/writes to localStorage key 'btp_recently_viewed'
// Shape: Array<{ id, name, slug, price, currentSellingPrice, images, sizes }>

import { useEffect, useState } from 'react';
import ProductCard, { Product } from './ProductCard';

// Stub hook — replace with real implementation in hooks/useRecentlyViewed.ts
function useRecentlyViewed(): Product[] {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('btp_recently_viewed');
      if (raw) {
        const parsed = JSON.parse(raw) as Product[];
        setItems(Array.isArray(parsed) ? parsed : []);
      }
    } catch {
      // localStorage unavailable or malformed JSON — fail silently
    }
  }, []);

  return items;
}

export default function RecentlyViewed() {
  const items = useRecentlyViewed();

  // Return nothing if no history
  if (!items.length) return null;

  return (
    <section aria-labelledby="recently-viewed-heading" className="py-8">
      <h2 id="recently-viewed-heading" className="mb-4 text-lg font-semibold text-black">
        Recently Viewed
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
        {items.map((product) => (
          <div key={product.id} className="w-48 shrink-0 snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
