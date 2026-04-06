'use client';

import Image from 'next/image';
import Link from 'next/link';
import LowStockBadge from '@/components/Hero/LowStockBadge';
import Button from '@/components/Hero/Button';

// TODO: fetch lowStockThreshold from Firestore settings doc instead of hard-coding
const DEFAULT_LOW_STOCK_THRESHOLD = 5;

export interface ProductSize {
  size: string;
  inventory: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  currentSellingPrice: number;
  images: string[];
  sizes: ProductSize[];
}

interface ProductCardProps {
  product: Product;
}

function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, name, slug, price, currentSellingPrice, images, sizes } = product;

  const primaryImage = images[0] ?? '/placeholder-product.jpg';
  const isOnSale = currentSellingPrice < price;

  // Find lowest inventory across all sizes for the low-stock badge
  const lowestInventorySize = sizes.reduce<ProductSize | null>((lowest, s) => {
    if (!lowest || s.inventory < lowest.inventory) return s;
    return lowest;
  }, null);

  // TODO: wire up to useCart hook — replace stub
  function handleAddToCart() {
    // TODO: useCart().addItem({ productId: id, size: selectedSize, quantity: 1 })
    console.log('[Cart stub] Add to cart:', id);
  }

  return (
    <article className="group flex flex-col rounded-lg border border-neutral-200 bg-white overflow-hidden">
      {/* Product image */}
      <Link href={`/shop/${slug}`} className="relative block aspect-[3/4] overflow-hidden bg-neutral-100">
        <Image
          src={primaryImage}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Details */}
      <div className="flex flex-1 flex-col gap-2 p-3">
        <Link href={`/shop/${slug}`} className="text-sm font-medium text-black hover:underline line-clamp-2">
          {name}
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-black">{formatINR(currentSellingPrice)}</span>
          {isOnSale && (
            <span className="text-xs text-neutral-400 line-through">{formatINR(price)}</span>
          )}
        </div>

        {/* Low stock badge */}
        {lowestInventorySize && (
          <LowStockBadge
            inventory={lowestInventorySize.inventory}
            threshold={DEFAULT_LOW_STOCK_THRESHOLD}
          />
        )}

        {/* Add to cart */}
        <Button
          variant="primary"
          size="sm"
          onClick={handleAddToCart}
          className="mt-auto w-full"
        >
          Add to Cart
        </Button>
      </div>
    </article>
  );
}
