import React from 'react';

export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'tertiary' 
  | 'outline' 
  | 'ghost' 
  | 'link' 
  | 'danger' 
  | 'success' 
  | 'warning' 
  | 'info';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonShape = 'rounded-sm' | 'rounded-md' | 'rounded-lg' | 'pill' | 'square' | 'circle';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;
  
  /**
   * The size of the button
   * @default 'md'
   */
  size?: ButtonSize;
  
  /**
   * Border radius shape
   * @default 'rounded-md'
   */
  shape?: ButtonShape;
  
  /**
   * Shows a loading spinner and disables the button
   */
  isLoading?: boolean;
  
  /**
   * Text to show next to the spinner when loading
   */
  loadingText?: string;
  
  /**
   * Icon to display before the label
   */
  leftIcon?: React.ReactNode;
  
  /**
   * Icon to display after the label
   */
  rightIcon?: React.ReactNode;
  
  /**
   * Whether the button should take up the full width of its container
   */
  isFullWidth?: boolean;
  
  /**
   * The content of the button
   */
  children?: React.ReactNode;
  
  /**
   * Label prop for compatibility, children is preferred
   */
  label?: string;
}
