import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import type { 
  AccordionProps, 
  AccordionContextType 
} from './Accordion.types';
import { 
  DEFAULT_ACCORDION_TYPE, 
  DEFAULT_ACCORDION_VARIANT, 
  DEFAULT_ACCORDION_SIZE, 
  DEFAULT_ACCORDION_COLLAPSIBLE 
} from './Accordion.constants';
import styles from './Accordion.module.scss';

// Create Context
const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion');
  }
  return context;
};

export const Accordion: React.FC<AccordionProps> = ({
  type = DEFAULT_ACCORDION_TYPE,
  defaultValue,
  value: controlledValue,
  onValueChange,
  collapsible = DEFAULT_ACCORDION_COLLAPSIBLE,
  variant = DEFAULT_ACCORDION_VARIANT,
  size = DEFAULT_ACCORDION_SIZE,
  disabled = false,
  className,
  style,
  children,
}) => {
  // Normalize value to array for internal handling
  const normalizeValue = (val: string | string[] | undefined): string[] => {
    if (val === undefined) return [];
    return Array.isArray(val) ? val : [val];
  };

  const [internalValue, setInternalValue] = useState<string[]>(
    normalizeValue(defaultValue)
  );

  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? normalizeValue(controlledValue) : internalValue;

  const handleValueChange = useCallback((itemValue: string) => {
    let newValue: string[] = [];

    if (type === 'single') {
      if (activeValue.includes(itemValue)) {
        // If clicking currently open item
        if (collapsible) {
           newValue = []; // Close it if collapsible
        } else {
           newValue = activeValue; // Keep it open if not collapsible
        }
      } else {
        newValue = [itemValue]; // Open the new one
      }
    } else {
      // Multiple
      if (activeValue.includes(itemValue)) {
        newValue = activeValue.filter((v) => v !== itemValue);
      } else {
        newValue = [...activeValue, itemValue];
      }
    }

    if (!isControlled) {
      setInternalValue(newValue);
    }

    // Notify parent
    if (onValueChange) {
      // Return string if single (and not empty?), array if multiple
      // Standardize output: usually libraries return the same type as input prop or strictly typed based on 'type'.
      // For simplicity and common patterns: Single -> string | undefined/null, Multiple -> string[]
      // But type definition says string | string[].
      
      if (type === 'single') {
        onValueChange(newValue[0] || ''); // Return empty string if closed
      } else {
        onValueChange(newValue);
      }
    }
  }, [type, activeValue, collapsible, isControlled, onValueChange]);

  const contextValue: AccordionContextType = useMemo(() => ({
    type,
    value: activeValue,
    onValueChange: handleValueChange,
    collapsible,
    variant,
    size,
    disabled
  }), [type, activeValue, handleValueChange, collapsible, variant, size, disabled]);

  return (
    <AccordionContext.Provider value={contextValue}>
      <div 
        className={clsx(
          styles.wrapper, 
          styles[`wrapper--${variant}`], 
          className
        )}
        style={style}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

Accordion.displayName = 'Accordion';
