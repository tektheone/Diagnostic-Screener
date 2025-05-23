import { type ButtonHTMLAttributes, useCallback, useRef } from 'react';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 focus:ring-blue-500/50',
  secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-gray-500/50'
};

export const Button = ({
  variant = 'primary',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const baseStyles = [
    'relative overflow-hidden rounded-lg font-medium px-4 py-2',
    'transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'active:scale-[0.98]'
  ].join(' ');

  const classes = [
    baseStyles,
    variants[variant],
    fullWidth && 'w-full',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={buttonRef}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
};
