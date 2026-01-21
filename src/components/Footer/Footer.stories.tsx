import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';
import { ThemeProvider } from '../../theme/ThemeProvider';

const meta: Meta<typeof Footer> = {
  title: 'Layout/Footer',
  component: Footer,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['simple', 'multi-column'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Simple: Story = {
  args: {
    variant: 'simple',
    children: (
      <>
        <Footer.Brand name="Acme Corp" />
        <Footer.Copyright by="Acme Inc." />
      </>
    ),
  },
};

export const WithSocialLinks: Story = {
  args: {
    variant: 'simple',
    children: (
      <>
        <Footer.Brand name="Acme Corp" />
        <Footer.Social>
          <Footer.Link href="#">Twitter</Footer.Link>
          <Footer.Link href="#">GitHub</Footer.Link>
          <Footer.Link href="#">LinkedIn</Footer.Link>
        </Footer.Social>
        <Footer.Copyright by="Acme Inc." />
      </>
    ),
  },
};

export const MultiColumn: Story = {
  args: {
    variant: 'multi-column',
    children: (
      <>
        <Footer.Content>
          <Footer.Section>
            <Footer.Brand name="Acme Corp" />
            <p style={{ maxWidth: '300px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Making the world a better place through constructing elegant hierarchies.
            </p>
          </Footer.Section>

          <Footer.Section title="Product">
            <Footer.Link href="#">Features</Footer.Link>
            <Footer.Link href="#">Integrations</Footer.Link>
            <Footer.Link href="#">Pricing</Footer.Link>
            <Footer.Link href="#">Changelog</Footer.Link>
          </Footer.Section>

          <Footer.Section title="Company">
            <Footer.Link href="#">About Us</Footer.Link>
            <Footer.Link href="#">Careers</Footer.Link>
            <Footer.Link href="#">Blog</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.Section>

          <Footer.Section title="Legal">
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Terms of Service</Footer.Link>
            <Footer.Link href="#">Cookie Policy</Footer.Link>
          </Footer.Section>
        </Footer.Content>
        
        <Footer.Copyright by="Acme Inc." />
      </>
    ),
  },
};

export const DarkMode: Story = {
  args: {
    variant: 'multi-column',
    children: (
      <>
        <Footer.Content>
          <Footer.Section>
            <Footer.Brand name="Acme Corp" />
            <p style={{ maxWidth: '300px', fontSize: '0.9rem', color: '#ccc' }}>
              Making the world a better place through constructing elegant hierarchies.
            </p>
          </Footer.Section>

          <Footer.Section title="Product">
            <Footer.Link href="#">Features</Footer.Link>
            <Footer.Link href="#">Integrations</Footer.Link>
            <Footer.Link href="#">Pricing</Footer.Link>
          </Footer.Section>

          <Footer.Section title="Company">
            <Footer.Link href="#">About Us</Footer.Link>
            <Footer.Link href="#">Careers</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.Section>
        </Footer.Content>
        
        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Footer.Copyright by="Acme Inc." />
          <Footer.Social>
            <Footer.Link href="#">Twitter</Footer.Link>
            <Footer.Link href="#">GitHub</Footer.Link>
          </Footer.Social>
        </div>
      </>
    ),
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <ThemeProvider initialTheme="dark">
        <Story />
      </ThemeProvider>
    ),
  ],
};
