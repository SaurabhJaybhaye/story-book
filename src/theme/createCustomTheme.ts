import type { Theme, ThemeColors } from './theme.types';

export const createCustomTheme = (colors: Partial<ThemeColors>): Theme => {
  return {
    mode: 'custom',
    colors: {
      bgBody: colors.bgBody || '#f8fafc',
      bgAlt: colors.bgAlt || '#f1f5f9',
      bgGlass: colors.bgGlass || 'rgba(255, 255, 255, 0.7)',
      borderGlass: colors.borderGlass || 'rgba(0, 0, 0, 0.1)',
      textMain: colors.textMain || '#0f172a',
      textMuted: colors.textMuted || '#64748b',
      primary: colors.primary || '#0ea5e9',
      primaryGlow: colors.primaryGlow || 'rgba(14, 165, 233, 0.2)',
      secondary: colors.secondary || '#6366f1',
      accent: colors.accent || '#f43f5e',
      danger: colors.danger || '#ef4444',
      success: colors.success || '#22c55e',
      warning: colors.warning || '#f59e0b',
      info: colors.info || '#3b82f6',
      cardShadow: colors.cardShadow || '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
  };
};
