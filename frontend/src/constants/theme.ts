import React, { ReactNode } from 'react';
import { SunIcon, MoonIcon, SystemIcon } from '../components/atoms/icons';

export type ThemeOption = 'light' | 'dark' | 'system';

export interface ThemeOptionConfig {
  value: ThemeOption;
  label: string;
  icon: ReactNode;
}

// Define theme options with their respective icons and labels
export const THEME_OPTIONS: ThemeOptionConfig[] = [
  {
    value: 'light',
    label: 'Light',
    icon: React.createElement(SunIcon, { className: "w-4 h-4" })
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: React.createElement(MoonIcon, { className: "w-4 h-4" })
  },
  {
    value: 'system',
    label: 'System',
    icon: React.createElement(SystemIcon, { className: "w-4 h-4" })
  }
];
