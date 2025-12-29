import type { Theme } from './theme.types';

export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    bgBody: '#f8fafc',
    bgAlt: '#f1f5f9',
    bgGlass: 'rgba(255, 255, 255, 0.7)',
    borderGlass: 'rgba(0, 0, 0, 0.1)',
    textMain: '#0f172a',
    textMuted: '#64748b',
    primary: '#0ea5e9',
    primaryGlow: 'rgba(14, 165, 233, 0.2)',
    secondary: '#6366f1',
    accent: '#f43f5e',
    danger: '#ef4444',
    success: '#22c55e',
    warning: '#f59e0b',
    info: '#3b82f6',
    cardShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
};
