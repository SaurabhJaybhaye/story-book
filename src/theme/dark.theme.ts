import type { Theme } from './theme.types';

export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    bgBody: '#0f172a', /* Slate 900 */
    bgAlt: '#1e293b', /* Slate 800 */
    bgGlass: 'rgba(30, 41, 59, 0.7)',
    borderGlass: 'rgba(255, 255, 255, 0.1)',
    textMain: '#f8fafc',
    textMuted: '#94a3b8',
    primary: '#38bdf8', /* Sky 400 */
    primaryGlow: 'rgba(56, 189, 248, 0.2)',
    secondary: '#818cf8', /* Indigo 400 */
    accent: '#fb7185',
    danger: '#f87171',
    success: '#4ade80',
    warning: '#fbbf24',
    info: '#60a5fa',
    cardShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
  },
};
