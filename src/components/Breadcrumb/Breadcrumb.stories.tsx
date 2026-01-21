import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbSeparator } from './BreadcrumbSeparator';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  subcomponents: { BreadcrumbItem: BreadcrumbItem as any, BreadcrumbSeparator: BreadcrumbSeparator as any },
  tags: ['autodocs'],
  argTypes: {
    separator: { control: 'text' },
    maxItems: { control: 'number' },
    itemsBeforeCollapse: { control: 'number' },
    itemsAfterCollapse: { control: 'number' },
  },
  args: {
      items: [
          { label: 'Home', href: '/' },
          { label: 'Components', href: '/components' },
          { label: 'Breadcrumb', href: '/components/breadcrumb' },
      ]
  }
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {};

export const WithIcons: Story = {
    args: {
        items: [
            { label: 'Home', href: '/', icon: <span>🏠</span> },
            { label: 'Files', href: '/files', icon: <span>📂</span> },
            { label: 'Settings', href: '/files/settings', icon: <span>⚙️</span> },
        ]
    }
};

export const CustomSeparator: Story = {
    args: {
        separator: '>',
        items: [
            { label: 'Home', href: '/' },
            { label: 'Category', href: '/category' },
            { label: 'Product', href: '/category/product' },
        ]
    }
};

export const Collapsed: Story = {
    args: {
        maxItems: 3,
        items: [
            { label: 'Home', href: '/' },
            { label: 'Level 1', href: '/1' },
            { label: 'Level 2', href: '/2' },
            { label: 'Level 3', href: '/3' },
            { label: 'Level 4', href: '/4' },
            { label: 'Current', href: '/current' },
        ]
    }
};

export const Composition: Story = {
    render: () => (
        <Breadcrumb separator=">">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>API Reference</BreadcrumbItem>
        </Breadcrumb>
    )
};

export const DisabledItem: Story = {
    args: {
        items: [
            { label: 'Home', href: '/' },
            { label: 'Restricted', href: '/restricted', disabled: true },
            { label: 'Current', href: '/current' },
        ]
    }
};
