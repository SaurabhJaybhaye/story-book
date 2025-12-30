import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'radio',
      options: ['date', 'month'],
    },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    clearable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

const ControlledDatePicker = (args: any) => {
  const [date, setDate] = useState<Date | null>(args.value || null);
  return (
    <DatePicker 
        {...args} 
        value={date} 
        onChange={setDate} 
    />
  );
};

export const Default: Story = {
  render: (args) => <div style={{ minHeight: '400px' }}><ControlledDatePicker {...args} /></div>,
  args: {
    placeholder: 'Select a date',
  },
};

export const MonthPicker: Story = {
    render: (args) => <div style={{ minHeight: '400px' }}><ControlledDatePicker {...args} /></div>,
    args: {
      mode: 'month',
      format: 'MMMM yyyy', 
      placeholder: 'Select month',
    },
};

export const WithMinMax: Story = {
    render: (args) => <div style={{ minHeight: '400px' }}><ControlledDatePicker {...args} /></div>,
    args: {
      minDate: new Date(),
      maxDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
      placeholder: 'Next 3 months only',
    },
};

export const Disabled: Story = {
    render: (args) => <div style={{ minHeight: '400px' }}><ControlledDatePicker {...args} /></div>,
    args: {
      disabled: true,
      defaultValue: new Date(),
    },
};

export const WithError: Story = {
    render: (args) => <div style={{ minHeight: '400px' }}><ControlledDatePicker {...args} /></div>,
    args: {
        placeholder: 'Select a date',
        error: 'Invalid selection',
    },
};
