// Purely presentational — no client directive needed

interface SizeRecommendationBadgeProps {
  /** The size the user normally wears, e.g. "M" */
  userUsualSize: string | undefined;
  /** The user's height, e.g. "165cm" */
  userHeight: string | undefined;
  /** The size the product model is wearing */
  modelSize: string | undefined;
  /** The product model's height, e.g. "170cm" */
  modelHeight: string | undefined;
}

/**
 * Compares the user's usual size and height against the product model's details
 * and returns a recommendation badge.
 *
 * Returns null when there is insufficient data to make a recommendation.
 *
 * TODO: Implement full sizing logic — consider:
 *   - Normalising height units (cm / ft-in)
 *   - Size chart mapping per category (tops, bottoms, dresses)
 *   - Height-based fit guidance (e.g. petite / tall)
 *   - Fetching user profile from Firestore users/{uid} document
 */
export default function SizeRecommendationBadge({
  userUsualSize,
  userHeight,
  modelSize,
  modelHeight,
}: SizeRecommendationBadgeProps) {
  // Guard: need at minimum the user's usual size and the model's size
  if (!userUsualSize || !modelSize) return null;

  // TODO: replace this stub comparison with a proper size + height algorithm
  const sizesMatch = userUsualSize.trim().toUpperCase() === modelSize.trim().toUpperCase();

  // Build recommendation copy
  let recommendation: string;

  if (sizesMatch) {
    const heightNote =
      userHeight && modelHeight
        ? ` The model (${modelHeight}) is close to your height (${userHeight}).`
        : '';
    recommendation = `Based on your profile, this model wears your size.${heightNote}`;
  } else {
    // Sizes differ — surface the model info so the shopper can judge
    recommendation = `The model wears size ${modelSize}${modelHeight ? ` and is ${modelHeight} tall` : ''}. You usually wear ${userUsualSize} — you may want to size accordingly.`;
  }

  return (
    <p className="inline-flex items-start gap-1.5 rounded-md bg-blue-50 px-3 py-2 text-xs text-blue-700">
      {/* Info icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mt-0.5 h-3.5 w-3.5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {recommendation}
    </p>
  );
}
