import React from 'react';
import clsx from 'clsx';
import type { TabPanelProps } from './Tabs.types';
import { useTabsContext } from './TabsContext';
import styles from './Tabs.module.scss';

export const TabPanel: React.FC<TabPanelProps> = ({
    value,
    className,
    style,
    children,
    keepMounted = false,
    as: Component = 'div',
}) => {
    const { value: activeValue, orientation } = useTabsContext();
    const isActive = activeValue === value;

    if (!isActive && !keepMounted) {
        return null;
    }

    return (
        <Component
            role="tabpanel"
            id={`panel-${value}`}
            aria-labelledby={`tab-${value}`}
            data-state={isActive ? 'active' : 'inactive'}
            hidden={!isActive}
            className={clsx(
                styles.tabPanel,
                styles[`tabPanel--${orientation}`],
                className
            )}
            style={{
                display: (!isActive && keepMounted) ? 'none' : undefined,
                ...style
            }}
            tabIndex={0}
        >
            {children}
        </Component>
    );
};
