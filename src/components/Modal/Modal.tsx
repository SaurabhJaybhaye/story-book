import React, { useEffect, useRef, useState, useId } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import type { ModalProps } from './Modal.types';
import { 
  DEFAULT_MODAL_SIZE, 
  DEFAULT_CLOSE_ON_OVERLAY, 
  DEFAULT_CLOSE_ON_ESC,
  DEFAULT_PREVENT_SCROLL
} from './Modal.constants';
import styles from './Modal.module.scss';
import { ModalContext } from './ModalContext';

export const Modal: React.FC<ModalProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  onClose,
  size = DEFAULT_MODAL_SIZE,
  closeOnOverlayClick = DEFAULT_CLOSE_ON_OVERLAY,
  closeOnEsc = DEFAULT_CLOSE_ON_ESC,
  preventScroll = DEFAULT_PREVENT_SCROLL,
  role = 'dialog',
  titleId: propTitleId,
  descriptionId: propDescriptionId,
  className,
  style,
  children,
  overlayProps
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const generatedId = useId();
  const labelId = propTitleId || `modal-title-${generatedId}`;
  const descId = propDescriptionId || `modal-desc-${generatedId}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle open state changes
  const handleClose = () => {
    if (controlledOpen === undefined) {
      setInternalOpen(false);
    }
    onOpenChange?.(false);
    onClose?.();
  };

  // Scroll Lock
  useEffect(() => {
    if (isOpen && preventScroll) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen, preventScroll]);

  // Focus Management (Trap & Restore)
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      // Simple focus move to container
      // For robust trap, normally use 'react-focus-lock' or similar.
      // Here we focus the container to ensure keyboard events are captured initially.
      requestAnimationFrame(() => {
        containerRef.current?.focus();
      });
    } else {
      previousActiveElement.current?.focus();
    }
  }, [isOpen]);

  // Escape Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && closeOnEsc && e.key === 'Escape') {
        e.stopPropagation();
        handleClose();
      }
      
      // Basic Tab Trap (Keep focus in modal)
      if (isOpen && e.key === 'Tab' && containerRef.current) {
         const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
         );
         if (focusableElements.length === 0) return;
         
         const firstElement = focusableElements[0];
         const lastElement = focusableElements[focusableElements.length - 1];

         if (e.shiftKey) { 
           if (document.activeElement === firstElement) {
             lastElement.focus();
             e.preventDefault();
           }
         } else { 
           if (document.activeElement === lastElement) {
             firstElement.focus();
             e.preventDefault();
           }
         }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, closeOnEsc]);

  if (!isOpen) return null;

  const isCustomSize = !['sm', 'md', 'lg', 'xl', 'full'].includes(size);
  const sizeClass = !isCustomSize ? styles[`container--${size}`] : '';
  const sizeStyle = isCustomSize ? { width: size } : {};

  return createPortal(
    <div className={styles.portal}>
      <div 
        className={styles.overlay} 
        onClick={closeOnOverlayClick ? handleClose : undefined}
        aria-hidden="true"
        {...overlayProps}
      />
      <div 
        className={clsx(
          styles.container,
          sizeClass,
          className
        )}
        style={{ ...style, ...sizeStyle }}
        role={role}
        aria-modal="true"
        aria-labelledby={labelId}
        aria-describedby={descId}
        ref={containerRef}
        tabIndex={-1}
      >
        <ModalContext.Provider value={{ onClose: handleClose }}>
          {children}
        </ModalContext.Provider>
      </div>
    </div>,
    document.body
  );
};
