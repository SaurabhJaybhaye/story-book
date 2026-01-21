import type { ReactNode, MouseEvent, ElementType, CSSProperties } from 'react';

export interface BreadcrumbItemObject {
    /**
     * Unique identifier or key for the item.
     * If not provided, index might be used but label is preferred.
     */
    key?: string | number;
    /**
     * Text label to display.
     */
    label: ReactNode;
    /**
     * URL if the item is a link.
     */
    href?: string;
    /**
     * Icon to display before the label.
     */
    icon?: ReactNode;
    /**
     * Click handler.
     */
    onClick?: (e: MouseEvent<HTMLElement>) => void;
    /**
     * Whether the item is disabled.
     */
    disabled?: boolean;
    /**
     * Whether this item represents the current page.
     * Usually handled automatically by the last item in the list, but can be overridden.
     */
    active?: boolean;
}

export interface BreadcrumbProps {
    /**
     * Array of breadcrumb items to render.
     * Can be used instead of passing children.
     */
    items?: BreadcrumbItemObject[];
    /**
     * Max number of items to show. 
     * If items go above this number, the middle items will be collapsed.
     * Set to 0 to show all.
     * @default 0
     */
    maxItems?: number;
    /**
     * Items before the collapse point when maxItems is reached.
     * @default 1
     */
    itemsBeforeCollapse?: number;
    /**
     * Items after the collapse point when maxItems is reached.
     * @default 1
     */
    itemsAfterCollapse?: number;
    /**
     * Separator element between items.
     * @default '/'
     */
    separator?: ReactNode;
    /**
     * Custom class for the root nav element.
     */
    className?: string;
    /**
     * Inline styles for the root nav element.
     */
    style?: CSSProperties;
    /**
     * Children elements (BreadcrumbItem).
     * If used, `items` prop is ignored.
     */
    children?: ReactNode;
    /**
     * Custom component to use for the collapsed ellipsis.
     */
    renderCollapseIcon?: () => ReactNode;
}

export interface BreadcrumbItemProps {
    /**
     * The content of the item.
     */
    children?: ReactNode;
    /**
     * URL if the item is a link.
     */
    href?: string;
    /**
     * Icon to display before the content.
     */
    icon?: ReactNode;
    /**
     * Whether this item represents the current page.
     */
    isCurrentPage?: boolean;
    /**
     * Whether the item is disabled.
     */
    disabled?: boolean;
    /**
     * Click handler.
     */
    onClick?: (e: MouseEvent<HTMLElement>) => void;
    /**
     * Custom class name.
     */
    className?: string;
    /**
     * Inline styles.
     */
    style?: CSSProperties;
    /**
     * Component to render as.
     * @default 'a' or 'span' depending on href
     */
    as?: ElementType;
}

export interface BreadcrumbSeparatorProps {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}
