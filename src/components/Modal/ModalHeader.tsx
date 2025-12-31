import React from 'react';
import clsx from 'clsx';
import styles from './Modal.module.scss';
import type { ModalHeaderProps } from './Modal.types';
import { useModalContext } from './ModalContext';

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  className,
  showClose = true,
  onClose, // Override prop
  ...props
}) => {
  const context = useModalContext();
  const handleClose = onClose || context?.onClose;

  return (
    <div className={clsx(styles.header, className)} {...props}>
      <div className={styles.title}>{children}</div>
      {showClose && (
        <button 
          type="button" 
          className={styles.closeButton} 
          onClick={handleClose}
          aria-label="Close modal"
        >
          <XIcon />
        </button>
      )}
    </div>
  );
};
