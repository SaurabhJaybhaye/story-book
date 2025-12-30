import React from 'react';
import clsx from 'clsx';
import type { DrawerHeaderProps, DrawerBodyProps, DrawerFooterProps } from './Drawer.types';
import styles from './Drawer.module.scss';
import { useDrawerClose } from './Drawer'; // We will export this context hook

// Close Icon SVG
const XIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  children,
  className,
  onClose, // Optional override
  showCloseButton = true,
}) => {
  const contextClose = useDrawerClose();
  const handleClose = onClose || contextClose;

  return (
    <div className={clsx(styles.header, className)}>
      <div className={styles.title}>{children}</div>
      {showCloseButton && (
        <button 
          type="button" 
          className={styles.closeButton} 
          onClick={handleClose}
          aria-label="Close drawer"
        >
          <XIcon />
        </button>
      )}
    </div>
  );
};

export const DrawerBody: React.FC<DrawerBodyProps> = ({ children, className }) => {
  return <div className={clsx(styles.body, className)}>{children}</div>;
};

export const DrawerFooter: React.FC<DrawerFooterProps> = ({ children, className }) => {
  return <div className={clsx(styles.footer, className)}>{children}</div>;
};
