import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeOption } from '../constants/theme';

interface ThemeContextType {
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Apply theme to document without waiting for React to render
function getInitialTheme(): ThemeOption {
  if (typeof window !== 'undefined') {
    // Check localStorage first
    const storedTheme = localStorage.getItem('theme') as ThemeOption;
    if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
      return storedTheme;
    }
    
    // If no stored theme, use system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'system';
    }
  }
  return 'system'; // Default fallback
}

// Apply theme to document immediately to prevent flash
function applyThemeToDOM(theme: ThemeOption) {
  if (typeof window === 'undefined') return;
  
  const root = window.document.documentElement;
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  root.classList.remove('light', 'dark');
  root.classList.add(isDark ? 'dark' : 'light');
}

// We'll apply the theme in useEffect instead of immediately to avoid hydration mismatches

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeOption>(getInitialTheme);
  const [mounted, setMounted] = useState(false);

  // Handle theme changes
  const handleThemeChange = (newTheme: ThemeOption) => {
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
    // We'll apply the theme in the useEffect below
  };

  // After mounting, we have access to the window object
  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply theme when component mounts and whenever theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Apply initial theme from localStorage or system preference
    const initialTheme = getInitialTheme();
    if (initialTheme !== theme) {
      setTheme(initialTheme);
    }
    
    // Apply current theme to DOM
    applyThemeToDOM(theme);
    
    // Handle system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const listener = () => {
      if (theme === 'system') {
        applyThemeToDOM('system');
      }
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme, mounted]);

  // Prevent flash of incorrect theme
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}