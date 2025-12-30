import type { Props as ReactSelectProps, GroupBase } from 'react-select';
import type { ReactNode } from 'react';

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectVariant = 'outlined' | 'filled' | 'underlined' | 'ghost';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SelectProps<Option = any, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>> 
  extends ReactSelectProps<Option, IsMulti, Group> {
  /** Label displayed above or beside the select */
  label?: ReactNode;
  /** Helper text displayed below the select */
  helperText?: ReactNode;
  /** Error message or boolean indicating error state */
  error?: boolean | ReactNode;
  /** Size of the select control */
  size?: SelectSize;
  /** Visual variant of the select */
  variant?: SelectVariant;
  /** Full width mode */
  fullWidth?: boolean;
}
