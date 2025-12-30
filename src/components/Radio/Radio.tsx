import React, { createContext, useContext, useId, useRef } from 'react';
import clsx from 'clsx';
import styles from './Radio.module.scss';
import type { RadioProps, RadioGroupProps } from './Radio.types';
import {
  DEFAULT_RADIO_SIZE,
  DEFAULT_RADIO_VARIANT,
  DEFAULT_LABEL_POSITION
} from './Radio.constants';

// --- RadioGroup Context ---
interface RadioGroupContextValue {
  name?: string;
  value?: string | number | readonly string[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  size?: RadioProps['size'];
  variant?: RadioProps['variant'];
  disabled?: boolean;
  error?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

// --- RadioGroup Component ---
export const RadioGroup = ({
  name,
  value,
  defaultValue,
  onChange,
  orientation = 'vertical',
  label,
  helperText,
  error,
  disabled,
  size,
  variant,
  className,
  style,
  children
}: RadioGroupProps) => {
  const generatedName = useId();
  const groupName = name || generatedName;
  const isError = !!error;

  // Handle uncontrolled state if value is not provided
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : uncontrolledValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, val: string) => {
    if (!isControlled) {
      setUncontrolledValue(val);
    }
    onChange?.(e, val);
  };

  return (
    <RadioGroupContext.Provider
      value={{
        name: groupName,
        value: currentValue,
        onChange: handleChange,
        size,
        variant,
        disabled,
        error: isError
      }}
    >
      <div 
        role="radiogroup" 
        aria-labelledby={label ? `${groupName}-label` : undefined}
        className={clsx(className)}
        style={style}
      >
        {label && (
          <span id={`${groupName}-label`} className={styles.groupLabel}>
            {label}
          </span>
        )}
        <div className={clsx(styles.group, styles[`group--${orientation}`])}>
          {children}
        </div>
        {(helperText || error) && (
          <span
            className={clsx(styles.groupHelperText, {
              [styles['groupHelperText--error']]: isError,
            })}
          >
            {isError && typeof error !== 'boolean' ? error : helperText}
          </span>
        )}
      </div>
    </RadioGroupContext.Provider>
  );
};

// --- Radio Component ---
export const Radio = ({
  size: propSize,
  variant: propVariant,
  labelPosition: propLabelPosition,
  label,
  helperText,
  error: propError,
  className,
  checked,
  defaultChecked,
  disabled: propDisabled,
  style,
  inputRef,
  id,
  value,
  onChange,
  name,
  ...props
}: RadioProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const groupContext = useContext(RadioGroupContext);

  // Merge props with context (context takes precedence for group-level settings)
  const size = groupContext?.size || propSize || DEFAULT_RADIO_SIZE;
  const variant = groupContext?.variant || propVariant || DEFAULT_RADIO_VARIANT;
  const disabled = groupContext?.disabled || propDisabled;
  const error = groupContext?.error || propError; 
  // Note: Individual error overrides group error visually? 
  // Usually group error affects the group text, individual error affects the item.
  // For safety, let's say if either is true, valid is false.
  const isError = !!error; 
  
  const labelPosition = propLabelPosition || DEFAULT_LABEL_POSITION;

  // Determine checked state
  let isChecked = checked;
  let isDefaultChecked = defaultChecked;
  let handleChange = onChange;
  let inputName = name;

  if (groupContext) {
    if (value !== undefined) {
      isChecked = String(groupContext.value) === String(value);
      // In a group, we don't use defaultChecked on individual items usually if group is controlled
    }
    handleChange = (e) => {
      onChange?.(e);
      groupContext.onChange?.(e, String(value));
    };
    inputName = groupContext.name;
    // Remove defaultChecked from props if in group to avoid React warnings if governed by group value
    isDefaultChecked = undefined; 
  }

  // Ref handling
  const internalRef = useRef<HTMLInputElement>(null);
  const handleRef = (el: HTMLInputElement | null) => {
    internalRef.current = el;
    if (inputRef) {
      if (typeof inputRef === 'function') {
        (inputRef as (instance: HTMLInputElement | null) => void)(el);
      } else {
        (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
      }
    }
  };

  const isCard = variant === 'card';
  // If in group context and checking against value, `isChecked` is calculated.
  // We need to pass `checked={isChecked}` to input if it's controlled (group or individual).
  // If standalone uncontrolled, `checked` is undefined, `defaultChecked` is used.

  const inputProps: any = {
    ...props,
    id: inputId,
    ref: handleRef,
    type: "radio",
    className: styles.input,
    disabled: disabled,
    'aria-invalid': isError,
    name: inputName,
    value: value,
    onChange: handleChange,
  };

  if (isChecked !== undefined) {
    inputProps.checked = isChecked;
  } else {
    inputProps.defaultChecked = isDefaultChecked;
  }

  return (
    <label
      htmlFor={inputId}
      className={clsx(
        styles.wrapper,
        styles[`wrapper--label-${labelPosition}`],
        {
          [styles['wrapper--disabled']]: disabled,
          [styles['wrapper--error']]: isError,
          [styles['wrapper--card']]: isCard,
          [styles['wrapper--card-checked']]: isCard && isChecked, 
          // Note: isChecked might be undefined for uncontrolled.
          // For uncontrolled card styling to work perfectly reactively, we need state.
          // However, CSS :checked selector can handle the border change on the sibling control/wrapper via :has() or similar, 
          // but :has() support might vary.
          // Since we want robust support, standard practices often use internal state for visual toggles if not controlled.
          // But for now, let's rely on props. styles.input:checked within SCSS handles control.
          // For the WRAPPER styling based on checked state (needed for card), 
          // we can't easily select parent based on child without :has().
          // Let's rely on proper controlled usage for advanced Card styling or use internal state tracking for uncontrolled.
        },
        className
      )}
      style={style}
    >
      <div className={styles.radioContainer}>
        <input {...inputProps} />
        <div
          className={clsx(
            styles.control,
            styles[`control--${size}`],
            styles[`control--${variant}`]
          )}
          aria-hidden="true"
        />
      </div>

      {(label || helperText) && (
        <div className={clsx(styles.labelContent, styles[`labelContent--${size}`])}>
          {label && <span className={styles.labelText}>{label}</span>}
          {(helperText || (isError && typeof error !== 'boolean')) && (
            <span
              className={clsx(styles.helperText, {
                [styles['helperText--error']]: isError,
              })}
            >
              {isError && typeof error !== 'boolean' ? error : helperText}
            </span>
          )}
        </div>
      )}
    </label>
  );
};

Radio.displayName = 'Radio';
RadioGroup.displayName = 'RadioGroup';
