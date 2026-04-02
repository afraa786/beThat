'use client';

// TODO: install @stripe/react-stripe-js and @stripe/stripe-js
// TODO: wrap this component (or the checkout page) with <Elements stripe={stripePromise}> from @stripe/react-stripe-js
// TODO: create payment intent server-side via POST /api/checkout/payment-intent and pass clientSecret here

interface PaymentFormProps {
  /** Total amount in paise (smallest INR unit), used when creating the payment intent */
  amountInPaise: number;
  onSuccess: (paymentIntentId: string) => void;
  onError: (message: string) => void;
}

export default function PaymentForm({ amountInPaise, onSuccess, onError }: PaymentFormProps) {
  // TODO: fetch client secret from /api/checkout/payment-intent
  // const [clientSecret, setClientSecret] = useState<string | null>(null);
  // useEffect(() => {
  //   fetch('/api/checkout/payment-intent', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ amountInPaise }),
  //   })
  //     .then(r => r.json())
  //     .then(data => setClientSecret(data.clientSecret));
  // }, [amountInPaise]);

  // TODO: replace this placeholder with real Stripe Elements:
  // <PaymentElement /> inside <Elements stripe={stripePromise} options={{ clientSecret }}>

  function handleStubPay() {
    console.log('[PaymentForm stub] amountInPaise:', amountInPaise);
    // TODO: call stripe.confirmPayment({ elements, confirmParams: { return_url: '...' } })
    // On success: onSuccess(paymentIntent.id)
    // On error: onError(error.message)
    onError('Payment integration is not yet implemented.');
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-4 py-6 text-center text-sm text-neutral-500">
        {/* Stripe Elements will be rendered here once integrated */}
        <p className="font-medium text-neutral-700">Stripe Payment</p>
        <p className="mt-1 text-xs">
          TODO: Integrate{' '}
          <code className="rounded bg-neutral-200 px-1 py-0.5 text-xs">@stripe/react-stripe-js</code>
          {' '}and create a payment intent via{' '}
          <code className="rounded bg-neutral-200 px-1 py-0.5 text-xs">/api/checkout/payment-intent</code>.
        </p>
      </div>

      <button
        type="button"
        onClick={handleStubPay}
        className="w-full rounded bg-black py-3 text-sm font-semibold text-white hover:bg-neutral-800"
      >
        Pay now {/* TODO: show formatted amount */}
      </button>
    </div>
  );
}
