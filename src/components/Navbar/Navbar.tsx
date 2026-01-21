import React, { useState, createContext, useContext } from 'react';
import styles from './Navbar.module.scss';
import type { 
  NavbarProps, 
  NavbarBrandProps, 
  NavbarContentProps, 
  NavbarItemProps, 
  NavbarToggleProps,
  NavbarMenuProps
} from './Navbar.types';

// Context to share state between Navbar and its sub-components
interface NavbarContextType {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  variant: 'top' | 'side';
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

const useNavbarContext = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error('Navbar compound components must be used within a Navbar');
  }
  return context;
};

// Main Navbar Component
export const Navbar: React.FC<NavbarProps> & {
  Brand: React.FC<NavbarBrandProps>;
  Content: React.FC<NavbarContentProps>;
  Item: React.FC<NavbarItemProps>;
  Toggle: React.FC<NavbarToggleProps>;
  Menu: React.FC<NavbarMenuProps>;
} = ({ 
  children, 
  variant = 'top', 
  position = 'static',
  className = '',
  logo,
  brandName,
  onBrandClick
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const rootClasses = [
    styles.navbar,
    styles[`navbar--${variant}`],
    styles[`navbar--${position}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <NavbarContext.Provider value={{ isMenuOpen, toggleMenu, variant }}>
      <nav className={rootClasses} role="navigation" aria-label="Main navigation">
        {/* Convenience Render Prop for simple usage */}
        {(logo || brandName) && (
          <Navbar.Brand 
            logo={logo} 
            name={brandName} 
            onClick={onBrandClick} 
          />
        )}
        
        {children}
      </nav>
    </NavbarContext.Provider>
  );
};

// Sub-components
Navbar.Brand = ({ children, logo, name, href, onClick, className = '' }) => {
  const content = children || (
    <>
      {logo && <span className={styles.navbar__logo}>{logo}</span>}
      {name && <span className={styles.navbar__name}>{name}</span>}
    </>
  );

  const rootClasses = [styles.navbar__brand, className].filter(Boolean).join(' ');

  if (href) {
    return (
      <a href={href} className={rootClasses} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <div className={rootClasses} onClick={onClick} role="button" tabIndex={0}>
      {content}
    </div>
  );
};

Navbar.Content = ({ children, align = 'center', className = '' }) => {
  const rootClasses = [
    styles.navbar__content,
    styles[`navbar__content--${align}`],
    className
  ].filter(Boolean).join(' ');

  return <div className={rootClasses}>{children}</div>;
};

Navbar.Item = ({ 
  children, 
  icon, 
  href, 
  onClick, 
  active = false, 
  disabled = false, 
  className = '',
  as: Component = 'a' // Default to 'a' tag, but allow overrides (e.g. Link)
}) => {
  const rootClasses = [
    styles.navbar__item,
    active ? styles['navbar__item--active'] : '',
    disabled ? styles['navbar__item--disabled'] : '',
    className
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {icon && <span className={styles.navbar__icon}>{icon}</span>}
      {children}
    </>
  );

  if (disabled) {
    return <span className={rootClasses}>{content}</span>;
  }

  // If 'as' is provided or it's a link
  if (href || Component !== 'a') {
    return (
      <Component href={href} className={rootClasses} onClick={onClick}>
        {content}
      </Component>
    );
  }

  return (
    <button type="button" className={rootClasses} onClick={onClick}>
      {content}
    </button>
  );
};

Navbar.Toggle = ({ className = '' }) => {
  const { isMenuOpen, toggleMenu } = useNavbarContext();

  const rootClasses = [
    styles.navbar__toggle,
    isMenuOpen ? styles['navbar__toggle--open'] : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={rootClasses} 
      onClick={toggleMenu}
      aria-expanded={isMenuOpen}
      aria-label="Toggle navigation menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

Navbar.Menu = ({ children, className = '' }) => {
  const { isMenuOpen } = useNavbarContext();

  const rootClasses = [
    styles.navbar__menu,
    isMenuOpen ? styles['navbar__menu--open'] : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClasses}>
      {children}
    </div>
  );
};
