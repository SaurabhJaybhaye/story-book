import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';


const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'outline', 'ghost', 'link', 'danger', 'success', 'warning', 'info'],
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: 'select',
      options: ['rounded-sm', 'rounded-md', 'rounded-lg', 'pill', 'square', 'circle'],
    },
    isLoading: { control: 'boolean' },
    isFullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 1. Core Variants
export const Primary: Story = { args: { label: 'Primary Button', variant: 'primary' } };
export const Secondary: Story = { args: { label: 'Secondary Button', variant: 'secondary' } };
export const Tertiary: Story = { args: { label: 'Tertiary Button', variant: 'tertiary' } };
export const Outline: Story = { args: { label: 'Outline Button', variant: 'outline' } };
export const Ghost: Story = { args: { label: 'Ghost Button', variant: 'ghost' } };
export const Link: Story = { args: { label: 'Link Button', variant: 'link' } };

// 2. Semantic Variants
export const Danger: Story = { args: { label: 'Delete Account', variant: 'danger' } };
export const Success: Story = { args: { label: 'Submit Success', variant: 'success' } };
export const Warning: Story = { args: { label: 'Warning Action', variant: 'warning' } };
export const Info: Story = { args: { label: 'Info Action', variant: 'info' } };

// 3. States & Behaviors
export const Loading: Story = { 
  args: { 
    label: 'Click Me', 
    isLoading: true, 
    loadingText: 'Processing...' 
  } 
};

export const Disabled: Story = { 
  args: { 
    label: 'Disabled Button', 
    disabled: true, 
    variant: 'primary' 
  } 
};

export const FullWidth: Story = { 
  args: { 
    label: 'Full Width Button', 
    isFullWidth: true, 
    variant: 'primary' 
  },
  parameters: {
    layout: 'padded', // Ensure storybook has space
  }
};

// 4. Icons
export const IconLeft: Story = { 
  args: { 
    label: 'Search', 
    variant: 'primary',
    leftIcon: <span>🔍</span> 
  } 
};

export const IconRight: Story = { 
  args: { 
    label: 'Next Step', 
    variant: 'primary',
    rightIcon: <span>→</span> 
  } 
};

export const IconOnly: Story = { 
  args: { 
    variant: 'secondary',
    shape: 'circle',
    leftIcon: <span>❤️</span>,
    'aria-label': 'Like',
  } 
};

// 5. Shapes & Sizes
export const PillShape: Story = { 
  args: { 
    label: 'Pill Button', 
    shape: 'pill', 
    variant: 'primary' 
  } 
};

export const SizeXL: Story = { 
  args: { 
    label: 'Extra Large', 
    size: 'xl', 
    variant: 'primary' 
  } 
};

export const SizeXS: Story = { 
  args: { 
    label: 'Extra Small', 
    size: 'xs', 
    variant: 'outline' 
  } 
};
