import { forwardRef, useState, useId, type FocusEvent, type ChangeEvent, type MouseEvent } from 'react';
import styles from './Input.module.scss';
import type { InputProps } from './Input.types';
import { DEFAULT_SIZE, DEFAULT_VARIANT } from './Input.constants';
import clsx from 'clsx';
import { Typography } from '../Typography';

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = DEFAULT_VARIANT,
  size = DEFAULT_SIZE,
  label,
  helperText,
  error,
  success,
  startIcon,
  endIcon,
  clearable = false,
  onClear,
  fullWidth = false,
  showCount = false,
  isDisabled,
  disabled,
  className,
  placeholder,
  type = 'text',
  value,
  defaultValue,
  maxLength,
  onChange,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = props.id || generatedId;
  const isControlled = value !== undefined;
  
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [hasFocus, setHasFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const currentValue = isControlled ? value : internalValue;
  const actualDisabled = disabled || isDisabled;
  const isError = !!error;
  const isSuccess = !!success && !isError;

  // Determine actual type (handle password toggle)
  const inputType = type === 'password' && showPassword ? 'text' : type;

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setHasFocus(true);
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setHasFocus(false);
    onBlur?.(e);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Create a synthetic event to trigger onChange if needed, 
    // though typically clear buttons just reset state in the parent or local.
    // Ideally, for controlled inputs, parent handles onClear.
    // For uncontrolled, we clear local state.
    if (!isControlled) {
      setInternalValue('');
      // Trigger native change for refs if needed (complex without setNativeValue helper)
    }
    
    onClear?.();
    
    // If usage expects 100% sync with standard onChange, onClear usually needs to return void and user resets value.
  };

  const togglePassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const charLength = String(currentValue || '').length;

  return (
    <div className={clsx(
      styles.wrapper,
      {
        [styles['wrapper--fullWidth']]: fullWidth,
        [styles['wrapper--disabled']]: actualDisabled
      },
      className
    )}>
      {label && (
        <Typography 
          as="label" 
          variant="label"
          htmlFor={inputId} 
          className={clsx(styles.label, {
            [styles['label--error']]: isError,
            [styles['label--success']]: isSuccess
          })}
        >
          {label} {props.required && <Typography as="span" variant="label" style={{color: 'var(--danger)'}}>*</Typography>}
        </Typography>
      )}

      <div className={clsx(
        styles.inputGroup,
        styles[`inputGroup--${variant}`],
        styles[`inputGroup--${size}`],
        {
          [styles['inputGroup--focused']]: hasFocus,
          [styles['inputGroup--error']]: isError,
          [styles['inputGroup--success']]: isSuccess,
          [styles['inputGroup--disabled']]: actualDisabled
        }
      )}>
        {startIcon && (
          <div className={clsx(styles.adornment, styles['adornment--start'])}>
            {startIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          type={inputType}
          className={styles.input}
          disabled={actualDisabled}
          placeholder={placeholder}
          maxLength={maxLength}
          value={currentValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-invalid={isError}
          aria-describedby={helperText ? `${inputId}-helper` : undefined}
          {...props}
        />

        {/* Clear Button logic: Show if clearable, enabled, and has value */}
        {clearable && !actualDisabled && (currentValue !== '' && currentValue !== undefined) && (
          <div className={clsx(styles.adornment, styles['adornment--end'])}>
            <button 
              type="button" 
              onClick={handleClear} 
              aria-label="Clear input"
              tabIndex={-1} // Typically clear buttons skip tab unless requested otherwise
            >
              ✕
            </button>
          </div>
        )}

        {/* Password Toggle */}
        {type === 'password' && !actualDisabled && (
          <div className={clsx(styles.adornment, styles['adornment--end'])}>
            <button 
              type="button" 
              onClick={togglePassword} 
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? '👁️' : '🔒'} {/* Replace with proper icons later */}
            </button>
          </div>
        )}

        {endIcon && (
          <div className={clsx(styles.adornment, styles['adornment--end'])}>
            {endIcon}
          </div>
        )}
      </div>

      {(helperText || error || success || showCount) && (
        <div className={styles.footer}>
          {(error || success || helperText) && (
            <Typography 
              as="span"
              variant="helper"
              id={`${inputId}-helper`}
              className={clsx(styles.helperText, {
                [styles['helperText--error']]: isError,
                [styles['helperText--success']]: isSuccess
              })}
            >
              {error || success || helperText}
            </Typography>
          )}
          
          {showCount && maxLength && (
            <Typography as="span" variant="helper" className={styles.charCount}>
              {charLength} / {maxLength}
            </Typography>
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';
