import { createElement, type CSSProperties } from 'react';
import clsx from 'clsx';
import type { TypographyProps } from './Typography.types';
import { VARIANT_TAG_MAP, DEFAULT_TYPOGRAPHY_VARIANT } from './Typography.constants';
import styles from './Typography.module.scss';

export const Typography = ({
  children,
  as,
  variant = DEFAULT_TYPOGRAPHY_VARIANT,
  size,
  fontWeight,
  textAlign,
  textTransform,
  truncate,
  lineClamp,
  className,
  style,
  ...props
}: TypographyProps) => {
  // Determine the HTML tag to use
  const Tag = as || VARIANT_TAG_MAP[variant] || 'p';

  // Construct classes
  const classes = clsx(
    styles.root,
    styles[variant], // e.g. .h1, .body1
    size && styles[`size-${size}`], // e.g. .size-lg
    fontWeight && styles[`weight-${fontWeight}`],
    textAlign && styles[`align-${textAlign}`],
    textTransform && styles[`transform-${textTransform}`],
    truncate && styles.truncate,
    lineClamp && styles.lineClamp,
    className
  );

  // Construct inline styles for dynamic props like lineClamp
  const inlineStyle: CSSProperties = {
    ...style,
    ...(lineClamp ? { WebkitLineClamp: lineClamp } : {}),
  } as CSSProperties;

  return createElement(
    Tag,
    {
      className: classes,
      style: Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined,
      ...props,
    },
    children
  );
};

Typography.displayName = 'Typography';
