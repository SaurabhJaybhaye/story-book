import React, { forwardRef } from 'react';
import clsx from 'clsx';
import type { BreadcrumbItemProps } from './Breadcrumb.types';
import styles from './Breadcrumb.module.scss';

export const BreadcrumbItem = forwardRef<HTMLElement, BreadcrumbItemProps>(({
    children,
    href,
    icon,
    isCurrentPage = false,
    disabled = false,
    onClick,
    className,
    style,
    as
}, ref) => {
    // Determine the component to render: passed 'as' > 'a' if href > 'span'
    const Component = as || (href && !disabled ? 'a' : 'span');
    
    return (
        <li className={styles.itemWrapper}>
            <Component
                ref={ref}
                href={disabled ? undefined : href}
                className={clsx(
                    styles.item,
                    isCurrentPage && styles['item--current'],
                    disabled && styles['item--disabled'],
                    className
                )}
                style={style}
                aria-current={isCurrentPage ? 'page' : undefined}
                aria-disabled={disabled}
                onClick={disabled ? (e: React.MouseEvent) => e.preventDefault() : onClick}
            >
                {icon && <span className={styles.icon}>{icon}</span>}
                <span className={styles.itemContent}>{children}</span>
            </Component>
        </li>
    );
});

BreadcrumbItem.displayName = 'BreadcrumbItem';
