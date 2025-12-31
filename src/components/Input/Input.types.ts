import type { InputHTMLAttributes, ReactNode, ChangeEvent } from 'react';

export type InputVariant = 'outlined' | 'filled' | 'underlined' | 'ghost' | 'search';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * The visual style of the input.
   * @default 'outlined'
   */
  variant?: InputVariant;
  
  /**
   * The size of the input.
   * @default 'md'
   */
  size?: InputSize;
  
  /**
   * Label text to display.
   */
  label?: ReactNode;
  
  /**
   * Helper text to display below the input.
   */
  helperText?: ReactNode;
  
  /**
   * Error state. If true, changes color to danger. 
   * If a string is provided, it replaces helperText.
   */
  error?: boolean | ReactNode;
  
  /**
   * Success state. If true, changes color to success.
   */
  success?: boolean | ReactNode;
  
  /**
   * Icon or element to display at the start of the input.
   */
  startIcon?: ReactNode;
  
  /**
   * Icon or element to display at the end of the input.
   */
  endIcon?: ReactNode;
  
  /**
   * If true, shows a clear button when there is a value.
   * @default false
   */
  clearable?: boolean;
  
  /**
   * Callback when the clear button is clicked.
   */
  onClear?: () => void;
  
  /**
   * If true, the input takes up 100% width.
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * If true, displays a character count (requires maxLength).
   * @default false
   */
  showCount?: boolean;

  /**
   * Alias for disabled prop.
   */
  isDisabled?: boolean;
}
