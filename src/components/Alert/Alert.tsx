import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import styles from './Alert.module.scss';
import type { AlertProps } from './Alert.types';
import { DEFAULT_ALERT_SIZE, DEFAULT_ALERT_VARIANT, DEFAULT_AUTO_CLOSE_DELAY } from './Alert.constants';
import { AlertTitle } from './AlertTitle';

// --- ICONS ---
const InfoIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
);
const SuccessIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
const WarningIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
);
const ErrorIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
);
const XIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

const VARIANT_ICONS = {
    info: InfoIcon,
    success: SuccessIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    neutral: InfoIcon,
};

export const Alert = ({
    variant = DEFAULT_ALERT_VARIANT,
    size = DEFAULT_ALERT_SIZE,
    dismissible = false,
    onClose,
    autoClose = false,
    autoCloseDelay = DEFAULT_AUTO_CLOSE_DELAY,
    icon,
    title,
    action,
    placement = 'default',
    width,
    height,
    children,
    className,
    role,
    style,
    ...props
}: AlertProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        // Match CSS transition duration needed
        setTimeout(() => {
            setIsVisible(false);
            onClose?.();
        }, 300); 
    }, [onClose]);

    useEffect(() => {
        if (autoClose) {
            const timer = setTimeout(handleClose, autoCloseDelay);
            return () => clearTimeout(timer);
        }
    }, [autoClose, autoCloseDelay, handleClose]);

    if (!isVisible) return null;

    // Determine Icon
    let RenderedIcon = null;
    if (icon === false) {
        RenderedIcon = null;
    } else if (React.isValidElement(icon)) {
        RenderedIcon = icon;
    } else if (variant && VARIANT_ICONS[variant]) {
        const IconComp = VARIANT_ICONS[variant];
        RenderedIcon = <IconComp />;
    }

    // Determine Aria Role
    const ariaRole = role || (variant === 'error' || variant === 'warning' ? 'alert' : 'status');

    // Placement logic
    const isFixed = placement && placement !== 'default';
    
    // Merge styles for width/height
    const combinedStyle = {
        ...style,
        ...(width ? { width } : {}),
        ...(height ? { height } : {}),
    };

    return (
        <div
            role={ariaRole}
            className={clsx(
                styles.alert,
                styles[`alert--${variant}`],
                styles[`alert--${size}`],
                // Only apply standard enter/exit animations if NOT fixed, 
                // or ensure fixed classes handle their own entry. 
                // For simplicity, we use the standard fade for non-fixed, 
                // and rely on placement classes for fixed entry.
                // Exit animation might need care for fixed elements.
                !isFixed && (isClosing ? styles.exitActive : styles.enterActive),
                isFixed && styles['alert--fixed'],
                isFixed && styles[`alert--${placement}`],
                isClosing && styles.exitActive, // Applies fade out regardless
                className
            )}
            style={combinedStyle}
            {...props}
        >
            {RenderedIcon && (
                <div className={styles.icon}>
                    {RenderedIcon}
                </div>
            )}
            
            <div className={styles.content}>
                {title && <AlertTitle>{title}</AlertTitle>}
                {children}
                {action && <div className={styles.action}>{action}</div>}
            </div>

            {dismissible && (
                <button 
                    type="button" 
                    className={styles.closeButton} 
                    onClick={handleClose}
                    aria-label="Close alert"
                >
                    <XIcon />
                </button>
            )}
        </div>
    );
};

Alert.displayName = 'Alert';
