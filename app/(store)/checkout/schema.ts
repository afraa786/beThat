// TODO: Install zod (`npm install zod`) and replace this manual schema with z.object({...})
//       for runtime validation both client-side and in API routes.
// TODO: Sync validation rules with the /api/checkout route handler once implemented.

// ─── Checkout Form Data Interface ─────────────────────────────────────────────
export interface CheckoutFormData {
  // Contact
  fullName: string        // required, min 2 chars
  email: string           // required, valid email format
  phoneNumber: string     // required, valid Indian mobile number (10 digits, optionally +91 prefix)

  // Shipping Address
  addressLine1: string    // required, min 5 chars
  addressLine2?: string   // optional
  city: string            // required
  state: string           // required
  pincode: string         // required, exactly 6 digits

  // Payment
  paymentMethod: 'razorpay' | 'cod'
  // TODO: Add razorpayOrderId and razorpayPaymentId fields once Razorpay is integrated

  // Coupon (optional)
  couponCode?: string     // optional — validated server-side via /api/coupon/validate
}

// ─── Validation Rules (plain TS — migrate to Zod once installed) ──────────────
/**
 * `checkoutSchema` describes validation rules for each field.
 * Replace with a real Zod schema once Zod is installed:
 *
 * import { z } from 'zod'
 * export const checkoutSchema = z.object({
 *   fullName:     z.string().min(2, 'Name must be at least 2 characters'),
 *   email:        z.string().email('Enter a valid email address'),
 *   phoneNumber:  z.string().regex(/^(\+91)?[6-9]\d{9}$/, 'Enter a valid Indian mobile number'),
 *   addressLine1: z.string().min(5, 'Address is too short'),
 *   addressLine2: z.string().optional(),
 *   city:         z.string().min(1, 'City is required'),
 *   state:        z.string().min(1, 'State is required'),
 *   pincode:      z.string().regex(/^\d{6}$/, 'PIN code must be exactly 6 digits'),
 *   paymentMethod:z.enum(['razorpay', 'cod']),
 *   couponCode:   z.string().optional(),
 * })
 * export type CheckoutFormData = z.infer<typeof checkoutSchema>
 */
export const checkoutSchema = {
  fullName: {
    required: true,
    minLength: 2,
    errorMessage: 'Full name must be at least 2 characters',
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessage: 'Enter a valid email address',
  },
  phoneNumber: {
    required: true,
    // Accepts: 9876543210 or +919876543210
    pattern: /^(\+91)?[6-9]\d{9}$/,
    errorMessage: 'Enter a valid 10-digit Indian mobile number',
  },
  addressLine1: {
    required: true,
    minLength: 5,
    errorMessage: 'Address is too short',
  },
  addressLine2: {
    required: false,
  },
  city: {
    required: true,
    minLength: 1,
    errorMessage: 'City is required',
  },
  state: {
    required: true,
    minLength: 1,
    errorMessage: 'State is required',
  },
  pincode: {
    required: true,
    pattern: /^\d{6}$/,
    errorMessage: 'PIN code must be exactly 6 digits',
  },
  paymentMethod: {
    required: true,
    allowedValues: ['razorpay', 'cod'] as const,
    errorMessage: 'Select a valid payment method',
  },
  couponCode: {
    required: false,
    // Validation happens server-side via /api/coupon/validate
  },
} as const

// ─── Validator helper (stub) ──────────────────────────────────────────────────
/**
 * Validates a single field against checkoutSchema rules.
 * TODO: Replace with Zod's parse/safeParse once Zod is installed.
 */
export function validateCheckoutField(
  field: keyof typeof checkoutSchema,
  value: string
): { valid: boolean; error: string | null } {
  const rule = checkoutSchema[field]

  if (rule.required && (!value || value.trim() === '')) {
    return { valid: false, error: `${String(field)} is required` }
  }

  if ('minLength' in rule && rule.minLength && value.trim().length < rule.minLength) {
    return { valid: false, error: ('errorMessage' in rule ? rule.errorMessage : null) as string }
  }

  if ('pattern' in rule && rule.pattern && !rule.pattern.test(value)) {
    return { valid: false, error: ('errorMessage' in rule ? rule.errorMessage : null) as string }
  }

  return { valid: true, error: null }
}
