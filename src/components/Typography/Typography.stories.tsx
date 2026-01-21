import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'subtitle', 'body1', 'body2',
        'caption', 'label', 'overline', 'helper', 'code'
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    fontWeight: {
      control: 'select',
      options: ['light', 'regular', 'medium', 'bold'],
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
    },
    textTransform: {
      control: 'select',
      options: ['uppercase', 'lowercase', 'capitalize', 'none'],
    },
    truncate: { control: 'boolean' },
    lineClamp: { control: 'number' },
    as: { control: 'text', description: 'HTML tag to render as (e.g., h1, span, div)' },
  },
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

// --- VARIANTS ---
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography variant="h1">H1. Heading level 1</Typography>
      <Typography variant="h2">H2. Heading level 2</Typography>
      <Typography variant="h3">H3. Heading level 3</Typography>
      <Typography variant="h4">H4. Heading level 4</Typography>
      <Typography variant="h5">H5. Heading level 5</Typography>
      <Typography variant="h6">H6. Heading level 6</Typography>
      <hr />
      <Typography variant="subtitle">Subtitle. Used for supporting text.</Typography>
      <Typography variant="body1">Body 1. Default body text. Lorem ipsum dolor sit amet.</Typography>
      <Typography variant="body2">Body 2. Smaller body text for dense UIs.</Typography>
      <hr />
      <Typography variant="caption">Caption. Used for timestamps, hints, etc.</Typography>
      <Typography variant="label">Label. Used for form inputs or UI badges.</Typography>
      <Typography variant="overline">Overline. Used for eyebrows or small headers.</Typography>
      <Typography variant="helper">Helper. Used for hints or secondary info.</Typography>
      <Typography variant="code">Code. Used for snippets or terminal text.</Typography>
    </div>
  ),
};

export const Default: Story = {
  args: {
    variant: 'body1',
  },
};

// --- SIZES ---
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
       <Typography variant="body1" size="xs">Extra Small (xs)</Typography>
       <Typography variant="body1" size="sm">Small (sm)</Typography>
       <Typography variant="body1" size="md">Medium (md - Default)</Typography>
       <Typography variant="body1" size="lg">Large (lg)</Typography>
       <Typography variant="body1" size="xl">Extra Large (xl)</Typography>
    </div>
  ),
};

// --- WEIGHTS ---
export const Weights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
       <Typography variant="body1" fontWeight="light">Light (300)</Typography>
       <Typography variant="body1" fontWeight="regular">Regular (400)</Typography>
       <Typography variant="body1" fontWeight="medium">Medium (500)</Typography>
       <Typography variant="body1" fontWeight="bold">Bold (700)</Typography>
    </div>
  ),
};

// --- ALIGNMENT ---
export const Alignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', border: '1px dashed #ccc' }}>
       <Typography variant="body1" textAlign="left">Left Aligned</Typography>
       <Typography variant="body1" textAlign="center">Center Aligned</Typography>
       <Typography variant="body1" textAlign="right">Right Aligned</Typography>
    </div>
  ),
};

// --- FEATURES ---
export const Truncation: Story = {
  args: {
    truncate: true,
    children: 'This is a very long text that should be truncated because it exceeds the width of its container. Resize the window or container to see the ellipsis effect.',
  },
  render: (args) => (
    <div style={{ width: '300px', border: '1px solid #ccc', padding: '1rem' }}>
      <Typography {...args} />
    </div>
  ),
};

export const LineClamp: Story = {
  args: {
    lineClamp: 2,
    children: 'This is a long paragraph that is intended to span multiple lines. With the lineClamp prop set to 2, this text should be visible for only the first two lines, and then it should be truncated with an ellipsis. This is very useful for cards or preview text where vertical space is limited.',
  },
  render: (args) => (
      <div style={{ width: '300px', border: '1px solid #ccc', padding: '1rem' }}>
        <Typography {...args} />
      </div>
  ),
};

export const Polymorphic: Story = {
  args: {
    variant: 'h1',
    as: 'h3',
    children: 'Visual H1, Semantic H3',
  },
  parameters: {
      docs: {
          description: {
              story: 'Using the `as` prop to change the semantic HTML element while keeping the visual style. Inspect element to verify it renders as an `h3`.'
          }
      }
  }
};
