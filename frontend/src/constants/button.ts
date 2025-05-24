/**
 * Button style constants
 * This file contains all the style constants for the Button component
 */

// Button variant types
export type ButtonVariant = 'primary' | 'secondary';

// Base styles applied to all buttons
export const BUTTON_BASE_STYLES = [
  'relative overflow-hidden rounded-lg font-medium transition-all duration-200',
  'focus:outline-none focus:ring-2 focus:ring-offset-2',
  'disabled:opacity-50 disabled:cursor-not-allowed',
  'active:animate-tap'
].join(' ');

// Variant-specific styles
export const BUTTON_VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: [
    'bg-blue-500 text-white',
    'hover:bg-blue-600',
    'focus:ring-blue-500'
  ].join(' '),
  secondary: [
    'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white',
    'hover:bg-gray-300 dark:hover:bg-gray-600',
    'focus:ring-gray-500 dark:focus:ring-gray-400',
    'border border-gray-300 dark:border-gray-600'
  ].join(' ')
};
