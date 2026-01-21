import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FileSelector } from './FileSelector';
import type { ExtendedFile } from './FileSelector.types';

const meta: Meta<typeof FileSelector> = {
  title: 'Form/FileSelector',
  component: FileSelector,
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'radio',
      options: ['list', 'grid'],
    },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    dragAndDrop: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FileSelector>;

export const Default: Story = {
  args: {
    label: 'Upload ID Document',
    helperText: 'PNG, JPG up to 10MB',
  },
};

export const MultipleFiles: Story = {
  args: {
    multiple: true,
    label: 'Upload Gallery Images',
    helperText: 'Drag multiple images here',
  },
};

export const GridView: Story = {
  args: {
    multiple: true,
    layout: 'grid',
    label: 'Grid Layout Upload',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Upload Disabled',
  },
};

// Simulation Story for Uploading State
const UploadingSimulation = (args: any) => {
    const [files, setFiles] = useState<ExtendedFile[]>([]);

    const handleFilesChange = (newFiles: ExtendedFile[]) => {
        // Initialize new files as uploading
        const filesWithStatus = newFiles.map(f => {
            if (f.status === 'idle') {
                return { ...f, status: 'uploading' as const, progress: 0 };
            }
            return f;
        });
        setFiles(filesWithStatus);

        // Simulate progress for new files
        filesWithStatus.forEach(file => {
            if (file.status === 'uploading') {
                let progress = 0;
                const interval = setInterval(() => {
                    progress += 10;
                    if (progress > 100) {
                        clearInterval(interval);
                        setFiles(prev => prev.map(p => p.id === file.id ? { ...p, status: 'success', progress: 100 } : p));
                    } else {
                        setFiles(prev => prev.map(p => p.id === file.id ? { ...p, progress } : p));
                    }
                }, 500);
            }
        });
    };

    return (
        <FileSelector 
            {...args} 
            value={files} 
            onChange={handleFilesChange}
            multiple 
            label="Upload with Simulation"
            helperText="Files will simulate upload info"
        />
    );
};

export const UploadingState: Story = {
    render: (args) => <UploadingSimulation {...args} />
};

export const MaxSizeError: Story = {
    args: {
        maxFileSize: 1024, // 1KB
        label: 'Tiny Files Only (Max 1KB)',
        helperText: 'Upload a large file to see validation error',
    },
};

export const MaxFilesLimit: Story = {
    args: {
        maxFiles: 2,
        multiple: true,
        label: 'Limit 2 Files',
    },
};

// Mock Files for Pre-filled states
const mockFile = new File(["foo"], "example.txt", { type: "text/plain" });
const mockImage = new File(["foo"], "funny-cat.png", { type: "image/png" });

const preFilledFiles: ExtendedFile[] = [
    { file: mockFile, id: '1', status: 'success', progress: 100 },
    { file: mockImage, id: '2', status: 'error', error: 'Upload failed', progress: 50 },
    { file: mockFile, id: '3', status: 'uploading', progress: 45 },
];

export const PreFilledState: Story = {
    args: {
        defaultValue: preFilledFiles,
        multiple: true,
        label: 'Existing Files',
    },
};
