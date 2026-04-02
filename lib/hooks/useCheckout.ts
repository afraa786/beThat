"use client";

/**
 * useCheckout — multi-step checkout state machine for Be That Percent (BTP).
 *
 * Step flow: address → payment → review → complete
 *
 * TODO: integrate with checkout API:
 *   - POST /api/checkout/address to validate and save shipping address
 *   - POST /api/checkout/payment-intent (via lib/api/payment.ts) to create Stripe intent
 *   - POST /api/checkout/order to finalise and place the order
 */

import { useState, useCallback } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CheckoutStep = "address" | "payment" | "review" | "complete";

export interface ShippingAddress {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface UseCheckoutReturn {
  step: CheckoutStep;
  address: ShippingAddress | null;
  paymentIntentClientSecret: string | null;
  isSubmitting: boolean;
  error: string | null;
  setAddress: (address: ShippingAddress) => void;
  goToStep: (step: CheckoutStep) => void;
  submitOrder: () => Promise<void>;
}

const STEP_ORDER: CheckoutStep[] = ["address", "payment", "review", "complete"];

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useCheckout(): UseCheckoutReturn {
  const [step, setStep] = useState<CheckoutStep>("address");
  const [address, setAddressState] = useState<ShippingAddress | null>(null);
  const [paymentIntentClientSecret, setPaymentIntentClientSecret] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setAddress = useCallback((newAddress: ShippingAddress) => {
    setAddressState(newAddress);
    setError(null);

    // TODO: call POST /api/checkout/address to validate address server-side,
    //       then call createPaymentIntent() from lib/api/payment.ts:
    //   const intent = await createPaymentIntent(cartTotal * 100, 'inr');
    //   setPaymentIntentClientSecret(intent.clientSecret);

    // Advance to payment step once address is set
    setStep("payment");
  }, []);

  const goToStep = useCallback((targetStep: CheckoutStep) => {
    const currentIndex = STEP_ORDER.indexOf(step);
    const targetIndex = STEP_ORDER.indexOf(targetStep);

    // Only allow navigating back or to immediately adjacent next step
    if (targetIndex <= currentIndex) {
      setStep(targetStep);
      setError(null);
    } else {
      console.warn(
        `[useCheckout] Cannot jump forward from "${step}" to "${targetStep}" — complete intermediate steps first.`,
      );
    }
  }, [step]);

  const submitOrder = useCallback(async (): Promise<void> => {
    setIsSubmitting(true);
    setError(null);

    try {
      // TODO: call POST /api/checkout/order with:
      //   { address, paymentIntentId (from Stripe confirmation result) }
      // The server should:
      //   1. Confirm payment with Stripe
      //   2. Create the Firestore order document
      //   3. Deduct stock from product size variants
      //   4. Send order confirmation notification (via lib/api/notifications.ts)
      //   5. Clear the cart

      // TODO: on success, extract the created orderId from the response
      //   const { orderId } = await res.json();

      console.warn("[useCheckout] submitOrder() — stub, marking as complete");
      setStep("complete");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Order submission failed.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
    step,
    address,
    paymentIntentClientSecret,
    isSubmitting,
    error,
    setAddress,
    goToStep,
    submitOrder,
  };
}
