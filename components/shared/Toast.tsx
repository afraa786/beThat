'use client';

import { useEffect } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  onDismiss: () => void;
  /** Auto-dismiss delay in ms — default 3000 */
  duration?: number;
}

const typeStyles: Record<ToastType, string> = {
  success: 'bg-green-600 text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-neutral-800 text-white',
};

const typeIcons: Record<ToastType, string> = {
  success: '✓',
  error: '✕',
  info: 'i',
};

export default function Toast({ message, type = 'info', onDismiss, duration = 3000 }: ToastProps) {
  // Auto-dismiss after `duration` ms
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [onDismiss, duration]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={[
        'flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg',
        typeStyles[type],
      ].join(' ')}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
        {typeIcons[type]}
      </span>
      <p className="flex-1 text-sm">{message}</p>
      <button
        aria-label="Dismiss notification"
        onClick={onDismiss}
        className="ml-2 rounded p-0.5 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
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
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
