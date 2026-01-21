import type { ReactNode } from 'react';

export type NavbarVariant = 'top' | 'side';
export type NavbarPosition = 'static' | 'sticky' | 'fixed';

export interface NavbarProps {
  children?: ReactNode;
  variant?: NavbarVariant;
  position?: NavbarPosition;
  className?: string;
  logo?: ReactNode;
  brandName?: string;
  onBrandClick?: () => void;
}

export interface NavbarBrandProps {
  children?: ReactNode;
  logo?: ReactNode;
  name?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export interface NavbarContentProps {
  children?: ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export interface NavbarItemProps {
  children?: ReactNode;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  as?: any; // To support different router links like Link from react-router-dom
}

export interface NavbarToggleProps {
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export interface NavbarMenuProps {
  children?: ReactNode;
  isOpen?: boolean;
  className?: string;
}
