import type { ReactNode } from 'react';

export type DatePickerMode = 'date' | 'month';

export interface DatePickerProps {
  /**
   * Selection mode: 'date' for day selection, 'month' for month/year selection.
   * @default 'date'
   */
  mode?: DatePickerMode;

  /**
   * The currently selected date.
   */
  value?: Date | null;

  /**
   * Default value for uncontrolled usage.
   */
  defaultValue?: Date | null;

  /**
   * Callback fired when a date is selected.
   */
  onChange?: (date: Date | null) => void;

  /**
   * Display format for the input field. 
   * Uses date-fns formatting tokens (e.g. 'dd/MM/yyyy', 'MMMM yyyy').
   */
  format?: string;

  /**
   * Placeholder text for the input.
   */
  placeholder?: string;

  /**
   * Minimum selectable date.
   */
  minDate?: Date;

  /**
   * Maximum selectable date.
   */
  maxDate?: Date;

  /**
   * Whether the input is disabled.
   */
  disabled?: boolean;

  /**
   * Whether the input is read-only.
   */
  readOnly?: boolean;

  /**
   * Whether to show a clear button when a value is present.
   * @default true
   */
  clearable?: boolean;

  /**
   * Label for the input.
   */
  label?: ReactNode;

  /**
   * Error message or state.
   */
  error?: boolean | string;

  className?: string;
  style?: React.CSSProperties;
}
