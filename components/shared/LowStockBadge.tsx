// Purely presentational — no client directive needed

interface LowStockBadgeProps {
  inventory: number;
  threshold: number;
}

/**
 * Renders a warning badge when inventory is at or below the threshold.
 * Returns null when stock is sufficient.
 */
export default function LowStockBadge({ inventory, threshold }: LowStockBadgeProps) {
  if (inventory > threshold) return null;

  return (
    <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700">
      Only {inventory} left in your size
    </span>
  );
}
