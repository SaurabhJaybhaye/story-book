import type { ReactNode, CSSProperties, HTMLAttributes } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full' | string;
export type ModalRole = 'dialog' | 'alertdialog';

export interface ModalProps {
  /**
   * Whether the modal is open (controlled).
   */
  open?: boolean;

  /**
   * Initial open state (uncontrolled).
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Callback fired when open state changes.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Callback fired specifically when closing is requested via user interaction (overlay/esc/close button).
   */
  onClose?: () => void;

  /**
   * Size of the modal.
   * @default 'md'
   */
  size?: ModalSize;

  /**
   * Whether clicking the overlay closes the modal.
   * @default true
   */
  closeOnOverlayClick?: boolean;

  /**
   * Whether pressing Escape key closes the modal.
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * ARIA role for the modal.
   * @default 'dialog'
   */
  role?: ModalRole;

  /**
   * ID of the element describing the modal (for aria-describedby).
   */
  descriptionId?: string;

  /**
   * ID of the element labelling the modal (for aria-labelledby).
   */
  titleId?: string;

  /**
   * Prevent page scrolling when open.
   * @default true
   */
  preventScroll?: boolean;

  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  
  /**
   * Props for the overlay element
   */
  overlayProps?: HTMLAttributes<HTMLDivElement>;
}

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /**
   * Show a close button in the header.
   * @default true
   */
  showClose?: boolean;
  onClose?: () => void;
}

export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
