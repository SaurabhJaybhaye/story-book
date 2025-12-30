import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'filled', 'card'],
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['left', 'right', 'top'],
    },
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    label: 'Radio Option',
    value: 'option1',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Radio {...args} size="sm" label="Small" />
      <Radio {...args} size="md" label="Medium" />
      <Radio {...args} size="lg" label="Large" />
    </div>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Radio {...args} variant="default" label="Default Variant" />
      <Radio {...args} variant="outlined" label="Outlined Variant" />
      <Radio {...args} variant="filled" label="Filled Variant" />
      <Radio {...args} variant="card" label="Card Variant" />
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Radio {...args} label="Unchecked" />
      <Radio {...args} checked readOnly label="Checked (Read Only)" />
      <Radio {...args} disabled label="Disabled" />
      <Radio {...args} checked disabled label="Checked Disabled" />
      <Radio {...args} error="Error message" label="Error State" />
    </div>
  ),
};

export const LabelPositions: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <Radio {...args} labelPosition="right" label="Right (Default)" />
      <Radio {...args} labelPosition="left" label="Left" />
      <Radio {...args} labelPosition="top" label="Top" />
    </div>
  ),
};

// --- Radio Group Stories ---

type GroupStory = StoryObj<typeof RadioGroup>;

export const GroupVertical: GroupStory = {
  render: (args) => (
    <RadioGroup {...args} name="group-vertical" defaultValue="option1" label="Vertical Group">
      <Radio value="option1" label="Option 1" />
      <Radio value="option2" label="Option 2" />
      <Radio value="option3" label="Option 3" />
    </RadioGroup>
  ),
};

export const GroupHorizontal: GroupStory = {
  render: (args) => (
    <RadioGroup {...args} name="group-horizontal" orientation="horizontal" defaultValue="option1" label="Horizontal Group">
      <Radio value="option1" label="Option 1" />
      <Radio value="option2" label="Option 2" />
      <Radio value="option3" label="Option 3" />
    </RadioGroup>
  ),
};

export const GroupWithHelperText: GroupStory = {
  render: (args) => (
    <RadioGroup 
      {...args} 
      name="group-helper" 
      label="Choose your plan" 
      helperText="Select the best plan for you."
    >
      <Radio value="basic" label="Basic" helperText="Good for starters" />
      <Radio value="pro" label="Pro" helperText="Best for power users" />
      <Radio value="enterprise" label="Enterprise" helperText="For large teams" />
    </RadioGroup>
  ),
};

export const CardGroup: GroupStory = {
  render: (args) => (
    <RadioGroup 
      {...args} 
      name="card-group" 
      variant="card" 
      orientation="horizontal" 
      label="Select Payment Method"
      style={{ gap: '1rem' }}
    >
      <Radio value="credit" label="Credit Card" />
      <Radio value="paypal" label="PayPal" />
      <Radio value="bank" label="Bank Transfer" />
    </RadioGroup>
  ),
};

export const ControlledGroup: GroupStory = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = React.useState('option1');
    return (
      <div>
        <div style={{ marginBottom: '1rem' }}>Selected Value: <strong>{value}</strong></div>
        <RadioGroup value={value} onChange={(_, v) => setValue(v)} name="controlled-group">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
          <Radio value="option3" label="Option 3" />
        </RadioGroup>
      </div>
    );
  }
};
import React from 'react';
