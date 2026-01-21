import { ReactNode, KeyboardEvent, MouseEvent, CSSProperties, ElementType } from 'react';

export type TabsVariant = 'default' | 'underline' | 'pill' | 'segmented';
export type TabsSize = 'sm' | 'md' | 'lg';
export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsActivationMode = 'manual' | 'automatic';

export interface TabsProps {
    /**
     * Unique identifier for the Tabs component.
     */
    id?: string;
    /**
     * The value of the currently active tab (Controlled mode).
     */
    value?: string;
    /**
     * The default value of the active tab (Uncontrolled mode).
     */
    defaultValue?: string;
    /**
     * Callback invoked when the active tab changes.
     */
    onValueChange?: (value: string) => void;
    /**
     * Visual style of the tabs.
     * @default 'default'
     */
    variant?: TabsVariant;
    /**
     * Size of the tabs.
     * @default 'md'
     */
    size?: TabsSize;
    /**
     * Orientation of the tab list.
     * @default 'horizontal'
     */
    orientation?: TabsOrientation;
    /**
     * When manual, the tab is selected on click/enter.
     * When automatic, the tab is selected on focus.
     * @default 'manual'
     */
    activationMode?: TabsActivationMode;
    /**
     * Class name for the root container.
     */
    className?: string;
    /**
     * Inline styles for the root container.
     */
    style?: CSSProperties;
    children: ReactNode;
}

export interface TabListProps {
    className?: string;
    style?: CSSProperties;
    children: ReactNode;
    /**
     * Label for the tab list (accessibility).
     */
    'aria-label'?: string;
    'aria-labelledby'?: string;
    /**
     * Whether the tab list needs scroll behaviors.
     * @default false
     */
    scrollable?: boolean;
}

export interface TabProps {
    /**
     * The unique value identifying this tab.
     */
    value: string;
    /**
     * Disable this specific tab.
     */
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
    icon?: ReactNode;
    /**
     * Custom click handler.
     */
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export interface TabPanelProps {
    /**
     * The value matching the associated tab.
     */
    value: string;
    className?: string;
    style?: CSSProperties;
    children: ReactNode;
    /**
     * If true, the panel content will remain mounted when inactive.
     * If false (default), the content unmounts.
     */
    keepMounted?: boolean;
    /**
     * HTML tag to render as.
     * @default 'div'
     */
    as?: ElementType;
}
