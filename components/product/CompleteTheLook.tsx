'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface OutfitProduct {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  currentSellingPrice: number;
}

interface ShopTheLookDoc {
  id: string;
  title: string;
  outfitImage: string;
  products: OutfitProduct[];
}

interface CompleteTheLookProps {
  productId: string;
}

// TODO: query Firestore shopTheLook collection where productIds array-contains productId
// e.g. collection('shopTheLook').where('productIds', 'array-contains', productId)
async function fetchShopTheLookDocs(productId: string): Promise<ShopTheLookDoc[]> {
  // Stub — replace with real Firestore query
  console.log('[CompleteTheLook stub] fetching looks for product:', productId);
  return [];
}

function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

export default function CompleteTheLook({ productId }: CompleteTheLookProps) {
  const [looks, setLooks] = useState<ShopTheLookDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const results = await fetchShopTheLookDocs(productId);
        if (!cancelled) setLooks(results);
      } catch (err) {
        console.error('[CompleteTheLook] fetch error:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [productId]);

  if (!loading && !looks.length) return null;

  return (
    <section aria-labelledby="ctl-heading" className="py-8">
      <h2 id="ctl-heading" className="mb-4 text-lg font-semibold text-black">
        Complete the Look
      </h2>

      {loading ? (
        // Skeleton
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {[0, 1].map((i) => (
            <div key={i} className="animate-pulse rounded-lg bg-neutral-100 p-4">
              <div className="aspect-[3/4] rounded bg-neutral-200" />
              <div className="mt-3 h-4 w-2/3 rounded bg-neutral-200" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {looks.map((look) => (
            <div key={look.id} className="rounded-lg border border-neutral-200 overflow-hidden">
              {/* Outfit styled image */}
              <div className="relative aspect-[3/4] bg-neutral-100">
                <Image
                  src={look.outfitImage}
                  alt={look.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>

              {/* Products in this look */}
              <div className="p-4">
                <p className="mb-3 text-sm font-medium text-black">{look.title}</p>
                <ul className="space-y-2">
                  {look.products.map((p) => (
                    <li key={p.id} className="flex items-center gap-3">
                      <div className="relative h-12 w-9 shrink-0 overflow-hidden rounded bg-neutral-100">
                        <Image src={p.imageUrl} alt={p.name} fill className="object-cover" sizes="36px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/shop/${p.slug}`} className="block truncate text-sm hover:underline">
                          {p.name}
                        </Link>
                        <span className="text-xs text-neutral-500">{formatINR(p.currentSellingPrice)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
