// No client directive needed — purely presentational

type SpinnerSize = 'sm' | 'md' | 'lg';

interface SpinnerProps {
  size?: SpinnerSize;
  /** Accessible label — defaults to "Loading" */
  label?: string;
}

const sizeMap: Record<SpinnerSize, number> = {
  sm: 14,
  md: 20,
  lg: 32,
};

export default function Spinner({ size = 'md', label = 'Loading' }: SpinnerProps) {
  const px = sizeMap[size];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label={label}
      role="status"
      className="animate-spin"
    >
      {/* Partial circle to convey spinning motion */}
      <path d="M12 2a10 10 0 1 0 10 10" />
    </svg>
  );
}
