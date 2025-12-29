import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input.tsx';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'underlined', 'ghost'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    success: { control: 'text' },
    fullWidth: { control: 'boolean' },
    helperText: { control: 'text' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// --- VARIANTS ---

export const Outlined: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'john@example.com',
    variant: 'outlined',
  },
};

export const Filled: Story = {
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    variant: 'filled',
  },
};

export const Underlined: Story = {
  args: {
    label: 'Subject',
    placeholder: 'Enter subject',
    variant: 'underlined',
  },
};

export const Ghost: Story = {
  args: {
    label: 'Search',
    placeholder: 'Type to search...',
    variant: 'ghost',
    startIcon: <span>🔍</span>,
  },
};

// --- STATES ---

export const ErrorState: Story = {
  args: {
    label: 'Password',
    type: 'password',
    variant: 'outlined',
    error: 'Password is too short',
    defaultValue: '123',
  },
};

export const SuccessState: Story = {
  args: {
    label: 'Username',
    variant: 'outlined',
    success: 'Username available!',
    defaultValue: 'saurabh_dev',
  },
};

export const Disabled: Story = {
  args: {
    label: 'License Key',
    disabled: true,
    defaultValue: 'XXXX-XXXX-XXXX-XXXX',
  },
};

// --- FEATURES ---

export const WithIcons: Story = {
  args: {
    label: 'Website',
    startIcon: <span>🌐</span>,
    endIcon: <span>🔗</span>,
    placeholder: 'www.example.com',
  },
};

export const PasswordToggle: Story = {
  render: (args) => <Input {...args} />,
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
};

export const Clearable: Story = {
  render: (args) => {
    const [val, setVal] = useState('Clear me');
    return (
        <Input 
            {...args} 
            value={val} 
            onChange={(e) => setVal(e.target.value)} 
            onClear={() => setVal('')} 
        />
    );
  },
  args: {
    label: 'Search Query',
    clearable: true,
  },
};

export const CharacterCount: Story = {
  args: {
    label: 'Bio',
    maxLength: 50,
    showCount: true,
    placeholder: 'Tell us about yourself',
    fullWidth: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Input',
    fullWidth: true,
    placeholder: 'I span the whole container',
  },
};
