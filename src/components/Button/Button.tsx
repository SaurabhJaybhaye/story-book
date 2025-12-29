import React from 'react';
import styles from './Button.module.scss';
import type { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  shape = 'rounded-md',
  isLoading = false,
  loadingText,
  leftIcon,
  rightIcon,
  isFullWidth = false,
  label,
  children,
  className,
  disabled,
  ...props
}) => {
  const content = children || label;
  
  const rootClasses = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    styles[`button--${shape}`],
    isLoading ? styles['button--loading'] : '',
    isFullWidth ? styles['button--full-width'] : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={rootClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className={styles.button__spinner}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className={styles.button__spinnerTrack} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className={styles.button__spinnerPath} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
          </svg>
        </span>
      )}
      
      {!isLoading && leftIcon && <span className={styles.button__iconLeft}>{leftIcon}</span>}
      
      {(isLoading && loadingText) || (!isLoading && content) ? (
        <span className={styles.button__content}>
          {isLoading && loadingText ? loadingText : content}
        </span>
      ) : null}
      
      {!isLoading && rightIcon && <span className={styles.button__iconRight}>{rightIcon}</span>}
    </button>
  );
};
