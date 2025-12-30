import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Drawer } from './Drawer';
import { DrawerHeader, DrawerBody, DrawerFooter } from './DrawerSubcomponents';
import { Button } from '../Button'; // Assuming Button component exists

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  subcomponents: { DrawerHeader, DrawerBody, DrawerFooter } as any,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    overlay: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// Wrapper for controlled state in stories
const DrawerWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ padding: '2rem' }}>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <Drawer {...args} open={isOpen} onClose={() => setIsOpen(false)}>
        <DrawerHeader onClose={() => setIsOpen(false)}>
            Drawer Title
        </DrawerHeader>
        <DrawerBody>
          <p>Some content inside the drawer.</p>
          <p>You can put anything here.</p>
          {Array.from({ length: 20 }).map((_, i) => (
             <p key={i}>Scrollable content line {i + 1}</p>
          ))}
        </DrawerBody>
        <DrawerFooter>
           <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
           <Button onClick={() => setIsOpen(false)}>Confirm</Button>
        </DrawerFooter>
      </Drawer>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    placement: 'right',
    size: 'md',
  },
};

export const LeftPlacement: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    placement: 'left',
    size: 'sm',
  },
};

export const TopPlacement: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    placement: 'top',
    size: 'md', // Height
  },
};

export const BottomPlacement: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    placement: 'bottom',
    size: 'md', // Height
  },
};

export const CustomSize: Story = {
    render: (args) => <DrawerWrapper {...args} />,
    args: {
        placement: 'right',
        size: '600px',
    },
};
