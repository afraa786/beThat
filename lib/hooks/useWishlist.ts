"use client";

/**
 * useWishlist — manages wishlist state for Be That Percent (BTP).
 *
 * Strategy:
 *   - Guests: wishlist persisted in localStorage key 'btp_wishlist'.
 *   - Logged-in users: wishlist synced with Firestore 'wishlists/{userId}' document.
 *     Falls back to localStorage if Firestore is unavailable.
 *
 * TODO: install firebase — `npm install firebase`
 * TODO: once Firebase is installed, sync with Firestore:
 *   - On mount: read wishlist from Firestore for authenticated users.
 *   - On addToWishlist: call Firestore arrayUnion on the wishlist document.
 *   - On removeFromWishlist: call Firestore arrayRemove on the wishlist document.
 *   - On sign-in: merge localStorage wishlist into Firestore, then clear localStorage.
 */

import { useState, useEffect, useCallback } from "react";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = "btp_wishlist";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface UseWishlistReturn {
  /** Array of product IDs (Firestore document IDs or slugs) in the wishlist. */
  wishlist: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  /** Returns true if the given product ID is in the wishlist. */
  isInWishlist: (productId: string) => boolean;
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
    // Storage may be unavailable — fail silently
  }
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useWishlist(): UseWishlistReturn {
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Hydrate from localStorage on mount (deferred to avoid SSR mismatch)
  useEffect(() => {
    setWishlist(readFromStorage());

    // TODO: install firebase — once installed, replace localStorage read with Firestore:
    // import { auth, db } from '@/lib/firebase'; // TODO: create lib/firebase.ts
    // const user = auth.currentUser;
    // if (user) {
    //   const snap = await db.collection('wishlists').doc(user.uid).get();
    //   const firestoreItems: string[] = snap.data()?.productIds ?? [];
    //   // Merge with any guest items accumulated before sign-in
    //   const localItems = readFromStorage();
    //   const merged = Array.from(new Set([...firestoreItems, ...localItems]));
    //   setWishlist(merged);
    //   // Persist merged list back to Firestore and clear localStorage
    //   await db.collection('wishlists').doc(user.uid).set({ productIds: merged }, { merge: true });
    //   localStorage.removeItem(STORAGE_KEY);
    // } else {
    //   setWishlist(readFromStorage());
    // }
  }, []);

  const addToWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) return prev;
      const updated = [...prev, productId];
      writeToStorage(updated);

      // TODO: install firebase — sync to Firestore for authenticated users:
      // const user = auth.currentUser;
      // if (user) {
      //   db.collection('wishlists').doc(user.uid).set(
      //     { productIds: arrayUnion(productId) },
      //     { merge: true },
      //   );
      // }

      return updated;
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      const updated = prev.filter((id) => id !== productId);
      writeToStorage(updated);

      // TODO: install firebase — sync to Firestore for authenticated users:
      // const user = auth.currentUser;
      // if (user) {
      //   db.collection('wishlists').doc(user.uid).update({
      //     productIds: arrayRemove(productId),
      //   });
      // }

      return updated;
    });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist],
  );

  return { wishlist, addToWishlist, removeFromWishlist, isInWishlist };
}
