import React, { type CSSProperties } from 'react';
import styles from './Spinner.module.scss';
import type { SpinnerProps } from './Spinner.types';
import { DEFAULT_SIZE, DEFAULT_SPEED, DEFAULT_VARIANT, SPINNER_SIZES } from './Spinner.constants';
import clsx from 'clsx';

export const Spinner: React.FC<SpinnerProps> = ({
  variant = DEFAULT_VARIANT,
  size = DEFAULT_SIZE,
  color,
  trackColor,
  visible = true,
  overlay = false,
  fullscreen = false,
  overlayOpacity,
  message,
  speed = DEFAULT_SPEED,
  disableAnimation = false,
  'aria-label': ariaLabel,
  className,
  style,
  ...props
}) => {
  if (!visible) return null;

  const sizePx = SPINNER_SIZES[size];
  
  // Custom styles for the container (overlay, global styles)
  const containerStyles: CSSProperties & Record<string, any> = {
    ...style,
  };

  // Variables specifically for the spinner element to override defaults
  const spinnerVariables: CSSProperties & Record<string, any> = {
    '--spinner-size': `${sizePx}px`,
    '--speed-multiplier': speed,
  };

  if (color) spinnerVariables['--spinner-color'] = color;
  if (trackColor) spinnerVariables['--track-color'] = trackColor;

  if (overlay || fullscreen) {
    if (overlayOpacity !== undefined) {
      containerStyles['--bg-glass'] = `rgba(255, 255, 255, ${overlayOpacity})`;
    }
  }

  // Render content based on variant structure requirements
  const renderVariantContent = () => {
    switch (variant) {
      case 'dots':
        return (
          <>
            <span /> {/* Middle dot, pseudo elements handle left/right */}
          </>
        );
      case 'bars':
        return (
          <>
            <div />
            <div />
            <div />
            <div />
            <div />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={clsx(
        styles.spinnerContainer,
        {
          [styles['spinnerContainer--overlay']]: overlay && !fullscreen,
          [styles['spinnerContainer--fullscreen']]: fullscreen,
        },
        className
      )}
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label={message ? undefined : ariaLabel}
      style={containerStyles}
      {...props}
    >
      <div 
        className={clsx(
          styles.spinner,
          styles[`spinner--${variant}`],
          {
            [styles['spinner--paused']]: disableAnimation,
          }
        )}
        style={spinnerVariables}
      >
        {renderVariantContent()}
      </div>
      
      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
};
