import React from 'react';
import clsx from 'clsx';
import type { BreadcrumbSeparatorProps } from './Breadcrumb.types';
import styles from './Breadcrumb.module.scss';
import { DEFAULT_SEPARATOR } from './Breadcrumb.constants';

export const BreadcrumbSeparator: React.FC<BreadcrumbSeparatorProps> = ({
    children,
    className,
    style
}) => {
    return (
        <li
            aria-hidden="true"
            className={clsx(styles.separator, className)}
            style={style}
        >
            {children || DEFAULT_SEPARATOR}
        </li>
    );
};
