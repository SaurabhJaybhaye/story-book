import type { HTMLAttributes, ReactNode } from 'react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error' | 'neutral';
export type AlertSize = 'sm' | 'md' | 'lg';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * The visual variant of the alert, conveying the intent.
   * @default 'info'
   */
  variant?: AlertVariant;

  /**
   * The size of the alert.
   * @default 'md'
   */
  size?: AlertSize;

  /**
   * If true, shows a close button to dismiss the alert.
   * @default false
   */
  dismissible?: boolean;

  /**
   * Callback fired when the alert is closed.
   */
  onClose?: () => void;

  /**
   * If true, the alert will automatically close after `autoCloseDelay` ms.
   * @default false
   */
  autoClose?: boolean;

  /**
   * Duration in milliseconds before auto-closing.
   * @default 5000
   */
  autoCloseDelay?: number;

  /**
   * Custom icon to override the default variant icon.
   * Set to `false` to hide the icon.
   */
  icon?: ReactNode | boolean;

  /**
   * Optional title content.
   * Can also be used via <AlertTitle> subcomponent.
   */
  title?: ReactNode;

  /**
   * Optional action element (e.g., a button) to display.
   */
  action?: ReactNode;

  /**
   * Screen placement for fixed positioning.
   * If not provided or 'default', renders normally in the flow.
   */
  placement?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center' | 'default';

  /**
   * Custom width.
   */
  width?: string | number;

  /**
   * Custom height.
   */
  height?: string | number;

  children?: ReactNode;
}

export interface AlertTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export interface AlertDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}
