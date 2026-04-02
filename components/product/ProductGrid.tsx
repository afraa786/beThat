// Server-compatible — no interactivity at this level

import ProductCard, { Product } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  /** Number of skeleton cards to show while loading */
  skeletonCount?: number;
}

function SkeletonCard() {
  return (
    <div className="flex flex-col rounded-lg border border-neutral-200 bg-white overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-neutral-200" />
      <div className="flex flex-col gap-2 p-3">
        <div className="h-4 w-3/4 rounded bg-neutral-200" />
        <div className="h-4 w-1/3 rounded bg-neutral-200" />
        <div className="mt-2 h-8 rounded bg-neutral-200" />
      </div>
    </div>
  );
}

export default function ProductGrid({ products, loading = false, skeletonCount = 8 }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {loading
        ? Array.from({ length: skeletonCount }).map((_, i) => <SkeletonCard key={i} />)
        : products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}
