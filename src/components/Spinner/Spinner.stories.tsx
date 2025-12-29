import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['circular', 'dots', 'bars', 'pulse', 'ring', 'wave'],
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    speed: {
      control: { type: 'range', min: 0.1, max: 2, step: 0.1 },
    },
    color: { control: 'color' },
    trackColor: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    variant: 'circular',
    size: 'md',
  },
};

// --- VARIANTS ---

export const Circular: Story = { args: { variant: 'circular' } };
export const Dots: Story = { args: { variant: 'dots' } };
export const Bars: Story = { args: { variant: 'bars' } };
export const Pulse: Story = { args: { variant: 'pulse' } };
export const Ring: Story = { args: { variant: 'ring' } };
export const Wave: Story = { args: { variant: 'wave' } };

// --- SIZES ---

export const ExtraSmall: Story = { args: { size: 'xs', variant: 'circular' } };
export const Small: Story = { args: { size: 'sm', variant: 'circular' } };
export const Large: Story = { args: { size: 'lg', variant: 'circular' } };
export const ExtraLarge: Story = { args: { size: 'xl', variant: 'circular' } };

// --- STATES ---

export const WithMessage: Story = { 
  args: { 
    message: 'Processing Request...',
    variant: 'dots'
  } 
};

export const Paused: Story = { 
  args: { 
    disableAnimation: true,
    variant: 'bars'
  } 
};

// --- CONTEXT EXAMPLES ---

export const OverlayExample: Story = {
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '300px', width: '100%', border: '1px solid #ccc', overflow: 'hidden' }}>
         <div style={{ padding: '20px' }}>
            <h3>Content Behind Overlay</h3>
            <p>This content should be unobscured until the overlay is active. But in this story, the spinner overlay is active inside this container.</p>
            <button>Unclickable Button</button>
         </div>
         <Story />
      </div>
    ),
  ],
  args: {
    overlay: true,
    message: 'Loading Component...',
    variant: 'circular'
  },
};

export const FullscreenLoader: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    fullscreen: true,
    message: 'Loading Application...',
    variant: 'wave',
    size: 'xl'
  },
};

export const CustomColor: Story = { 
  args: { 
    color: '#ef4444', 
    variant: 'ring',
    size: 'lg'
  } 
};
