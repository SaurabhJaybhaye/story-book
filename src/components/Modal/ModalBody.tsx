import React from 'react';
import clsx from 'clsx';
import styles from './Modal.module.scss';
import type { ModalBodyProps } from './Modal.types';

export const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={clsx(styles.body, className)} {...props}>
      {children}
    </div>
  );
};
