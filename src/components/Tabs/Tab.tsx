import React, { useCallback, useRef } from 'react';
import clsx from 'clsx';
import type { TabProps } from './Tabs.types';
import { useTabsContext } from './TabsContext';
import styles from './Tabs.module.scss';

export const Tab: React.FC<TabProps> = ({
    value,
    disabled = false,
    className,
    style,
    children,
    icon,
    onClick,
}) => {
    const { 
        value: activeValue, 
        onValueChange, 
        size, 
        variant,
        activationMode 
    } = useTabsContext();
    
    const isActive = activeValue === value;
    const ref = useRef<HTMLButtonElement>(null);

    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled) {
            onValueChange(value);
        }
        onClick?.(e);
    }, [disabled, value, onValueChange, onClick]);

    const handleFocus = useCallback(() => {
        // Automatic activation on focus
        if (activationMode === 'automatic' && !disabled && !isActive) {
            onValueChange(value);
        }
    }, [activationMode, disabled, isActive, onValueChange, value]);

    // Handle scroll into view if active
    // useEffect(() => {
    //     if (isActive && ref.current) {
    //         ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    //     }
    // }, [isActive]);

    return (
        <button
            ref={ref}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${value}`}
            id={`tab-${value}`}
            tabIndex={isActive ? 0 : -1}
            disabled={disabled}
            className={clsx(
                styles.tab,
                styles[`tab--${size}`],
                isActive && styles['tab--active'],
                disabled && styles['tab--disabled'],
                className
            )}
            style={style}
            onClick={handleClick}
            onFocus={handleFocus}
        >
            {icon && <span className={styles.tabIcon}>{icon}</span>}
            {children}
        </button>
    );
};
