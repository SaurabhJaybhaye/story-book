import React, { useState, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import type { TabsProps } from './Tabs.types';
import { 
    DEFAULT_TABS_VARIANT, 
    DEFAULT_TABS_SIZE, 
    DEFAULT_ORIENTATION 
} from './Tabs.constants';
import { TabsContext } from './TabsContext';
import styles from './Tabs.module.scss';
import { useId } from 'react';

export const Tabs: React.FC<TabsProps> = ({
    id,
    value: controlledValue,
    defaultValue,
    onValueChange,
    variant = DEFAULT_TABS_VARIANT,
    size = DEFAULT_TABS_SIZE,
    orientation = DEFAULT_ORIENTATION,
    activationMode = 'manual',
    className,
    style,
    children
}) => {
    // Generate unique ID for accessibility if not provided
    const internalId = useId();
    const rootId = id || `tabs-${internalId}`;

    // State
    const [internalValue, setInternalValue] = useState<string>(defaultValue || '');
    const isControlled = controlledValue !== undefined;
    const activeValue = isControlled ? controlledValue : internalValue;

    // Handle initial selection if not set and children exist (optional automation)
    // We won't auto-select deeply nested children, usually user sets default.

    const handleValueChange = useCallback((newValue: string) => {
        if (!isControlled) {
            setInternalValue(newValue);
        }
        onValueChange?.(newValue);
    }, [isControlled, onValueChange]);

    return (
        <TabsContext.Provider value={{
            value: activeValue,
            onValueChange: handleValueChange,
            orientation,
            variant,
            size,
            activationMode
        }}>
            <div 
                id={rootId}
                className={clsx(
                    styles.tabs,
                    styles[`tabs--${variant}`],
                    orientation === 'vertical' && styles['tabs--vertical'],
                    className
                )}
                style={style}
            >
                {children}
            </div>
        </TabsContext.Provider>
    );
};
