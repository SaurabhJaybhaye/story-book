import type { ReactNode } from 'react';

export type FooterVariant = 'simple' | 'multi-column';

export interface FooterProps {
  children?: ReactNode;
  variant?: FooterVariant;
  className?: string;
}

export interface FooterBrandProps {
  children?: ReactNode;
  logo?: ReactNode;
  name?: string;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export interface FooterContentProps {
  children?: ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export interface FooterSectionProps {
  children?: ReactNode;
  title?: string;
  className?: string;
}

export interface FooterLinkProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  as?: any;
}

export interface FooterSocialProps {
  children?: ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export interface FooterCopyrightProps {
  children?: ReactNode;
  year?: number | string;
  by?: string;
  className?: string;
}
