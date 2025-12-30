import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import type { DrawerProps } from './Drawer.types';
import { 
  DEFAULT_DRAWER_PLACEMENT, 
  DEFAULT_DRAWER_SIZE, 
  DEFAULT_DRAWER_OVERLAY,
  DEFAULT_DRAWER_CLOSE_ON_OVERLAY,
  DEFAULT_DRAWER_CLOSE_ON_ESC
} from './Drawer.constants';
import styles from './Drawer.module.scss';

// Context for subcomponents to access close function
const DrawerCloseContext = createContext<(() => void) | undefined>(undefined);

export const useDrawerClose = () => {
  const context = useContext(DrawerCloseContext);
  // Default to no-op if used outside (or handle error, but optional is safer for localized usage)
  return context || (() => {}); 
};

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  placement = DEFAULT_DRAWER_PLACEMENT,
  size = DEFAULT_DRAWER_SIZE,
  overlay = DEFAULT_DRAWER_OVERLAY,
  closeOnOverlayClick = DEFAULT_DRAWER_CLOSE_ON_OVERLAY,
  closeOnEsc = DEFAULT_DRAWER_CLOSE_ON_ESC,
  className,
  style,
  children,
}) => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle Scroll Lock
  useEffect(() => {
    if (open) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [open]);

  // Handle Escape Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (open && closeOnEsc && e.key === 'Escape') {
        onClose();
      }
    };
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open, closeOnEsc, onClose]);

  // Handle Focus Trap (Basic)
  useEffect(() => {
    if (open && containerRef.current) {
      // Focus the container or first specific element
      // Using a small timeout to ensure visibility transition has started or DOM is ready
      setTimeout(() => {
        containerRef.current?.focus();
      }, 50);
    }
  }, [open]);

  if (!mounted) return null;

  // Determine size class or style
  const isCustomSize = !['sm', 'md', 'lg', 'xl', 'full'].includes(size);
  const sizeClass = !isCustomSize ? styles[`size--${size}`] : '';
  const sizeStyle = isCustomSize 
    ? { [placement === 'top' || placement === 'bottom' ? 'height' : 'width']: size } 
    : {};

  const content = (
    <>
        {overlay && (
          <div 
            className={clsx(styles.overlay, { [styles['overlay--open']]: open })}
            onClick={closeOnOverlayClick ? onClose : undefined}
            aria-hidden="true"
          />
        )}
        <div 
          className={clsx(
            styles.container,
            styles[`container--${placement}`],
            sizeClass,
            { [styles.open]: open },
            className
          )}
          style={{ ...style, ...sizeStyle }}
          role="dialog"
          aria-modal="true"
          ref={containerRef}
          tabIndex={-1} // Allow focus
        >
          <DrawerCloseContext.Provider value={onClose}>
             {children}
          </DrawerCloseContext.Provider>
        </div>
    </>
  );

  return createPortal(content, document.body);
};

Drawer.displayName = 'Drawer';
