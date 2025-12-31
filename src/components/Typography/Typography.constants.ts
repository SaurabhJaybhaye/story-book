import type { TypographyVariant } from './Typography.types';

export const DEFAULT_TYPOGRAPHY_VARIANT: TypographyVariant = 'body1';
export const DEFAULT_TYPOGRAPHY_SIZE = 'md';

export const VARIANT_TAG_MAP: Record<TypographyVariant, string> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle: 'p',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  label: 'label',
  overline: 'span',
  helper: 'span',
  code: 'code',
};
