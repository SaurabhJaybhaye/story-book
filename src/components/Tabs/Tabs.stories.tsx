import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs } from './Tabs';
import { TabList } from './TabList';
import { Tab } from './Tab';
import { TabPanel } from './TabPanel';
import { Button } from '../Button'; // Example content

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  subcomponents: { TabList, Tab, TabPanel } as any,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'underline', 'pill', 'segmented'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    orientation: {
        control: 'select',
        options: ['horizontal', 'vertical']
    },
    activationMode: {
        control: 'radio',
        options: ['manual', 'automatic']
    }
  },
  args: {
      defaultValue: 'account'
  }
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab value="account">Account</Tab>
        <Tab value="password">Password</Tab>
        <Tab value="settings">Settings</Tab>
      </TabList>
      <TabPanel value="account">
         <h3>Account Settings</h3>
         <p>Make changes to your account here.</p>
         <Button>Save changes</Button>
      </TabPanel>
      <TabPanel value="password">
         <h3>Password</h3>
         <p>Change your password here.</p>
      </TabPanel>
      <TabPanel value="settings">
         <h3>Preferences</h3>
         <p>Adjust your preferences.</p>
      </TabPanel>
    </Tabs>
  ),
};

export const Underline: Story = {
    args: {
        variant: 'underline',
        defaultValue: 'tabs'
    },
    render: (args) => (
        <Tabs {...args}>
        <TabList>
          <Tab value="tabs">Tabs</Tab>
          <Tab value="pills">Pills</Tab>
          <Tab value="links">Links</Tab>
        </TabList>
        <TabPanel value="tabs">Tabs Content</TabPanel>
        <TabPanel value="pills">Pills Content</TabPanel>
        <TabPanel value="links">Links Content</TabPanel>
      </Tabs>
    )
};

export const Pill: Story = {
    args: {
        variant: 'pill',
        defaultValue: 'music'
    },
    render: (args) => (
        <Tabs {...args}>
        <TabList>
          <Tab value="music">Music</Tab>
          <Tab value="podcasts">Podcasts</Tab>
          <Tab value="live">Live</Tab>
        </TabList>
        <TabPanel value="music">Music List</TabPanel>
        <TabPanel value="podcasts">Podcast List</TabPanel>
        <TabPanel value="live">Live Events</TabPanel>
      </Tabs>
    )
};

export const Segmented: Story = {
    args: {
        variant: 'segmented',
        defaultValue: 'day'
    },
    render: (args) => (
        <div style={{ padding: '2rem', backgroundColor: '#f9fafb' }}>
            <Tabs {...args}>
                <TabList>
                <Tab value="day">Day</Tab>
                <Tab value="week">Week</Tab>
                <Tab value="month">Month</Tab>
                <Tab value="year">Year</Tab>
                </TabList>
                <TabPanel value="day">Daily View</TabPanel>
                <TabPanel value="week">Weekly View</TabPanel>
                <TabPanel value="month">Monthly View</TabPanel>
                <TabPanel value="year">Yearly View</TabPanel>
            </Tabs>
        </div>
    )
};

export const Vertical: Story = {
    args: {
        orientation: 'vertical',
        defaultValue: 'profile'
    },
    render: (args) => (
        <Tabs {...args} style={{ height: '300px' }}>
            <TabList style={{ width: '200px' }}>
                <Tab value="profile">Profile</Tab>
                <Tab value="notifications">Notifications</Tab>
                <Tab value="security">Security</Tab>
                <Tab value="billing">Billing</Tab>
            </TabList>
            <TabPanel value="profile">Profile Settings...</TabPanel>
            <TabPanel value="notifications">Notification Preferences...</TabPanel>
            <TabPanel value="security">Security Settings...</TabPanel>
            <TabPanel value="billing">Billing Information...</TabPanel>
        </Tabs>
    )
};

export const WithIcons: Story = {
    render: (args) => (
        <Tabs {...args} defaultValue="home">
            <TabList>
                <Tab value="home" icon={<span>🏠</span>}>Home</Tab>
                <Tab value="favorites" icon={<span>⭐</span>}>Favorites</Tab>
                <Tab value="search" icon={<span>🔍</span>}>Search</Tab>
            </TabList>
            <TabPanel value="home">Home Content</TabPanel>
            <TabPanel value="favorites">Favorites Content</TabPanel>
            <TabPanel value="search">Search Content</TabPanel>
        </Tabs>
    )
};

export const Controlled = () => {
    const [active, setActive] = useState('first');
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p>Active Tab: <strong>{active}</strong></p>
            <Tabs value={active} onValueChange={setActive}>
                <TabList>
                    <Tab value="first">First Tab</Tab>
                    <Tab value="second">Second Tab</Tab>
                    <Tab value="third">Third Tab</Tab>
                </TabList>
                <TabPanel value="first">First Content</TabPanel>
                <TabPanel value="second">Second Content</TabPanel>
                <TabPanel value="third">Third Content</TabPanel>
            </Tabs>
            <Button onClick={() => setActive('second')}>Switch to Second</Button>
        </div>
    );
};

export const Scrollable: Story = {
    args: {
        defaultValue: 'tab-1'
    },
    render: (args) => (
        <div style={{ maxWidth: '400px', border: '1px solid #eee' }}>
            <Tabs {...args}>
                <TabList scrollable>
                    {Array.from({ length: 20 }).map((_, i) => (
                        <Tab key={i} value={`tab-${i}`}>Tab {i + 1}</Tab>
                    ))}
                </TabList>
                {Array.from({ length: 20 }).map((_, i) => (
                    <TabPanel key={i} value={`tab-${i}`}>Content for Tab {i + 1}</TabPanel>
                ))}
            </Tabs>
        </div>
    )
};

export const DisabledTabs: Story = {
    render: (args) => (
        <Tabs {...args} defaultValue="1">
            <TabList>
                <Tab value="1">Enabled</Tab>
                <Tab value="2" disabled>Disabled</Tab>
                <Tab value="3">Enabled</Tab>
            </TabList>
            <TabPanel value="1">Content 1</TabPanel>
            <TabPanel value="2">Content 2</TabPanel>
            <TabPanel value="3">Content 3</TabPanel>
        </Tabs>
    )
};
