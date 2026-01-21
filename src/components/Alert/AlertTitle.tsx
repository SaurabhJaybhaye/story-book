import { Typography } from '../Typography';
import styles from './Alert.module.scss';
import type { AlertTitleProps } from './Alert.types';
import clsx from 'clsx';

export const AlertTitle = ({ children, className, ...props }: AlertTitleProps) => (
  <Typography 
    variant="body1" 
    fontWeight="medium" 
    as="h5" 
    className={clsx(styles.title, className)} 
    style={{ color: 'inherit' }}
    {...props}
  >
    {children}
  </Typography>
);
