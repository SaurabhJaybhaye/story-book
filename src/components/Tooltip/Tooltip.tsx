import React, { useState, useRef, useEffect, cloneElement, isValidElement, useCallback } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import type { TooltipProps, TooltipPlacement } from './Tooltip.types';
import { 
    DEFAULT_TOOLTIP_PLACEMENT, 
    DEFAULT_OPEN_DELAY, 
    DEFAULT_CLOSE_DELAY, 
    DEFAULT_Z_INDEX,
    TOOLTIP_OFFSET,
    TOOLTIP_ARROW_SIZE 
} from './Tooltip.constants';
import styles from './Tooltip.module.scss';

// Helper to check trigger types
const hasTrigger = (trigger: TooltipProps['trigger'], type: string) => {
    if (Array.isArray(trigger)) return trigger.includes(type as any);
    return trigger === type;
};

export const Tooltip: React.FC<TooltipProps> = ({
    children,
    content,
    placement = DEFAULT_TOOLTIP_PLACEMENT,
    trigger = ['hover', 'focus'],
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    openDelay = DEFAULT_OPEN_DELAY,
    closeDelay = DEFAULT_CLOSE_DELAY,
    disabled = false,
    className,
    style,
    zIndex = DEFAULT_Z_INDEX,
    maxWidth,
    arrow = true,
}) => {
    // State
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
    const [coords, setCoords] = useState<{ top: number; left: number; placement: TooltipPlacement }>({ top: 0, left: 0, placement });
    const [arrowCoords, setArrowCoords] = useState<{ top?: number; left?: number; bottom?: number; right?: number } | undefined>();
    
    // Refs
    // Use a wrapper ref if we wrap, but ideally we clone.
    // We need the DOM node of the trigger to calculate position.
    const triggerRef = useRef<HTMLElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const handleOpenChange = useCallback((newOpen: boolean) => {
        if (disabled && newOpen) return;
        
        if (controlledOpen === undefined) {
            setInternalOpen(newOpen);
        }
        onOpenChange?.(newOpen);
    }, [controlledOpen, disabled, onOpenChange]);

    // Positioning Logic
    const updatePosition = useCallback(() => {
        if (!isOpen || !triggerRef.current || !tooltipRef.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        
        // Basic calculation based on placement
        let currentPlacement = placement;

        // Viewport boundaries
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Calculation helpers
        const getPosition = (p: TooltipPlacement) => {
            const centerX = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
            const centerY = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;

            switch (p) {
                case 'top': return { top: triggerRect.top - tooltipRect.height - TOOLTIP_OFFSET, left: centerX };
                case 'top-start': return { top: triggerRect.top - tooltipRect.height - TOOLTIP_OFFSET, left: triggerRect.left };
                case 'top-end': return { top: triggerRect.top - tooltipRect.height - TOOLTIP_OFFSET, left: triggerRect.right - tooltipRect.width };
                
                case 'bottom': return { top: triggerRect.bottom + TOOLTIP_OFFSET, left: centerX };
                case 'bottom-start': return { top: triggerRect.bottom + TOOLTIP_OFFSET, left: triggerRect.left };
                case 'bottom-end': return { top: triggerRect.bottom + TOOLTIP_OFFSET, left: triggerRect.right - tooltipRect.width };

                case 'left': return { top: centerY, left: triggerRect.left - tooltipRect.width - TOOLTIP_OFFSET };
                case 'left-start': return { top: triggerRect.top, left: triggerRect.left - tooltipRect.width - TOOLTIP_OFFSET };
                case 'left-end': return { top: triggerRect.bottom - tooltipRect.height, left: triggerRect.left - tooltipRect.width - TOOLTIP_OFFSET };

                case 'right': return { top: centerY, left: triggerRect.right + TOOLTIP_OFFSET };
                case 'right-start': return { top: triggerRect.top, left: triggerRect.right + TOOLTIP_OFFSET };
                case 'right-end': return { top: triggerRect.bottom - tooltipRect.height, left: triggerRect.right + TOOLTIP_OFFSET };
                
                default: return { top: 0, left: 0 };
            }
        };

        let pos = getPosition(currentPlacement);

        // Simple Flip Logic (Top/Bottom, Left/Right swap)
        // If overflowing top and preferred is top, switch to bottom
        if (currentPlacement.startsWith('top') && pos.top < 0) {
            const newP = currentPlacement.replace('top', 'bottom') as TooltipPlacement;
            const newPos = getPosition(newP);
            // Only switch if new pos doesn't overflow bottom
            if (newPos.top + tooltipRect.height <= viewportHeight) {
                currentPlacement = newP;
                pos = newPos;
            }
        } else if (currentPlacement.startsWith('bottom') && pos.top + tooltipRect.height > viewportHeight) {
            const newP = currentPlacement.replace('bottom', 'top') as TooltipPlacement;
            const newPos = getPosition(newP);
            if (newPos.top >= 0) {
                 currentPlacement = newP;
                 pos = newPos;
            }
        }
        
        // Constrain to viewport (shift to visible) for X axis
        if (pos.left < 8) pos.left = 8;
        if (pos.left + tooltipRect.width > viewportWidth - 8) {
            pos.left = viewportWidth - tooltipRect.width - 8;
        }
        
        // Constrain Y axis if side placement
        if (currentPlacement.startsWith('left') || currentPlacement.startsWith('right')) {
             if (pos.top < 8) pos.top = 8;
             if (pos.top + tooltipRect.height > viewportHeight - 8) {
                 pos.top = viewportHeight - tooltipRect.height - 8;
             }
        }

        setCoords({ top: pos.top, left: pos.left, placement: currentPlacement });

        // Calculate Arrow Position
        // Arrow attempts to center on trigger, relative to tooltip
        if (arrow) {
             const triggerCenterX = triggerRect.left + triggerRect.width / 2;
             const triggerCenterY = triggerRect.top + triggerRect.height / 2;
             
             let arrowStyle: any = {};
             // Half the size to center the arrow tip/center
             const offset = -(TOOLTIP_ARROW_SIZE / 2); 

             if (currentPlacement.startsWith('top')) {
                 arrowStyle = { bottom: offset, left: triggerCenterX - pos.left + offset };
             } else if (currentPlacement.startsWith('bottom')) {
                 arrowStyle = { top: offset, left: triggerCenterX - pos.left + offset };
             } else if (currentPlacement.startsWith('left')) {
                 arrowStyle = { right: offset, top: triggerCenterY - pos.top + offset };
             } else if (currentPlacement.startsWith('right')) {
                 arrowStyle = { left: offset, top: triggerCenterY - pos.top + offset };
             }
             
             // Clamp arrow to tooltip bounds (radius safe area)
             const safePadding = 8;
             // safeWidth/safeHeight not needed if we use direct rect width/height minus padding

             if (arrowStyle.left !== undefined) {
                 // The arrow calculation above is relative to top/left of tooltip.
                 // We clamp it so it doesn't detach from the box.
                 // We also need to account for arrow size in clamp.
                 // Let's use simple logic:
                 const min = safePadding;
                 const max = tooltipRect.width - safePadding - TOOLTIP_ARROW_SIZE;
                 
                 // If the calculation puts the arrow way off (e.g. trigger is far left but tooltip shifted right to stay on screen)
                 // We need to visually clamp the arrow, BUT if it detaches from trigger, it looks weird.
                 // But better than arrow floating in space.
                 arrowStyle.left = Math.max(min, Math.min(max, arrowStyle.left));
             }
             if (arrowStyle.top !== undefined) {
                 const min = safePadding;
                 const max = tooltipRect.height - safePadding - TOOLTIP_ARROW_SIZE;
                 arrowStyle.top = Math.max(min, Math.min(max, arrowStyle.top));
             }
             
             setArrowCoords(arrowStyle);
        }

    }, [isOpen, placement, arrow]);

    // Update position on scroll/resize
    useEffect(() => {
        if (isOpen) {
            updatePosition();
            window.addEventListener('resize', updatePosition);
            window.addEventListener('scroll', updatePosition, true); // Capture scroll on all containers
            
            // RAF loop for smooth tracking if needed, but listeners usually enough for static UI
            return () => {
                window.removeEventListener('resize', updatePosition);
                window.removeEventListener('scroll', updatePosition, true);
            };
        }
    }, [isOpen, updatePosition]);

    // Initial position update when opening
    useEffect(() => {
        if (isOpen) {
            // Wait for render
            requestAnimationFrame(updatePosition);
        }
    }, [isOpen, content, updatePosition]);

    // Handlers
    const clearTimer = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
    };

    const onMouseEnter = () => {
        if (!hasTrigger(trigger, 'hover')) return;
        clearTimer();
        timerRef.current = setTimeout(() => handleOpenChange(true), openDelay);
    };

    const onMouseLeave = () => {
        if (!hasTrigger(trigger, 'hover')) return;
        clearTimer();
        timerRef.current = setTimeout(() => handleOpenChange(false), closeDelay);
    };

    const onFocus = () => {
        if (!hasTrigger(trigger, 'focus')) return;
        clearTimer();
        handleOpenChange(true);
    };

    const onBlur = () => {
        if (!hasTrigger(trigger, 'focus')) return;
        clearTimer();
        handleOpenChange(false);
    };

    const onClick = () => {
        if (hasTrigger(trigger, 'click')) {
            handleOpenChange(!isOpen);
        }
    };
    
    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isOpen && e.key === 'Escape') {
                handleOpenChange(false);
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, handleOpenChange]);

    // --- Render ---

    if (!isValidElement(children)) {
        console.warn('Tooltip child must be a valid React Element');
        return <>{children}</>;
    }

    // Clone element to attach refs and handlers
    // We compose existing handlers if any
    const triggerElement = cloneElement(children as React.ReactElement<any>, {
        ref: (node: HTMLElement) => {
            // Handle both refs (local and existing)
            (triggerRef as any).current = node;
            const { ref } = children as any;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
        },
        onMouseEnter: (e: React.MouseEvent) => {
            onMouseEnter();
            (children as any).props.onMouseEnter?.(e);
        },
        onMouseLeave: (e: React.MouseEvent) => {
            onMouseLeave();
            (children as any).props.onMouseLeave?.(e);
        },
        onFocus: (e: React.FocusEvent) => {
            onFocus();
            (children as any).props.onFocus?.(e);
        },
        onBlur: (e: React.FocusEvent) => {
            onBlur();
            (children as any).props.onBlur?.(e);
        },
        onClick: (e: React.MouseEvent) => {
            onClick(e);
            (children as any).props.onClick?.(e);
        },
        // Accessibility
        'aria-describedby': isOpen ? 'tooltip-content' : undefined, // Should generate unique ID
    });

    return (
        <>
            {triggerElement}
            {isOpen && createPortal(
                <div
                    ref={tooltipRef}
                    className={clsx(
                         styles.tooltip, 
                         styles['tooltip--visible'],
                         className
                    )}
                    style={{
                        top: coords.top,
                        left: coords.left,
                        zIndex,
                        maxWidth: maxWidth ? maxWidth : undefined,
                        ...style,
                    }}
                    role="tooltip"
                    id="tooltip-content"
                >
                    {content}
                    {arrow && (
                        <div 
                            className={styles.arrow} 
                            style={arrowCoords}
                        />
                    )}
                </div>,
                document.body
            )}
        </>
    );
};
