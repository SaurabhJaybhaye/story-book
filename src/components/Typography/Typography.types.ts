import { ElementType, HTMLAttributes, ReactNode } from 'react';

export type TypographyVariant =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'body1' | 'body2'
  | 'caption' | 'label' | 'overline'
  | 'subtitle' | 'helper' | 'code';

export type TypographySize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TypographyWeight = 'light' | 'regular' | 'medium' | 'bold';
export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';
export type TypographyTransform = 'uppercase' | 'lowercase' | 'capitalize' | 'none';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  /** content of the typography */
  children?: ReactNode;

  /** HTML element to render */
  as?: ElementType;

  /** Visual variant */
  variant?: TypographyVariant;

  /** Size override */
  size?: TypographySize;

  /** Font weight */
  fontWeight?: TypographyWeight;

  /** Text alignment */
  textAlign?: TypographyAlign;

  /** Text transformation */
  textTransform?: TypographyTransform;

  /** Truncate text to a single line with ellipsis */
  truncate?: boolean;

  /** Clamp text to a specific number of lines */
  lineClamp?: number;
}
