import React, { useId, useMemo } from 'react';
import clsx from 'clsx';
import { useAccordionContext } from './Accordion';
import type { AccordionItemProps } from './Accordion.types';
import styles from './Accordion.module.scss';

// Default Chevron Icon
const ChevronIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  header,
  subHeader,
  children,
  iconPosition = 'right',
  disabled = false,
  icon,
  className,
}) => {
  const context = useAccordionContext();
  const generatedId = useId();
  const contentId = `accordion-content-${generatedId}`;
  const headerId = `accordion-header-${generatedId}`;

  const isExpanded = useMemo(() => {
    if (Array.isArray(context.value)) {
      return context.value.includes(value);
    }
    return context.value === value;
  }, [context.value, value]);

  const isDisabled = context.disabled || disabled;

  const handleToggle = () => {
    if (isDisabled) return;
    context.onValueChange(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isDisabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div 
      className={clsx(
        styles.item,
        styles[`item--${context.variant}`],
        styles[`item--${context.size}`],
        {
          [styles['item--expanded']]: isExpanded,
          [styles['item--disabled']]: isDisabled,
        },
        className
      )}
    >
      <div 
        role="button"
        id={headerId}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={clsx(
            styles.header,
            { [styles['header--icon-left']]: iconPosition === 'left' }
        )}
      >
        <div className={styles.headerContent}>
            <span>{header}</span>
            {subHeader && <span className={styles.subHeader}>{subHeader}</span>}
        </div>
        
        <span 
          className={clsx(
            styles.icon,
            styles[`icon--${iconPosition}`],
            {
              [styles['icon--expanded']]: isExpanded,
            }
          )}
          aria-hidden="true"
        >
          {icon || <ChevronIcon />}
        </span>
      </div>

      <div 
        className={clsx(
          styles.contentWrapper,
          {
            [styles['contentWrapper--expanded']]: isExpanded,
          }
        )}
        role="region"
        aria-labelledby={headerId}
        id={contentId}
      >
        <div className={styles.content}>
           <div className={styles.contentInner}>
             {children}
           </div>
        </div>
      </div>
    </div>
  );
};

AccordionItem.displayName = 'AccordionItem';
