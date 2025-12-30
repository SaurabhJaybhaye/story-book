import type { CSSProperties, ReactNode } from 'react';

export type SpinnerVariant = 'circular' | 'dots' | 'bars' | 'pulse' | 'ring' | 'wave';
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerColor = string;

export interface SpinnerProps {
  /**
   * The visual style of the spinner.
   * @default 'circular'
   */
  variant?: SpinnerVariant;
  
  /**
   * The size of the spinner.
   * @default 'md'
   */
  size?: SpinnerSize;
  
  /**
   * Custom color for the spinner. 
   * Defaults to theme primary or text color depending on context.
   */
  color?: SpinnerColor;
  
  /**
   * Custom color for the track/background of the spinner (where applicable).
   */
  trackColor?: SpinnerColor;
  
  /**
   * Controls visibility of the spinner.
   * @default true
   */
  visible?: boolean;
  
  /**
   * If true, renders the spinner as a fixed overlay covering the screen or container.
   * @default false
   */
  overlay?: boolean;
  
  /**
   * If true and overlay is true, covers the entire viewport.
   * @default false
   */
  fullscreen?: boolean;
  
  /**
   * Opacity of the overlay background (0-1).
   * @default 0.7
   */
  overlayOpacity?: number;
  
  /**
   * Optional text to display below the spinner.
   */
  message?: ReactNode;
  
  /**
   * Animation speed multiplier. 1 is normal, 2 is double speed, 0.5 is half speed.
   * @default 1
   */
  speed?: number;
  
  /**
   * If true, pauses the animation.
   * @default false
   */
  disableAnimation?: boolean;
  
  /**
   * Accessibility label.
   * @default 'Loading...'
   */
  'aria-label'?: string;
  
  className?: string;
  style?: CSSProperties;
}
