import type { InputHTMLAttributes, ReactNode } from 'react';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxVariant = 'default' | 'outlined' | 'filled';
export type CheckboxLabelPosition = 'right' | 'left' | 'top';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * The size of the checkbox.
   * @default 'md'
   */
  size?: CheckboxSize;

  /**
   * The visual variant of the checkbox.
   * @default 'default'
   */
  variant?: CheckboxVariant;

  /**
   * The label to display next to the checkbox.
   */
  label?: ReactNode;

  /**
   * The position of the label relative to the checkbox.
   * @default 'right'
   */
  labelPosition?: CheckboxLabelPosition;

  /**
   * If true, the checkbox will be in an indeterminate state.
   * This does not affect the checked state, but visually indicates a mixed state.
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Helper text to display below the checkbox.
   */
  helperText?: ReactNode;

  /**
   * Error state. If true, changes color to danger.
   * If a string is provided, it replaces helperText.
   */
  error?: boolean | ReactNode;

  /**
   * Ref to the internal input element.
   * Use this instead of forwardRef if needed.
   */
  inputRef?: React.RefObject<HTMLInputElement>;
}
