import React, { Children, useState, cloneElement, isValidElement } from 'react';
import clsx from 'clsx';
import type { BreadcrumbProps, BreadcrumbItemObject } from './Breadcrumb.types';
import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbSeparator } from './BreadcrumbSeparator';
import styles from './Breadcrumb.module.scss';
import { DEFAULT_MAX_ITEMS, EXPAND_ICON } from './Breadcrumb.constants';

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
    items,
    maxItems = DEFAULT_MAX_ITEMS,
    itemsBeforeCollapse = 1,
    itemsAfterCollapse = 1,
    separator,
    children,
    className,
    style,
    renderCollapseIcon
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // --- Helper to render items from object array ---
    const renderItemsFromArray = (itemList: BreadcrumbItemObject[]) => {
        // Handle collapse logic
        let itemsToRender = itemList;
        const totalItems = itemList.length;

        if (maxItems > 0 && totalItems > maxItems && !isExpanded) {
            const leftItems = itemList.slice(0, itemsBeforeCollapse);
            const rightItems = itemList.slice(totalItems - itemsAfterCollapse);
            
            // We inject a special "collapse" item in the middle
            // Since we map over this, we need a way to identify it.
            // We'll construct the render output directly instead of creating a temp array generally
            
            const renderItem = (item: BreadcrumbItemObject, index: number, isLast: boolean) => (
                <React.Fragment key={item.key || index}>
                    <BreadcrumbItem
                        href={item.href}
                        icon={item.icon}
                        onClick={item.onClick}
                        disabled={item.disabled}
                        isCurrentPage={item.active ?? isLast}
                    >
                        {item.label}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
                </React.Fragment>
            );

            return (
                <>
                    {leftItems.map((item, i) => renderItem(item, i, false))}
                    
                    <li className={styles.itemWrapper} key="collapse">
                         <button 
                            type="button" 
                            className={styles.collapse}
                            onClick={() => setIsExpanded(true)}
                            aria-label="Show all breadcrumbs"
                         >
                             {renderCollapseIcon ? renderCollapseIcon() : EXPAND_ICON}
                         </button>
                    </li>
                    <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>

                    {rightItems.map((item, i) => {
                         // Index adjustment for rendering correct keys/logic if needed, 
                         // but "isLast" check logic:
                         const isRealLast = i === rightItems.length - 1;
                         return renderItem(item, i + leftItems.length, isRealLast);
                    })}
                </>
            );
        }

        return itemList.map((item, index) => {
            const isLast = index === itemList.length - 1;
            return (
                <React.Fragment key={item.key || index}>
                    <BreadcrumbItem
                        href={item.href}
                        icon={item.icon}
                        onClick={item.onClick}
                        disabled={item.disabled}
                        isCurrentPage={item.active ?? isLast}
                    >
                        {item.label}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
                </React.Fragment>
            );
        });
    };

    // --- Helper to render from children (composition mode) ---
    // In composition mode, we just interleave separators if they are missing
    // Or we assume user added them. Reusable components usually try to be helpful.
    // Let's interleave separators automatically if the child is BreadcrumbItem.
    const renderChildren = () => {
        const validChildren = Children.toArray(children).filter(isValidElement);
        return validChildren.map((child, index) => {
            const isLast = index === validChildren.length - 1;
            return (
                <React.Fragment key={child.key || index}>
                    {child}
                    {!isLast && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
                </React.Fragment>
            );
        });
    };

    return (
        <nav 
            className={clsx(styles.root, className)} 
            style={style} 
            aria-label="breadcrumb"
        >
            <ol className={styles.root}>
                {items ? renderItemsFromArray(items) : renderChildren()}
            </ol>
        </nav>
    );
};
