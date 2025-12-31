import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { Button } from '../Button'; // Assuming we have Button

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  subcomponents: { ModalHeader, ModalBody, ModalFooter } as any,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    open: { control: 'boolean' },
    closeOnOverlayClick: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal 
        {...args} 
        open={isOpen} 
        onOpenChange={setIsOpen} 
        onClose={() => setIsOpen(false)}
      >
         <ModalHeader>Modal Title</ModalHeader>
         <ModalBody>
            <p>This is the modal body content.</p>
            <p>You can put any content here.</p>
         </ModalBody>
         <ModalFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
         </ModalFooter>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    size: 'md',
  },
};

export const Small: Story = {
    render: (args) => <ModalWrapper {...args} />,
    args: {
      size: 'sm',
    },
};

export const Large: Story = {
    render: (args) => <ModalWrapper {...args} />,
    args: {
      size: 'lg',
    },
};

export const FullScreen: Story = {
    render: (args) => <ModalWrapper {...args} />,
    args: {
      size: 'full',
    },
};

const LongContentWrapper = (args: any) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Long Scroll Modal</Button>
        <Modal 
          {...args} 
          open={isOpen} 
          onOpenChange={setIsOpen}
        >
           <ModalHeader>Terms and Conditions</ModalHeader>
           <ModalBody>
              {Array.from({ length: 20 }).map((_, i) => (
                 <p key={i} style={{ marginBottom: '1rem' }}>
                    Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                 </p>
              ))}
           </ModalBody>
           <ModalFooter>
              <Button onClick={() => setIsOpen(false)}>I Agree</Button>
           </ModalFooter>
        </Modal>
      </>
    );
  };

export const LongContent: Story = {
    render: (args) => <LongContentWrapper {...args} />,
    args: {
      size: 'md',
    },
};

const NestedModalsWrapper = (props: any) => {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen1(true)}>Open First Modal</Button>
            <Modal {...props} open={open1} onOpenChange={setOpen1} size="lg">
                <ModalHeader>First Level Modal</ModalHeader>
                <ModalBody>
                    <p>This is the first modal.</p>
                    <Button onClick={() => setOpen2(true)}>Open Nested Modal</Button>
                </ModalBody>
                <ModalFooter>
                    <Button variant="outline" onClick={() => setOpen1(false)}>Close First</Button>
                </ModalFooter>

                {/* Nested Modal */}
                <Modal open={open2} onOpenChange={setOpen2} size="sm">
                    <ModalHeader>Nested Modal</ModalHeader>
                    <ModalBody>
                        <p>I am on top of the first modal!</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => setOpen2(false)}>Close Nested</Button>
                    </ModalFooter>
                </Modal>
            </Modal>
        </>
    )
}

export const NestedModals: Story = {
    render: (args) => <NestedModalsWrapper {...args} />
}
