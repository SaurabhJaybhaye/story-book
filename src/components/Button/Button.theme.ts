import type { Theme } from '../../theme/theme.types';

export const getButtonTheme = (theme: Theme) => {
  return {
    primaryColor: theme.colors.primary,
    secondaryColor: theme.colors.secondary,
    textColor: theme.colors.textMain,
    // Add specific button variations here if needed
  };
};
