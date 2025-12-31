import type { ReactNode, CSSProperties, RefObject } from 'react';

export type TooltipPlacement = 
  | 'top' | 'top-start' | 'top-end'
  | 'right' | 'right-start' | 'right-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end';

export type TooltipTrigger = 'hover' | 'focus' | 'click' | 'manual';

export interface TooltipProps {
  /**
   * The trigger element. Must be a valid React element that can accept a ref.
   */
  children: ReactNode;

  /**
   * The content to display inside the tooltip.
   */
  content: ReactNode;

  /**
   * Preferred placement.
   * @default 'top'
   */
  placement?: TooltipPlacement;

  /**
   * Events that trigger the tooltip.
   * @default ['hover', 'focus']
   */
  trigger?: TooltipTrigger | TooltipTrigger[];

  /**
   * Controlled open state.
   */
  open?: boolean;

  /**
   * Initial open state (uncontrolled).
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Callback on open state change.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Delay in ms before opening (hover/focus).
   * @default 200
   */
  openDelay?: number;

  /**
   * Delay in ms before closing.
   * @default 0
   */
  closeDelay?: number;

  /**
   * Disable the tooltip.
   */
  disabled?: boolean;

  /**
   * Class name for the tooltip content container.
   */
  className?: string;

  /**
   * Style for the tooltip content container.
   */
  style?: CSSProperties;

  /**
   * Z-Index for the portal.
   * @default 10000
   */
  zIndex?: number;

  /**
   * Max width of the tooltip content.
   */
  maxWidth?: number | string;

  /**
   * If true, shows an arrow pointing to the trigger.
   * @default true
   */
  arrow?: boolean;

  /**
   * Pass custom ref for the tooltip element if needed.
   */
  tooltipRef?: RefObject<HTMLDivElement>;
}
