import React, { useRef } from 'react';
import type { KeyboardEvent } from 'react';
import clsx from 'clsx';
import type { TabListProps } from './Tabs.types';
import { useTabsContext } from './TabsContext';
import { 
    ARROW_DOWN, 
    ARROW_LEFT, 
    ARROW_RIGHT, 
    ARROW_UP, 
    END, 
    HOME 
} from './Tabs.constants';
import styles from './Tabs.module.scss';

export const TabList: React.FC<TabListProps> = ({
    className,
    style,
    children,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    scrollable = false,
}) => {
    const { orientation } = useTabsContext();
    const listRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        const list = listRef.current;
        if (!list) return;

        // Get all tabs
        const tabs = Array.from(list.querySelectorAll('[role="tab"]:not([disabled])')) as HTMLElement[];
        if (tabs.length === 0) return;

        const currentTab = document.activeElement as HTMLElement;
        const index = tabs.indexOf(currentTab);
        
        // If focus is not on a tab, do nothing or focus first
        if (index === -1) return;

        let nextIndex = index;
        const isHorizontal = orientation === 'horizontal';

        switch (e.key) {
            case ARROW_LEFT:
                if (isHorizontal) nextIndex = index - 1;
                break;
            case ARROW_RIGHT:
                if (isHorizontal) nextIndex = index + 1;
                break;
            case ARROW_UP:
                if (!isHorizontal) nextIndex = index - 1;
                break;
            case ARROW_DOWN:
                if (!isHorizontal) nextIndex = index + 1;
                break;
            case HOME:
                nextIndex = 0;
                break;
            case END:
                nextIndex = tabs.length - 1;
                break;
            default:
                return;
        }

        // Loop around
        if (nextIndex < 0) nextIndex = tabs.length - 1;
        if (nextIndex >= tabs.length) nextIndex = 0;

        e.preventDefault();
        tabs[nextIndex].focus();
        tabs[nextIndex].click(); // If we want automatic activation, or use the focus handler in Tab
    };

    return (
        <div
            ref={listRef}
            role="tablist"
            aria-orientation={orientation}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            className={clsx(
                styles.tabList,
                styles[`tabList--${orientation}`],
                scrollable && styles['tabList--scrollable'],
                className
            )}
            style={style}
            onKeyDown={handleKeyDown}
        >
            {children}
        </div>
    );
};
