"use client";

/**
 * useProduct — fetches a single product and manages size selection / add-to-cart
 * for Be That Percent (BTP).
 *
 * TODO: fetch from /api/products/[slug] once the route handler is implemented
 *       (see lib/api/products.ts → getProductBySlug).
 */

import { useState, useEffect, useCallback } from "react";
import type { Product, ProductSize } from "@/lib/api/products";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface UseProductReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
  selectedSize: ProductSize | null;
  setSelectedSize: (size: ProductSize | null) => void;
  addToCart: () => void;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * @param slug  URL slug of the product to load (e.g. 'floral-kurta-set').
 */
export function useProduct(slug: string): UseProductReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;

    async function fetchProduct() {
      setLoading(true);
      setError(null);

      try {
        // TODO: replace with real API call once /api/products/[slug] is implemented:
        // const { getProductBySlug } = await import("@/lib/api/products");
        // const data = await getProductBySlug(slug);
        // if (cancelled) return;
        // if (!data) {
        //   setError("Product not found.");
        //   setProduct(null);
        // } else {
        //   setProduct(data);
        //   setSelectedSize(data.sizes[0] ?? null);
        // }

        console.warn(`[useProduct] fetch stub for slug="${slug}" — no data returned`);
        if (!cancelled) {
          setProduct(null);
          setSelectedSize(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load product.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void fetchProduct();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const addToCart = useCallback(() => {
    if (!product) {
      console.warn("[useProduct] addToCart called before product loaded.");
      return;
    }
    if (!selectedSize) {
      console.warn("[useProduct] addToCart called without a selected size.");
      return;
    }
    if (selectedSize.stock === 0) {
      console.warn("[useProduct] addToCart called for an out-of-stock size.");
      return;
    }

    // TODO: call useCart().addItem() or dispatch to a shared cart context:
    // cartContext.addItem({
    //   productId: product.id,
    //   productName: product.name,
    //   slug: product.slug,
    //   image: product.images[0] ?? '',
    //   sizeId: selectedSize.id,
    //   sizeLabel: selectedSize.label,
    //   quantity: 1,
    //   unitPrice: product.currentSellingPrice,
    // });

    console.info(
      `[useProduct] addToCart — product="${product.name}", size="${selectedSize.label}"`,
    );
  }, [product, selectedSize]);

  return {
    product,
    loading,
    error,
    selectedSize,
    setSelectedSize,
    addToCart,
  };
}
