import type { SpinnerSize, SpinnerVariant } from './Spinner.types';

export const DEFAULT_VARIANT: SpinnerVariant = 'circular';
export const DEFAULT_SIZE: SpinnerSize = 'md';
export const DEFAULT_SPEED = 1;
export const DEFAULT_OVERLAY_OPACITY = 0.7;

export const SPINNER_SIZES: Record<SpinnerSize, number> = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
};
