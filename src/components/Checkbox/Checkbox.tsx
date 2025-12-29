import React, { useEffect, useRef, useId } from 'react';
import clsx from 'clsx';
import styles from './Checkbox.module.scss';
import type { CheckboxProps } from './Checkbox.types';
import { 
  DEFAULT_CHECKBOX_SIZE, 
  DEFAULT_CHECKBOX_VARIANT, 
  DEFAULT_LABEL_POSITION 
} from './Checkbox.constants';

export const Checkbox = ({
  size = DEFAULT_CHECKBOX_SIZE,
  variant = DEFAULT_CHECKBOX_VARIANT,
  labelPosition = DEFAULT_LABEL_POSITION,
  label,
  helperText,
  error,
  className,
  checked,
  defaultChecked,
  indeterminate = false,
  disabled,
  style,
  inputRef,
  id,
  ...props
}: CheckboxProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const isError = !!error;
  
  // Internal ref to handle indeterminate state property
  const internalRef = useRef<HTMLInputElement>(null);
  
  // Combine internal ref with possible external ref (if provided via props, though rare)
  // Since we avoided forwardRef, we assume inputRef prop might be used if needed.
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

  useEffect(() => {
    if (internalRef.current) {
      internalRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label
      htmlFor={inputId}
      className={clsx(
        styles.wrapper,
        styles[`wrapper--label-${labelPosition}`],
        {
          [styles['wrapper--disabled']]: disabled,
          [styles['wrapper--error']]: isError,
        },
        className
      )}
      style={style}
    >
      <div className={styles.checkboxContainer}>
        <input
          {...props}
          id={inputId}
          ref={handleRef}
          type="checkbox"
          className={styles.input}
          disabled={disabled}
          aria-invalid={isError}
          checked={checked}
          defaultChecked={defaultChecked}
          aria-checked={indeterminate ? 'mixed' : checked}
        />
        <div
          className={clsx(
            styles.control,
            styles[`control--${size}`],
            styles[`control--${variant}`],
            {
              [styles['control--indeterminate']]: indeterminate,
            }
          )}
          aria-hidden="true"
        >
          {indeterminate ? (
            // Indeterminate Icon (Dash/Minus)
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          ) : (
            // Checkmark Icon
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      </div>

      {(label || helperText || error) && (
        <div className={clsx(styles.labelContent, styles[`labelContent--${size}`])}>
          {label && <span className={styles.labelText}>{label}</span>}
          {(helperText || error) && (
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

Checkbox.displayName = 'Checkbox';
