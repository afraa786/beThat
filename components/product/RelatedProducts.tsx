'use client';

import { useEffect, useState } from 'react';
import ProductGrid from './ProductGrid';
import { Product } from './ProductCard';

interface RelatedProductsProps {
  categoryId: string;
  currentProductId: string;
}

// TODO: fetch from Firestore — query products where categoryId matches and id != currentProductId
// e.g. collection('products').where('categoryId', '==', categoryId).where('id', '!=', currentProductId).limit(8)
async function fetchRelatedProducts(categoryId: string, currentProductId: string): Promise<Product[]> {
  // Stub — replace with real Firestore query
  console.log('[RelatedProducts stub] fetching for category:', categoryId, 'excluding:', currentProductId);
  return [];
}

export default function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const results = await fetchRelatedProducts(categoryId, currentProductId);
        if (!cancelled) setProducts(results);
      } catch (err) {
        console.error('[RelatedProducts] fetch error:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [categoryId, currentProductId]);

  if (!loading && !products.length) return null;

  return (
    <section aria-labelledby="related-heading" className="py-8">
      <h2 id="related-heading" className="mb-4 text-lg font-semibold text-black">
        You May Also Like
      </h2>
      <ProductGrid products={products} loading={loading} skeletonCount={4} />
    </section>
  );
}
