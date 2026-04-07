// Purely presentational — no client directive needed

interface StepIndicatorProps {
  steps: string[];
  currentStep: number; // 0-indexed
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="Checkout progress">
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <li key={step} className="flex flex-1 items-center">
              {/* Step dot */}
              <div className="flex flex-col items-center gap-1">
                <div
                  aria-current={isActive ? 'step' : undefined}
                  className={[
                    'flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors',
                    isCompleted
                      ? 'bg-black text-white'
                      : isActive
                      ? 'border-2 border-black bg-white text-black'
                      : 'border-2 border-neutral-300 bg-white text-neutral-400',
                  ].join(' ')}
                >
                  {isCompleted ? (
                    /* Checkmark */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={[
                    'hidden text-xs sm:block',
                    isActive ? 'font-medium text-black' : 'text-neutral-400',
                  ].join(' ')}
                >
                  {step}
                </span>
              </div>

              {/* Connector line between steps */}
              {!isLast && (
                <div
                  aria-hidden="true"
                  className={[
                    'mx-2 h-0.5 flex-1 transition-colors',
                    isCompleted ? 'bg-black' : 'bg-neutral-200',
                  ].join(' ')}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
