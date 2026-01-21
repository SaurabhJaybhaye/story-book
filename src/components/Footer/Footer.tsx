import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import styles from './Footer.module.scss';
import type {
  FooterProps,
  FooterBrandProps,
  FooterContentProps,
  FooterSectionProps,
  FooterLinkProps,
  FooterSocialProps,
  FooterCopyrightProps,
} from './Footer.types';

export const Footer: React.FC<FooterProps> & {
  Brand: React.FC<FooterBrandProps>;
  Content: React.FC<FooterContentProps>;
  Section: React.FC<FooterSectionProps>;
  Link: React.FC<FooterLinkProps>;
  Social: React.FC<FooterSocialProps>;
  Copyright: React.FC<FooterCopyrightProps>;
} = ({
  children,
  variant = 'simple',
  className = '',
}) => {
  const { theme } = useTheme();
  
  const rootClasses = [
    styles.footer,
    styles[`footer--${variant}`],
    theme.mode === 'dark' ? styles['footer--dark'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <footer className={rootClasses} role="contentinfo">
      {children}
    </footer>
  );
};

Footer.Brand = ({ children, logo, name, href, onClick, className = '' }) => {
  const content = children || (
    <>
      {logo && <span className={styles.footer__brand__logo}>{logo}</span>}
      {name && <span>{name}</span>}
    </>
  );

  const rootClasses = [styles.footer__brand, className].filter(Boolean).join(' ');

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

Footer.Content = ({ children, align = 'left', className = '' }) => {
  const rootClasses = [
    styles.footer__content,
    styles[`footer__content--${align}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={rootClasses}>{children}</div>;
};

Footer.Section = ({ children, title, className = '' }) => {
  return (
    <div className={[styles.footer__section, className].filter(Boolean).join(' ')}>
      {title && <h4 className={styles.footer__section__title}>{title}</h4>}
      {children}
    </div>
  );
};

Footer.Link = ({ children, href, onClick, className = '', as: Component = 'a' }) => {
  const rootClasses = [styles.footer__link, className].filter(Boolean).join(' ');

  if (href || Component !== 'a') {
    return (
      <Component href={href} className={rootClasses} onClick={onClick}>
        {children}
      </Component>
    );
  }

  return (
    <button type="button" className={rootClasses} onClick={onClick}>
      {children}
    </button>
  );
};

Footer.Social = ({ children, className = '', align = 'center' }) => {
  const rootClasses = [
    styles.footer__social,
    styles[`footer__social--${align}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={rootClasses}>{children}</div>;
};

Footer.Copyright = ({ children, year, by, className = '' }) => {
  const currentYear = year || new Date().getFullYear();
  const text = by ? `© ${currentYear} ${by}. All rights reserved.` : `© ${currentYear} All rights reserved.`;
  
  return (
    <div className={[styles.footer__copyright, className].filter(Boolean).join(' ')}>
      {children || text}
    </div>
  );
};
