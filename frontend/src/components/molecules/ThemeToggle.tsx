import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { ChevronDownIcon } from '../atoms/icons';
import { THEME_OPTIONS, ThemeOption } from '../../constants/theme';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme() as { theme: ThemeOption, setTheme: (theme: ThemeOption) => void };
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const optionRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();

    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
      setIsOpen(true);
      setActiveIndex(0);
      return;
    }

    if (isOpen) {
      switch (e.key) {
        case 'ArrowDown':
          setActiveIndex(prev => (prev + 1) % THEME_OPTIONS.length);
          break;
        case 'ArrowUp':
          setActiveIndex(prev => (prev - 1 + THEME_OPTIONS.length) % THEME_OPTIONS.length);
          break;
        case 'Enter':
        case ' ':
          if (activeIndex >= 0) {
            setTheme(THEME_OPTIONS[activeIndex].value);
            setIsOpen(false);
            setActiveIndex(-1);
            buttonRef.current?.focus();
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setActiveIndex(-1);
          buttonRef.current?.focus();
          break;
        case 'Tab':
          setIsOpen(false);
          setActiveIndex(-1);
          break;
      }
    }
  };

  // Focus management
  React.useEffect(() => {
    if (isOpen && activeIndex >= 0) {
      optionRefs.current[activeIndex]?.focus();
    }
  }, [isOpen, activeIndex]);

  return (
    <div className="relative inline-block" onKeyDown={handleKeyDown} ref={dropdownRef}>
      {/* Backdrop for closing dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      <button
        ref={buttonRef}
        type="button"
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out shadow-sm hover:shadow active:scale-95"
        aria-label="Theme settings"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {THEME_OPTIONS.find(opt => opt.value === theme)?.icon}
        <span className="hidden sm:inline-block">{THEME_OPTIONS.find(opt => opt.value === theme)?.label}</span>
        <ChevronDownIcon className="w-4 h-4 ml-1 text-gray-400 dark:text-gray-500" />
      </button>

      <div
        className={`absolute right-0 mt-2 w-40 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-200 ease-in-out z-50 ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="theme-menu-button"
      >
        {THEME_OPTIONS.map((option, index) => (
          <button
            key={option.value}
            ref={(el: HTMLButtonElement | null) => {
              if (el) optionRefs.current[index] = el;
            }}
            onClick={() => {
              setTheme(option.value);
              setIsOpen(false);
              buttonRef.current?.focus();
            }}
            tabIndex={isOpen ? 0 : -1}
            role="menuitem"
            aria-selected={theme === option.value}
            className={`w-full flex items-center gap-2 px-4 py-2 text-sm ${theme === option.value ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'} transition-colors duration-150`}
          >
            {option.icon}
            {option.label}
          </button>
        ))}

      </div>
    </div>
  );
}