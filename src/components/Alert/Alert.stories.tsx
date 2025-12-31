import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { AlertTitle } from './AlertTitle';
import { AlertDescription } from './AlertDescription';
import { useState } from 'react';
import { Button } from '../Button'; // Assuming we have a Button component

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    dismissible: { control: 'boolean' },
    autoClose: { control: 'boolean' },
    autoCloseDelay: { control: 'number' },
  },
  args: {
    children: 'This is an alert message.',
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    variant: 'info',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="info" title="Info">
        This is an info alert.
      </Alert>
      <Alert variant="success" title="Success">
        Operation completed successfully.
      </Alert>
      <Alert variant="warning" title="Warning">
        Please check your input before proceeding.
      </Alert>
      <Alert variant="error" title="Error">
        Something went wrong. Please try again.
      </Alert>
      <Alert variant="neutral" title="Neutral">
        Just a neutral notification.
      </Alert>
    </div>
  ),
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Alert size="sm" title="Small Alert">Small alert content.</Alert>
          <Alert size="md" title="Medium Alert">Medium alert content.</Alert>
          <Alert size="lg" title="Large Alert">Large alert content.</Alert>
        </div>
    )
}

export const Dismissible: Story = {
    render: () => {
        const [show, setShow] = useState(true);
        return (
            <div>
                 {show && (
                     <Alert 
                        dismissible 
                        onClose={() => console.log('Closed')}
                        title="Dismiss Me"
                     >
                        Click the X icon to dismiss this alert. It will fade out.
                     </Alert>
                 )}
                 {!show && <button onClick={() => setShow(true)}>Reset</button>}
            </div>
        )
    }
}

export const AutoDismiss: Story = {
    args: {
        autoClose: true,
        autoCloseDelay: 3000,
        title: 'Auto Dismiss',
        children: 'This alert will disappear in 3 seconds.',
        variant: 'success'
    },
    parameters: {
        docs: {
            description: {
                story: 'Refresh the story to see the effect again.'
            }
        }
    }
}

export const WithActions: Story = {
    render: () => (
        <Alert 
            variant="warning" 
            title="Update Available"
            action={
                <>
                  <Button size="sm" variant="outline" style={{marginRight: '8px'}}>Dismiss</Button>
                  <Button size="sm">Update Now</Button>
                </>
            }
        >
            A new version of the software is available. Please update to continue using all features.
        </Alert>
    )
}

export const RichContent: Story = {
    render: () => (
        <Alert variant="error">
            <AlertTitle>Submission Failed</AlertTitle>
            <AlertDescription>
                We encountered multiple errors while processing your request:
                <ul style={{ margin: '0.5rem 0 0 1.5rem', padding: 0 }}>
                    <li>Username is already taken</li>
                    <li>Password is too weak</li>
                </ul>
            </AlertDescription>
        </Alert>
    )
}

export const CustomIcon: Story = {
    args: {
        icon: <span>🚀</span>,
        title: 'Blast Off!',
        children: 'This alert uses a custom emoji icon.',
        variant: 'neutral'
    }
}

export const NoIcon: Story = {
    args: {
        icon: false,
        title: 'No Icon Alert',
        children: 'This alert has the icon explicitly disabled.',
        variant: 'info'
    }
}

export const ToastPlacement: Story = {
    render: () => {
        const [toasts, setToasts] = useState<Array<{ id: number, placement: any }>>([]);

        const addToast = (placement: any) => {
            const id = Date.now() + Math.random();
            setToasts(prev => [...prev, { id, placement }]);
            // Auto remove after 3 seconds for demo
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, 3000);
        };

        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', padding: '2rem', height: '300px', placeItems: 'center', border: '1px dashed #ccc', position: 'relative' }}>
                <Button size="sm" onClick={() => addToast('top-left')}>Top Left</Button>
                <Button size="sm" onClick={() => addToast('top-center')}>Top Center</Button>
                <Button size="sm" onClick={() => addToast('top-right')}>Top Right</Button>
                
                <Button size="sm" onClick={() => addToast('bottom-left')}>Bottom Left</Button>
                <Button size="sm" onClick={() => addToast('bottom-center')}>Bottom Center</Button>
                <Button size="sm" onClick={() => addToast('bottom-right')}>Bottom Right</Button>

                {toasts.map(t => (
                    <Alert
                        key={t.id}
                        placement={t.placement}
                        variant="info"
                        title="Toast Notification"
                        onClose={() => setToasts(prev => prev.filter(item => item.id !== t.id))}
                        dismissible
                        width="350px"
                        style={{ zIndex: 1100 }}
                    >
                        Fixed alert at {t.placement}.
                    </Alert>
                ))}
            </div>
        );
    }
}

export const CustomDimensions: Story = {
    args: {
        title: 'Custom Size',
        children: 'This alert has a custom width of 500px and height of 150px.',
        width: 500,
        height: 150,
        variant: 'success'
    }
}
