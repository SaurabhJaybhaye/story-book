import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { AccordionItem } from './AccordionItem';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  subcomponents: { AccordionItem } as any,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['single', 'multiple'],
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'bordered', 'ghost'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    collapsible: {
      control: 'boolean',
    },
    disabled: {
        control: 'boolean',
    }
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1" header="Is it accessible?">
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionItem>
      <AccordionItem value="item-2" header="Is it styled?">
        Yes. It comes with default styles that matches the other components' aesthetic.
      </AccordionItem>
      <AccordionItem value="item-3" header="Is it animated?">
        Yes. It's animated by default, but you can disable it if you prefer.
      </AccordionItem>
    </Accordion>
  ),
};

export const Outlined: Story = {
    args: {
        ...Default.args,
        variant: 'outlined',
    },
    render: Default.render,
};


export const Bordered: Story = {
    args: {
        ...Default.args,
        variant: 'bordered',
    },
    render: Default.render,
};

export const Ghost: Story = {
    args: {
        ...Default.args,
        variant: 'ghost',
    },
    render: Default.render,
};


export const Multiple: Story = {
  args: {
    type: 'multiple',
    variant: 'bordered',
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1" header="Item 1" subHeader="Can be open">
        Content for item 1.
      </AccordionItem>
      <AccordionItem value="item-2" header="Item 2" subHeader="Can also be open">
        Content for item 2.
      </AccordionItem>
      <AccordionItem value="item-3" header="Item 3" subHeader="Independent">
        Content for item 3.
      </AccordionItem>
    </Accordion>
  ),
};

export const WithIconLeft: Story = {
    args: {
        variant: 'outlined',
    },
    render: (args) => (
      <Accordion {...args}>
        <AccordionItem value="item-1" header="Left Icon Item" iconPosition="left">
          The chevron is on the left side now.
        </AccordionItem>
        <AccordionItem value="item-2" header="Another Item" iconPosition="left">
          Consistent alignment.
        </AccordionItem>
      </Accordion>
    ),
  };
  
export const DisabledItem: Story = {
    render: (args) => (
        <Accordion {...args}>
          <AccordionItem value="item-1" header="Enabled Item">
            This one works fine.
          </AccordionItem>
          <AccordionItem value="item-2" header="Disabled Item" disabled>
            You cannot open this one.
          </AccordionItem>
          <AccordionItem value="item-3" header="Another Enabled Item">
             Middle one was disabled.
          </AccordionItem>
        </Accordion>
      ),
};
