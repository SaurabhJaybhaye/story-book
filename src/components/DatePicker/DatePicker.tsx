import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { 
  format as formatDate, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isToday,
  setYear,
  getYear,
  startOfYear,
  eachMonthOfInterval,
  endOfYear,
  isBefore,
  isAfter,
  isValid
} from 'date-fns';
import type { DatePickerProps, DatePickerMode } from './DatePicker.types';
import { DEFAULT_DATE_FORMAT, WEEK_DAYS } from './DatePicker.constants';
import styles from './DatePicker.module.scss';

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export const DatePicker: React.FC<DatePickerProps> = ({
  mode = 'date',
  value: propValue,
  defaultValue,
  onChange,
  format = DEFAULT_DATE_FORMAT,
  placeholder = 'Select date...',
  minDate,
  maxDate,
  disabled = false,
  readOnly = false,
  clearable = true,
  className,
  style,
  error,
}) => {
  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue || null);
  const [isOpen, setIsOpen] = useState(false);
  
  const isControlled = propValue !== undefined;
  const selectedDate = isControlled ? propValue : internalValue;
  
  const [viewDate, setViewDate] = useState<Date>(selectedDate || new Date());
  const [internalMode, setInternalMode] = useState<DatePickerMode>(mode);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInternalMode(mode);
  }, [mode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle Escape Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleInputClick = () => {
    if (!disabled && !readOnly) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleDateSelect = (date: Date) => {
    if (disabled || readOnly) return;
    if (minDate && isBefore(date, minDate) && !isSameDay(date, minDate)) return;
    if (maxDate && isAfter(date, maxDate) && !isSameDay(date, maxDate)) return;

    if (!isControlled) {
      setInternalValue(date);
    }
    onChange?.(date);
    setIsOpen(false);
  };

  const handleMonthSelect = (monthDate: Date) => {
    if (mode === 'month') {
        handleDateSelect(monthDate);
    } else {
        setViewDate(monthDate);
        setInternalMode('date');
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isControlled) setInternalValue(null);
    onChange?.(null);
  };

  const handlePrev = () => {
    if (internalMode === 'date') {
        setViewDate(subMonths(viewDate, 1));
    } else {
        setViewDate(prev => setYear(prev, getYear(prev) - 1));
    }
  };

  const handleNext = () => {
    if (internalMode === 'date') {
        setViewDate(addMonths(viewDate, 1));
    } else {
        setViewDate(prev => setYear(prev, getYear(prev) + 1));
    }
  };

  const toggleViewMode = () => {
    if (mode === 'month') return; 
    setInternalMode(prev => prev === 'date' ? 'month' : 'date');
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(viewDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className={styles.calendar}>
        {WEEK_DAYS.map(day => (
          <div className={styles.weekDay} key={day}>{day}</div>
        ))}
        {days.map((day) => {
            const isSameMonthAsView = isSameMonth(day, monthStart);
            const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
            const isDayToday = isToday(day);
            
            let isDisabled = false;
            if (minDate && isBefore(day, minDate) && !isSameDay(day, minDate)) isDisabled = true;
            if (maxDate && isAfter(day, maxDate) && !isSameDay(day, maxDate)) isDisabled = true;

            return (
              <button
                key={day.toString()}
                className={clsx(
                  styles.day,
                  {
                    [styles['day--outside']]: !isSameMonthAsView,
                    [styles['day--selected']]: isSelected,
                    [styles['day--today']]: isDayToday,
                  }
                )}
                disabled={isDisabled}
                onClick={() => handleDateSelect(day)}
                type="button"
                aria-label={`Select ${formatDate(day, 'PPPP')}`}
                aria-pressed={isSelected}
              >
                {formatDate(day, 'd')}
              </button>
            );
        })}
      </div>
    );
  };

  const renderMonthPicker = () => {
    const yearStart = startOfYear(viewDate);
    const yearEnd = endOfYear(viewDate);
    const months = eachMonthOfInterval({ start: yearStart, end: yearEnd });

    return (
        <div className={styles.monthGrid}>
            {months.map(month => {
                const isSelected = selectedDate ? isSameMonth(month, selectedDate) && getYear(month) === getYear(selectedDate) : false;
                
                let isDisabled = false;
                if (minDate && isBefore(endOfMonth(month), minDate)) isDisabled = true;
                if (maxDate && isAfter(startOfMonth(month), maxDate)) isDisabled = true;

                return (
                    <button
                        key={month.toString()}
                        className={clsx(styles.monthButton, {
                            [styles['monthButton--selected']]: isSelected,
                        })}
                        disabled={isDisabled}
                        onClick={() => handleMonthSelect(month)}
                        type="button"
                    >
                        {formatDate(month, 'MMM')}
                    </button>
                )
            })}
        </div>
    )
  }

  const headerTitle = internalMode === 'date' 
    ? formatDate(viewDate, 'MMMM yyyy')
    : formatDate(viewDate, 'yyyy');

  const displayValue = selectedDate && isValid(selectedDate) 
    ? formatDate(selectedDate, format)
    : '';

  return (
    <div className={clsx(styles.wrapper, className)} style={style} ref={containerRef}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={clsx(styles.input, { [styles['input--error']]: error })}
          value={displayValue}
          placeholder={placeholder}
          onClick={handleInputClick}
          readOnly={readOnly}
          disabled={disabled}
          aria-invalid={!!error}
        />
        {clearable && selectedDate && !disabled && !readOnly && (
          <button className={styles.clearButton} onClick={handleClear} type="button" aria-label="Clear date">
            <XIcon />
          </button>
        )}
        <span className={styles.icon}>
          <CalendarIcon />
        </span>
      </div>

      {error && (
        <div className={styles.footer}>
            <span className={clsx(styles.helperText, styles['helperText--error'])}>
                {typeof error === 'string' ? error : ''}
            </span>
        </div>
      )}

      <div className={clsx(styles.popup, { [styles['popup--open']]: isOpen })}>
        <div className={styles.header}>
            <button className={styles.navButton} onClick={handlePrev} type="button">
                <ChevronLeft />
            </button>
            <button 
                className={styles.currentMonth} 
                onClick={toggleViewMode} 
                type="button"
                disabled={mode === 'month'}
            >
                {headerTitle}
            </button>
            <button className={styles.navButton} onClick={handleNext} type="button">
                <ChevronRight />
            </button>
        </div>

        {internalMode === 'date' ? renderCalendar() : renderMonthPicker()}
      </div>
    </div>
  );
};

DatePicker.displayName = 'DatePicker';
