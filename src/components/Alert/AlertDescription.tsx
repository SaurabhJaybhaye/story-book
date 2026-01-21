import { Typography } from '../Typography';
import styles from './Alert.module.scss';
import type { AlertDescriptionProps } from './Alert.types';
import clsx from 'clsx';

export const AlertDescription = ({ children, className, ...props }: AlertDescriptionProps) => (
  <Typography 
    variant="body2" 
    as="div" 
    className={clsx(styles.description, className)} 
    style={{ color: 'inherit' }}
    {...props}
  >
    {children}
  </Typography>
);
