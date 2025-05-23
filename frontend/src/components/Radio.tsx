import { type InputHTMLAttributes } from 'react';

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export const Radio = ({ label, checked, className = '', ...props }: RadioProps) => {
  const baseClasses = 'group flex items-center cursor-pointer gap-3';
  const radioClasses = [
    'relative w-5 h-5 border-2 rounded-full',
    'transition-all duration-200 ease-in-out',
    'group-hover:border-blue-500 dark:group-hover:border-blue-400',
    checked
      ? 'border-blue-500 dark:border-blue-400'
      : 'border-gray-300 dark:border-gray-600'
  ].join(' ');

  const dotClasses = [
    'absolute inset-0 m-auto w-2.5 h-2.5 rounded-full',
    'bg-blue-500 dark:bg-blue-400',
    'transition-all duration-200 ease-in-out',
    checked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
  ].join(' ');

  const labelClasses = [
    'font-medium transition-colors duration-200',
    'text-gray-700 dark:text-gray-200',
    checked && 'text-blue-600 dark:text-blue-400'
  ].filter(Boolean).join(' ');

  return (
    <label className={[baseClasses, className].join(' ')}>
      <div className="relative">
        <input
          type="radio"
          className="sr-only"
          checked={checked}
          {...props}
        />
        <div className={radioClasses}>
          <div className={dotClasses} />
        </div>
      </div>
      <span className={labelClasses}>{label}</span>
    </label>
  );
};
