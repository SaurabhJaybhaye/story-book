import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Theme, ThemeMode } from './theme.types';
import { lightTheme } from './light.theme';
import { darkTheme } from './dark.theme';
import { createCustomTheme } from './createCustomTheme';

interface ThemeContextProps {
  theme: Theme;
  setThemeMode: (mode: ThemeMode, customColors?: any) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode; initialTheme?: ThemeMode; customThemeColors?: any }> = ({ 
  children, 
  initialTheme = 'light',
  customThemeColors
}) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(lightTheme);

  const applyTheme = (mode: ThemeMode, customColors?: any) => {
    let newTheme: Theme;
    switch (mode) {
      case 'dark':
        newTheme = darkTheme;
        break;
      case 'custom':
        newTheme = createCustomTheme(customColors || {});
        break;
      case 'light':
      default:
        newTheme = lightTheme;
        break;
    }
    setCurrentTheme(newTheme);
  };

  useEffect(() => {
    applyTheme(initialTheme, customThemeColors);
  }, [initialTheme, customThemeColors]);

  // Apply CSS variables to root (or we can use inline styles on a wrapper)
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bg-body', currentTheme.colors.bgBody);
    root.style.setProperty('--bg-alt', currentTheme.colors.bgAlt);
    root.style.setProperty('--bg-glass', currentTheme.colors.bgGlass);
    root.style.setProperty('--border-glass', currentTheme.colors.borderGlass);
    root.style.setProperty('--text-main', currentTheme.colors.textMain);
    root.style.setProperty('--text-muted', currentTheme.colors.textMuted);
    root.style.setProperty('--primary', currentTheme.colors.primary);
    root.style.setProperty('--primary-glow', currentTheme.colors.primaryGlow);
    root.style.setProperty('--secondary', currentTheme.colors.secondary);
    root.style.setProperty('--accent', currentTheme.colors.accent);
    root.style.setProperty('--danger', currentTheme.colors.danger);
    root.style.setProperty('--success', currentTheme.colors.success);
    root.style.setProperty('--warning', currentTheme.colors.warning);
    root.style.setProperty('--info', currentTheme.colors.info);
    root.style.setProperty('--card-shadow', currentTheme.colors.cardShadow);
            
    // Set data-theme attribute for other potential selectors
    root.setAttribute('data-theme', currentTheme.mode);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setThemeMode: applyTheme }}>
      <div style={{ backgroundColor: currentTheme.colors.bgBody, color: currentTheme.colors.textMain, minHeight: '100vh', width: '100%', padding: '2rem', boxSizing: 'border-box', transition: 'all 0.3s' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
