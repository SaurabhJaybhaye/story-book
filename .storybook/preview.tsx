import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { ThemeProvider } from '../src/theme/ThemeProvider';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Global Theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      return (
        <ThemeProvider initialTheme={theme}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
