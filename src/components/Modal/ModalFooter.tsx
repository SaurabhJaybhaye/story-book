import React from 'react';
import clsx from 'clsx';
import styles from './Modal.module.scss';
import type { ModalFooterProps } from './Modal.types';

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={clsx(styles.footer, className)} {...props}>
      {children}
    </div>
  );
};
