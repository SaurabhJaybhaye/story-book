import type { ReactNode, CSSProperties } from 'react';

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full' | string;

export interface DrawerProps {
  /**
   * Whether the drawer is open.
   */
  open: boolean;

  /**
   * Callback fired when the drawer closes.
   */
  onClose: () => void;

  /**
   * Side from which the drawer appears.
   * @default 'right'
   */
  placement?: DrawerPlacement;

  /**
   * Size of the drawer. Can be a preset ('sm', 'md', 'lg', 'xl', 'full') or a CSS width/height string.
   * @default 'md'
   */
  size?: DrawerSize;

  /**
   * Title of the drawer (rendering in header).
   */
  title?: ReactNode;

  /**
   * Whether to show the overlay.
   * @default true
   */
  overlay?: boolean;

  /**
   * Whether clicking the overlay closes the drawer.
   * @default true
   */
  closeOnOverlayClick?: boolean;

  /**
   * Whether pressing Escape closes the drawer.
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * Custom CSS class for the container.
   */
  className?: string;

  /**
   * Custom styles.
   */
  style?: CSSProperties;

  /**
   * Drawer content.
   */
  children: ReactNode;
}

export interface DrawerHeaderProps {
  children?: ReactNode;
  className?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export interface DrawerBodyProps {
  children: ReactNode;
  className?: string;
}

export interface DrawerFooterProps {
  children: ReactNode;
  className?: string;
}
