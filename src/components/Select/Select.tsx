import { useId } from 'react';
import ReactSelect from 'react-select';
import type { GroupBase } from 'react-select';
import clsx from 'clsx';
import styles from './Select.module.scss';
import type { SelectProps } from './Select.types';
import { DEFAULT_SELECT_SIZE, DEFAULT_SELECT_VARIANT } from './Select.constants';

// We export the generic component to allow consumers to use it with any Option type
export const Select = <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  size = DEFAULT_SELECT_SIZE,
  variant = DEFAULT_SELECT_VARIANT,
  label,
  helperText,
  error,
  fullWidth,
  className,
  id,
  classNames, // Allow user to add more classNames
  ...props
}: SelectProps<Option, IsMulti, Group>) => {
  const generatedId = useId();
  const selectId = id || generatedId;
  const isError = !!error;

  return (
    <div
      className={clsx(
        styles.wrapper,
        {
          [styles['wrapper--fullWidth']]: fullWidth,
        },
        className
      )}
    >
      {label && (
        <label
          htmlFor={selectId}
          className={clsx(styles.label, {
            [styles['label--error']]: isError,
          })}
        >
          {label}
        </label>
      )}

      <ReactSelect
        {...props}
        inputId={selectId}
        classNames={{
          control: (state) =>
            clsx(
              styles.control,
              styles[`control--${size}`],
              styles[`control--${variant}`],
              {
                [styles['control--focused']]: state.isFocused,
                [styles['control--disabled']]: state.isDisabled,
                [styles['control--error']]: isError,
              },
              classNames?.control?.(state)
            ),
          menu: (state) => clsx(styles.menu, classNames?.menu?.(state)),
          option: (state) =>
            clsx(
              styles.option,
              {
                [styles['option--focused']]: state.isFocused,
                [styles['option--selected']]: state.isSelected,
              },
              classNames?.option?.(state)
            ),
          placeholder: (state) => clsx(styles.placeholder, classNames?.placeholder?.(state)),
          singleValue: (state) => clsx(styles.singleValue, classNames?.singleValue?.(state)),
          multiValue: (state) => clsx(styles.multiValue, classNames?.multiValue?.(state)),
          multiValueLabel: (state) => clsx(styles.multiValueLabel, classNames?.multiValueLabel?.(state)),
          multiValueRemove: (state) => clsx(styles.multiValueRemove, classNames?.multiValueRemove?.(state)),
          dropdownIndicator: (state) => clsx(styles.dropdownIndicator, classNames?.dropdownIndicator?.(state)),
          clearIndicator: (state) => clsx(styles.clearIndicator, classNames?.clearIndicator?.(state)),
          valueContainer: (state) => clsx(styles.valueContainer, classNames?.valueContainer?.(state)),
          indicatorsContainer: (state) => clsx(styles.indicatorsContainer, classNames?.indicatorsContainer?.(state)),
          ...classNames,
        }}
      />

      {(helperText || error) && (
        <span
          className={clsx(styles.helperText, {
            [styles['helperText--error']]: isError,
          })}
        >
          {isError && typeof error !== 'boolean' ? error : helperText}
        </span>
      )}
    </div>
  );
};

Select.displayName = 'Select';
