import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button'; // Assuming we have Button

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top', 'top-start', 'top-end', 
        'right', 'right-start', 'right-end', 
        'bottom', 'bottom-start', 'bottom-end', 
        'left', 'left-start', 'left-end'
      ],
    },
    trigger: {
      control: 'check',
      options: ['hover', 'focus', 'click'],
    },
    openDelay: { control: 'number' },
    closeDelay: { control: 'number' },
    maxWidth: { control: 'text' },
    arrow: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    content: 'This is a tooltip',
    placement: 'top',
    trigger: ['hover', 'focus'],
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <div style={{ padding: '100px', display: 'flex', justifyContent: 'center' }}>
        <Tooltip {...args}>
            <Button>Hover Me</Button>
        </Tooltip>
    </div>
  ),
};

export const Placements: Story = {
    render: () => (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', padding: '100px', placeItems: 'center' }}>
          <div>{/* Empty Top Left */}</div>
          <Tooltip content="Tooltip Top" placement="top">
              <Button size="sm">Top</Button>
          </Tooltip>
          <div>{/* Empty Top Right */}</div>

          <Tooltip content="Tooltip Left" placement="left">
              <Button size="sm">Left</Button>
          </Tooltip>
          <div>{/* Center */}</div>
          <Tooltip content="Tooltip Right" placement="right">
              <Button size="sm">Right</Button>
          </Tooltip>
          
          <div>{/* Empty Bottom Left */}</div>
          <Tooltip content="Tooltip Bottom" placement="bottom">
              <Button size="sm">Bottom</Button>
          </Tooltip>
          <div>{/* Empty Bottom Right */}</div>
      </div>
    ),
};

export const Triggers: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '2rem', padding: '50px' }}>
            <Tooltip content="I appear on hover!" trigger="hover">
                <Button>Hover Only</Button>
            </Tooltip>
            <Tooltip content="I appear on focus!" trigger="focus">
                <input type="text" placeholder="Focus me" style={{ padding: '0.5rem' }} />
            </Tooltip>
            <Tooltip content="I appear on click!" trigger="click">
                <Button variant="outline">Click Me (Toggle)</Button>
            </Tooltip>
        </div>
    )
}

export const LongContent: Story = {
    args: {
        content: <span style={{ textAlign: 'left', display: 'block' }}>This is a much longer tooltip that demonstrates how text wrapping works. It should be constrained by the max-width and wrap nicely.</span>,
        maxWidth: 200,
    },
    render: (args) => (
        <div style={{ padding: '100px' }}>
            <Tooltip {...args}>
                <Button>Long Content</Button>
            </Tooltip>
        </div>
    )
}

export const RichContent: Story = {
    args: {
        content: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <strong style={{ fontSize: '1.2em' }}>Rich Content</strong>
                <span>You can put <em>anything</em> here.</span>
                <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                     <span style={{ fontSize: '16px' }}>🚀</span>
                     <span style={{ fontSize: '16px' }}>⭐</span>
                </div>
            </div>
        ),
    },
    render: (args) => (
        <div style={{ padding: '100px' }}>
            <Tooltip {...args}>
                <Button>Rich Content</Button>
            </Tooltip>
        </div>
    )
}

export const DisabledElement: Story = {
    render: () => (
        <div style={{ padding: '100px' }}>
             <Tooltip content="Even disabled buttons can show tooltips if wrapped properly!">
                 {/* Note: Disabled elements don't fire mouse events in some browsers. common fix is wrapping in a span */}
                 <span style={{ display: 'inline-block', cursor: 'not-allowed' }}>
                     <Button disabled>Disabled Button</Button>
                 </span>
             </Tooltip>
        </div>
    )
}
