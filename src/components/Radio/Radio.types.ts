import type { InputHTMLAttributes, ReactNode, Ref, CSSProperties, ChangeEvent } from 'react';

export type RadioSize = 'sm' | 'md' | 'lg';
export type RadioVariant = 'default' | 'outlined' | 'filled' | 'card';
export type LabelPosition = 'left' | 'right' | 'top';
export type RadioGroupOrientation = 'horizontal' | 'vertical';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Size of the radio button */
  size?: RadioSize;
  /** Visual variant of the radio */
  variant?: RadioVariant;
  /** Position of the label relative to the radio */
  labelPosition?: LabelPosition;
  /** Content of the label */
  label?: ReactNode;
  /** Helper text displayed below the label */
  helperText?: ReactNode;
  /** Error message or boolean indicating error state */
  error?: boolean | ReactNode;
  /** Ref for the native input element */
  inputRef?: Ref<HTMLInputElement>;
}

export interface RadioGroupProps {
  /** Name of the radio group (applied to all children if not specified on them) */
  name?: string;
  /** Selected value of the group (controlled) */
  value?: string | number | readonly string[];
  /** Default selected value (uncontrolled) */
  defaultValue?: string | number | readonly string[];
  /** Callback fired when a radio in the group is selected */
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  /** Direction of the radio group layout */
  orientation?: RadioGroupOrientation;
  /** Label for the entire group */
  label?: ReactNode;
  /** Helper text for the group */
  helperText?: ReactNode;
  /** Error for the group */
  error?: boolean | ReactNode;
  /** Disabled state for all radios in the group */
  disabled?: boolean;
  /** Size for all radios in the group */
  size?: RadioSize;
  /** Variant for all radios in the group */
  variant?: RadioVariant;
  /** Class name for the group container */
  className?: string;
  /** Inline style for the group container */
  style?: CSSProperties;
  /** Children (Radio components) */
  children: ReactNode;
}
