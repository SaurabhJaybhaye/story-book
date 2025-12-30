import type { ReactNode } from 'react';

export type AccordionType = 'single' | 'multiple';
export type AccordionVariant = 'default' | 'outlined' | 'bordered' | 'ghost';
export type AccordionSize = 'sm' | 'md' | 'lg';
export type AccordionIconPosition = 'left' | 'right';

export interface AccordionProps {
  /**
   * Defines whether one or multiple items can be open at the same time.
   * @default 'single'
   */
  type?: AccordionType;
  
  /**
   * The value of the item(s) to expand by default.
   */
  defaultValue?: string | string[];
  
  /**
   * The controlled value of the item(s) to expand.
   */
  value?: string | string[];
  
  /**
   * Event handler called when the expanded state of an item changes.
   */
  onValueChange?: (value: string | string[]) => void;
  
  /**
   * When type is "single", allows closing content when clicking trigger for an open item.
   * @default true
   */
  collapsible?: boolean;
  
  /**
   * The visual style of the accordion.
   * @default 'default'
   */
  variant?: AccordionVariant;
  
  /**
   * The size of the accordion items.
   * @default 'md'
   */
  size?: AccordionSize;
  
  /**
   * Disabled state for the entire accordion group.
   * @default false
   */
  disabled?: boolean;
  
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface AccordionItemProps {
  /**
   * A unique value for the item.
   */
  value: string;
  
  /**
   * The header content for the item.
   */
  header: ReactNode;
  
  /**
   * Helper text or subtitle for the header.
   */
  subHeader?: ReactNode;
  
  /**
   * The content to be displayed when expanded.
   */
  children: ReactNode;
  
  /**
   * Position of the expand/collapse icon.
   * @default 'right'
   */
  iconPosition?: AccordionIconPosition;
  
  /**
   * Whether this specific item is disabled.
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Custom icon to display (overrides default chevron).
   */
  icon?: ReactNode;
  
  className?: string;
}

export interface AccordionContextType {
  type: AccordionType;
  value: string | string[];
  onValueChange: (value: string) => void;
  collapsible: boolean;
  variant: AccordionVariant;
  size: AccordionSize;
  disabled: boolean;
}
