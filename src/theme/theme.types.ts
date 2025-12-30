export type ThemeMode = "light" | "dark" | "custom";

export interface ThemeColors {
  bgBody: string;
  bgAlt: string;
  bgGlass: string;
  borderGlass: string;
  textMain: string;
  textMuted: string;
  primary: string;
  primaryGlow: string;
  secondary: string;
  accent: string;
  danger: string;
  success: string;
  warning: string;
  info: string;
  cardShadow: string;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
}
