/**
 * API client — Payment
 * Calls the /api/checkout/payment-intent Next.js route handler.
 *
 * TODO: install stripe — `npm install stripe @stripe/stripe-js`
 * TODO: add STRIPE_SECRET_KEY to .env.local (server-side only)
 * TODO: add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to .env.local (client-safe)
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PaymentIntentRequest {
  amount: number;
  currency: string;
}

export interface PaymentIntentResponse {
  /** Stripe PaymentIntent client_secret — pass to Stripe.js confirmPayment() */
  clientSecret: string;
  /** Stripe PaymentIntent ID — store on order document for reconciliation */
  paymentIntentId: string;
  amount: number;
  currency: string;
}

// ---------------------------------------------------------------------------
// API functions
// ---------------------------------------------------------------------------

/**
 * Creates a Stripe PaymentIntent by calling the BTP backend route.
 * The returned `clientSecret` must be passed to Stripe.js on the client
 * to complete the payment confirmation step.
 *
 * TODO: implement /api/checkout/payment-intent route handler:
 *   - Import `stripe` from `stripe` with STRIPE_SECRET_KEY
 *   - Call stripe.paymentIntents.create({ amount, currency, ... })
 *   - Return { clientSecret, paymentIntentId }
 *
 * TODO: integrate with @stripe/stripe-js on the client:
 *   - loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
 *   - stripe.confirmPayment({ elements, clientSecret })
 *
 * @param amount    Amount in the smallest currency unit (e.g. paise for INR).
 *                  Multiply display price × 100 before passing here.
 * @param currency  ISO 4217 currency code, lowercase (e.g. 'inr', 'usd').
 */
export async function createPaymentIntent(
  amount: number,
  currency: string,
): Promise<PaymentIntentResponse> {
  const payload: PaymentIntentRequest = { amount, currency };

  // TODO: replace with real fetch once /api/checkout/payment-intent POST is implemented
  // const res = await fetch("/api/checkout/payment-intent", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // });
  // if (!res.ok) {
  //   const err = await res.json().catch(() => ({}));
  //   throw new Error(err?.message ?? `Failed to create payment intent: ${res.statusText}`);
  // }
  // return res.json() as Promise<PaymentIntentResponse>;

  console.warn("[payment.ts] createPaymentIntent() — stub, payload:", payload);
  return {
    clientSecret: "pi_stub_secret",
    paymentIntentId: "pi_stub_id",
    amount,
    currency,
  };
}
