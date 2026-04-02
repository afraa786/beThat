'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import Spinner from './Spinner';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-black text-white hover:bg-neutral-800 focus-visible:ring-black',
  secondary: 'bg-neutral-100 text-black hover:bg-neutral-200 focus-visible:ring-neutral-400',
  outline: 'border border-black bg-transparent text-black hover:bg-black hover:text-white focus-visible:ring-black',
  ghost: 'bg-transparent text-black hover:bg-neutral-100 focus-visible:ring-neutral-400',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  onClick,
  type = 'button',
  className = '',
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
      className={[
        'inline-flex items-center justify-center gap-2 rounded font-medium transition-colors',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
}
