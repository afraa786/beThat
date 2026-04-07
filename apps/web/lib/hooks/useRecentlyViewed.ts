"use client";

/**
 * useRecentlyViewed — persists up to 10 recently viewed product slugs / IDs
 * in localStorage for Be That Percent (BTP).
 *
 * localStorage key: 'btp_recently_viewed'
 * Value format:     JSON array of product slug strings (most-recent first).
 *
 * Hydration is deferred to a useEffect to avoid SSR/client mismatch.
 */

import { useState, useEffect, useCallback } from "react";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = "btp_recently_viewed";
const MAX_ITEMS = 10;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface UseRecentlyViewedReturn {
  /** Ordered array of product slugs/IDs, most-recently viewed first. */
  recentlyViewed: string[];
  /**
   * Records a product view. If the ID already exists it is moved to the front.
   * Trims the list to MAX_ITEMS after insertion.
   */
  addToRecentlyViewed: (productId: string) => void;
  /** Clears the list from both state and localStorage. */
  clearRecentlyViewed: () => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readFromStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

function writeToStorage(items: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage may be unavailable (private browsing quota, etc.) — fail silently
  }
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useRecentlyViewed(): UseRecentlyViewedReturn {
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  // Hydrate from localStorage on mount (client-only — avoids SSR mismatch)
  useEffect(() => {
    setRecentlyViewed(readFromStorage());
  }, []);

  const addToRecentlyViewed = useCallback((productId: string) => {
    setRecentlyViewed((prev) => {
      // Remove duplicate if present, prepend, then enforce max length
      const filtered = prev.filter((id) => id !== productId);
      const updated = [productId, ...filtered].slice(0, MAX_ITEMS);
      writeToStorage(updated);
      return updated;
    });
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Fail silently
    }
    setRecentlyViewed([]);
  }, []);

  return { recentlyViewed, addToRecentlyViewed, clearRecentlyViewed };
}
