/**
 * API client / business logic — Coupons
 *
 * TODO: install firebase — `npm install firebase`
 * TODO: once Firebase is installed, fetch coupon documents from Firestore
 *       instead of accepting a raw CouponDocument as a parameter.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Mirrors the Firestore coupon document structure. */
export type CouponRestrictionType =
  | "noRestriction"
  | "collection"
  | "category"
  | "product";

export interface CouponDocument {
  code: string;
  discountType: "flat" | "percentage";
  discountValue: number;
  restrictionType: CouponRestrictionType;
  /** Applicable collection IDs — populated when restrictionType === 'collection' */
  applicableCollections?: string[];
  /** Applicable category slugs — populated when restrictionType === 'category' */
  applicableCategories?: string[];
  /** Applicable product IDs — populated when restrictionType === 'product' */
  applicableProducts?: string[];
  /** ISO date string; null = no expiry */
  expiresAt: string | null;
  /** Max total redemptions; null = unlimited */
  usageLimit: number | null;
  /** Running count of redemptions */
  usageCount: number;
  /** Minimum cart total required (INR); null = no minimum */
  minOrderAmount: number | null;
  /** Maximum cart total allowed (INR); null = no maximum */
  maxOrderAmount: number | null;
  /** Per-user usage cap; null = unlimited per user */
  perUserLimit: number | null;
  isActive: boolean;
}

export type CouponValidationStatus =
  | "valid"
  | "invalid_code"
  | "expired"
  | "usage_limit_reached"
  | "per_user_limit_reached"
  | "below_min_amount"
  | "above_max_amount"
  | "restriction_not_met"
  | "inactive";

export interface CouponValidationResult {
  status: CouponValidationStatus;
  valid: boolean;
  discountAmount: number;
  /** Human-readable message suitable for display in the UI */
  message: string;
  coupon: CouponDocument | null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function calculateDiscount(coupon: CouponDocument, cartTotal: number): number {
  if (coupon.discountType === "flat") {
    return Math.min(coupon.discountValue, cartTotal);
  }
  // percentage
  return Math.round((cartTotal * coupon.discountValue) / 100);
}

// ---------------------------------------------------------------------------
// Main validation function
// ---------------------------------------------------------------------------

/**
 * Validates a coupon code against business rules and the current cart.
 *
 * Checks performed (in order):
 *  1. Active flag
 *  2. Expiry date
 *  3. Global usage limit
 *  4. Per-user usage limit
 *  5. Minimum order amount
 *  6. Maximum order amount
 *  7. Restriction type (noRestriction / collection / category / product)
 *
 * TODO: replace the `coupon` parameter with a Firestore lookup by `code` once
 *       Firebase is installed:
 *         const couponSnap = await db.collection('coupons')
 *           .where('code', '==', code.toUpperCase()).limit(1).get();
 *         if (couponSnap.empty) return { status: 'invalid_code', valid: false, ... };
 *         const coupon = couponSnap.docs[0].data() as CouponDocument;
 *
 * TODO: track per-user usage via a sub-collection `coupons/{couponId}/usage/{userId}`
 *       and compare against coupon.perUserLimit.
 *
 * @param code       Coupon code entered by the user.
 * @param userId     Authenticated user's UID (pass '' for guests).
 * @param cartTotal  Current cart subtotal in INR (before discounts).
 * @param coupon     Raw coupon document — temporary param until Firestore lookup is added.
 */
export async function validateCoupon(
  code: string,
  userId: string,
  cartTotal: number,
  // TODO: remove this param once Firestore lookup is implemented above
  coupon?: CouponDocument,
): Promise<CouponValidationResult> {
  // TODO: perform Firestore lookup here instead of accepting coupon as param
  if (!coupon) {
    return {
      status: "invalid_code",
      valid: false,
      discountAmount: 0,
      message: "Coupon code not found.",
      coupon: null,
    };
  }

  // 1. Active check
  if (!coupon.isActive) {
    return {
      status: "inactive",
      valid: false,
      discountAmount: 0,
      message: "This coupon is no longer active.",
      coupon: null,
    };
  }

  // 2. Expiry check
  if (coupon.expiresAt !== null && new Date(coupon.expiresAt) < new Date()) {
    return {
      status: "expired",
      valid: false,
      discountAmount: 0,
      message: "This coupon has expired.",
      coupon: null,
    };
  }

  // 3. Global usage limit
  if (coupon.usageLimit !== null && coupon.usageCount >= coupon.usageLimit) {
    return {
      status: "usage_limit_reached",
      valid: false,
      discountAmount: 0,
      message: "This coupon has reached its usage limit.",
      coupon: null,
    };
  }

  // 4. Per-user usage limit
  // TODO: replace the stub below with a real Firestore per-user usage count query
  if (coupon.perUserLimit !== null && userId) {
    const userUsageCount = 0; // TODO: fetch from Firestore coupons/{id}/usage/{userId}
    if (userUsageCount >= coupon.perUserLimit) {
      return {
        status: "per_user_limit_reached",
        valid: false,
        discountAmount: 0,
        message: "You have already used this coupon the maximum number of times.",
        coupon: null,
      };
    }
  }

  // 5. Minimum order amount
  if (coupon.minOrderAmount !== null && cartTotal < coupon.minOrderAmount) {
    return {
      status: "below_min_amount",
      valid: false,
      discountAmount: 0,
      message: `A minimum order of ₹${coupon.minOrderAmount} is required for this coupon.`,
      coupon: null,
    };
  }

  // 6. Maximum order amount
  if (coupon.maxOrderAmount !== null && cartTotal > coupon.maxOrderAmount) {
    return {
      status: "above_max_amount",
      valid: false,
      discountAmount: 0,
      message: `This coupon is only valid for orders up to ₹${coupon.maxOrderAmount}.`,
      coupon: null,
    };
  }

  // 7. Restriction type
  // For 'collection', 'category', or 'product' restrictions the caller must
  // pass cart items so we can check applicability. Currently we accept only
  // the cartTotal; when cart item details are available extend this function.
  switch (coupon.restrictionType) {
    case "noRestriction":
      // No further checks needed
      break;

    case "collection":
      // TODO: verify at least one cart item belongs to coupon.applicableCollections
      // Requires cart items to be passed — extend function signature when ready
      console.warn(
        "[coupons.ts] collection restriction check not yet implemented — treating as valid",
      );
      break;

    case "category":
      // TODO: verify at least one cart item belongs to coupon.applicableCategories
      console.warn(
        "[coupons.ts] category restriction check not yet implemented — treating as valid",
      );
      break;

    case "product":
      // TODO: verify at least one cart item is in coupon.applicableProducts
      console.warn(
        "[coupons.ts] product restriction check not yet implemented — treating as valid",
      );
      break;

    default:
      return {
        status: "restriction_not_met",
        valid: false,
        discountAmount: 0,
        message: "This coupon cannot be applied to your current cart.",
        coupon: null,
      };
  }

  const discountAmount = calculateDiscount(coupon, cartTotal);

  return {
    status: "valid",
    valid: true,
    discountAmount,
    message: `Coupon applied! You save ₹${discountAmount}.`,
    coupon,
  };
}
