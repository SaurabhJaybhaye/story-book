import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { Button } from '../Button/Button';

const meta: Meta<typeof Navbar> = {
  title: 'Layout/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="6" fill="#0066FF"/>
    <path d="M16 8L24 24H8L16 8Z" fill="white"/>
  </svg>
);

export const TopNavigation: Story = {
  render: (args) => (
    <Navbar {...args}>
      <Navbar.Brand logo={<Logo />} name="SBDS" href="#" />
      
      <Navbar.Toggle />

      <Navbar.Menu>
        <Navbar.Content align="left">
          <Navbar.Item href="#" active>Dashboard</Navbar.Item>
          <Navbar.Item href="#">Projects</Navbar.Item>
          <Navbar.Item href="#">Team</Navbar.Item>
          <Navbar.Item href="#">Settings</Navbar.Item>
        </Navbar.Content>
        
        <Navbar.Content align="right">
          <Button variant="ghost" size="sm" label="Sign In" />
          <Button variant="primary" size="sm" label="Get Started" />
        </Navbar.Content>
      </Navbar.Menu>
    </Navbar>
  ),
  args: {
    variant: 'top',
    position: 'sticky',
  },
};

export const SideNavigation: Story = {
  render: (args) => (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5' }}>
      <Navbar {...args}>
        <Navbar.Brand logo={<Logo />} name="SBDS" />
        
        <Navbar.Content>
          <Navbar.Item active icon={<span>🏠</span>}>Home</Navbar.Item>
          <Navbar.Item icon={<span>📊</span>}>Analytics</Navbar.Item>
          <Navbar.Item icon={<span>📁</span>}>Files</Navbar.Item>
          <Navbar.Item icon={<span>💬</span>}>Messages</Navbar.Item>
        </Navbar.Content>

        <div style={{ marginTop: 'auto', width: '100%' }}>
            <Navbar.Content>
                <Navbar.Item icon={<span>⚙️</span>}>Settings</Navbar.Item>
                <Navbar.Item icon={<span>🚪</span>}>Logout</Navbar.Item>
            </Navbar.Content>
        </div>
      </Navbar>
      
      <main style={{ padding: '2rem', flex: 1 }}>
        <h1>Main Content Area</h1>
        <p>The side navigation stays fixed on the left while this content scrolls.</p>
      </main>
    </div>
  ),
  args: {
    variant: 'side',
  },
};

export const Responsive: Story = {
  render: (args) => (
    <div style={{ height: '200vh' }}>
      <Navbar {...args}>
        <Navbar.Brand logo={<Logo />} name="SBDS" />
        
        <Navbar.Toggle />

        <Navbar.Menu>
          <Navbar.Content>
            <Navbar.Item href="#" active>Home</Navbar.Item>
            <Navbar.Item href="#">Services</Navbar.Item>
            <Navbar.Item href="#">About</Navbar.Item>
            <Navbar.Item href="#">Contact</Navbar.Item>
          </Navbar.Content>
          
          <Navbar.Content align="right">
            <Navbar.Item>Login</Navbar.Item>
            <Navbar.Item>
                 <Button size="sm" variant="primary" label="Sign Up" />
            </Navbar.Item>
          </Navbar.Content>
        </Navbar.Menu>
      </Navbar>
      
      <div style={{ padding: '2rem' }}>
        <h1>Scroll down to see sticky behavior</h1>
        <p>Resize the window to mobile size (below 768px) to see the hamburger menu.</p>
      </div>
    </div>
  ),
  args: {
    variant: 'top',
    position: 'sticky',
  },
};
