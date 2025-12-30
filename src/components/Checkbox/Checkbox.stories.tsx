import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox.tsx';
import { useState, useEffect } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    labelPosition: {
      control: 'radio',
      options: ['right', 'left', 'top'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled'],
    },
    label: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// --- CORE EXAMPLES ---

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'Subscribe to newsletter',
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all items',
    indeterminate: true,
    checked: true, // Visually it doesn't matter as indeterminate overrides, but logically often true or false
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox size="sm" label="Small Checkbox" defaultChecked />
      <Checkbox size="md" label="Medium Checkbox (Default)" defaultChecked />
      <Checkbox size="lg" label="Large Checkbox" defaultChecked />
    </div>
  ),
};

// --- STATES ---

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox disabled label="Disabled Unchecked" />
      <Checkbox disabled checked label="Disabled Checked" />
      <Checkbox disabled indeterminate label="Disabled Indeterminate" />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    label: 'I agree to the policy',
    error: 'You must agree to the policy to continue',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Enable Notifications',
    helperText: 'We will send you emails about new features.',
    defaultChecked: true,
  },
};

// --- LAYOUTS ---

export const LabelPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '300px' }}>
      <Checkbox label="Label Right (Default)" labelPosition="right" defaultChecked />
      <Checkbox label="Label Left" labelPosition="left" defaultChecked />
      
      <div style={{ padding: '10px', border: '1px solid #eee' }}>
        <Checkbox label="Label Top (Stacked)" labelPosition="top" helperText="Description goes here check." defaultChecked />
      </div>
    </div>
  ),
};

export const CustomLabel: Story = {
  args: {
    label: (
      <span>
        I agree to the <a href="#" style={{ color: 'blue', textDecoration: 'underline' }}>Terms of Service</a>
      </span>
    ),
  },
};

// --- INTERACTIVE EXAMPLES ---

export const CheckboxGroup: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>(['react']);

    const handleChange = (value: string) => {
      setValues(prev => 
        prev.includes(value) 
          ? prev.filter(v => v !== value) 
          : [...prev, value]
      );
    };

    return (
      <div>
        <h4 style={{ marginBottom: '0.5rem', fontFamily: 'sans-serif' }}>Select Frameworks:</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Checkbox 
            label="React" 
            checked={values.includes('react')} 
            onChange={() => handleChange('react')}
          />
          <Checkbox 
            label="Vue" 
            checked={values.includes('vue')} 
            onChange={() => handleChange('vue')}
          />
          <Checkbox 
            label="Angular" 
            checked={values.includes('angular')} 
            onChange={() => handleChange('angular')}
          />
          <Checkbox 
            label="Svelte" 
            checked={values.includes('svelte')} 
            onChange={() => handleChange('svelte')}
          />
        </div>
        <pre style={{ marginTop: '1rem', padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px' }}>
          Selected: {JSON.stringify(values, null, 2)}
        </pre>
      </div>
    );
  },
};

export const SelectAllExample: Story = {
  render: () => {
    // 0: unchecked, 1: checked
    const items = ['Apple', 'Banana', 'Cherry', 'Date'];
    const [selected, setSelected] = useState<string[]>(['Apple', 'Banana']);

    const allSelected = items.length > 0 && selected.length === items.length;
    const isIndeterminate = selected.length > 0 && selected.length < items.length;

    const handleSelectAll = () => {
      if (allSelected || isIndeterminate) {
        setSelected([]); // Clear all
      } else {
        setSelected([...items]); // Select all
      }
    };

    const handleToggle = (item: string) => {
      setSelected(prev => 
        prev.includes(item) 
          ? prev.filter(i => i !== item) 
          : [...prev, item]
      );
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '300px' }}>
        <Checkbox
          label="Select All Fruits"
          checked={allSelected}
          indeterminate={isIndeterminate}
          onChange={handleSelectAll}
          style={{ paddingBottom: '0.5rem', borderBottom: '1px solid #eee' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.5rem', paddingTop: '0.5rem' }}>
          {items.map(item => (
            <Checkbox
              key={item}
              label={item}
              checked={selected.includes(item)}
              onChange={() => handleToggle(item)}
              size="sm"
            />
          ))}
        </div>
      </div>
    );
  },
};
