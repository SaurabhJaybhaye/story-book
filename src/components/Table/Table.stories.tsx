import type { Meta, StoryObj } from '@storybook/react';
import type { ColumnDef } from '@tanstack/react-table';
import { Table } from './Table';
// import { Checkbox } from '../Checkbox'; // Assuming Checkbox exists
import React from 'react';
import { Checkbox } from '../Checkbox';
import { Button } from '../Button';


// Mock Data
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

const USERS: User[] = Array.from({ length: 100 }).map((_, i) => ({
  id: String(i + 1),
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? 'Admin' : 'User',
  status: i % 2 === 0 ? 'active' : 'inactive',
  lastLogin: new Date(2024, 0, 1 + i).toLocaleDateString(),
}));

const columns: ColumnDef<User, any>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => (
          <span style={{ 
              color: (info.getValue() as string) === 'active' ? 'green' : 'gray',
              fontWeight: 500 
          }}>
              {info.getValue() as string}
          </span>
      )
  },
  {
    accessorKey: 'lastLogin',
    header: 'Last Login',
  },
];

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'striped', 'bordered', 'compact'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isLoading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    data: USERS.slice(0, 5),
    columns: columns as any,
  },
};

export const Striped: Story = {
  args: {
    data: USERS.slice(0, 5),
    columns: columns as any,
    variant: 'striped',
  },
};

export const Bordered: Story = {
    args: {
      data: USERS.slice(0, 5),
      columns: columns as any,
      variant: 'bordered',
    },
  };

export const Compact: Story = {
    args: {
      data: USERS.slice(0, 5),
      columns: columns as any,
      variant: 'compact',
    },
};

export const WithSorting: Story = {
  args: {
    data: USERS.slice(0, 10),
    columns: columns as any,
    enableSorting: true,
  },
};

export const WithPagination: Story = {
    args: {
      data: USERS,
      columns: columns as any,
      enablePagination: true,
      enableSorting: true,
    },
};



export const WithGlobalSearch: Story = {
    args: {
      data: USERS,
      columns: columns as any,
      enableGlobalFilter: true,
      enablePagination: true, // often goes with larger datasets
    },
};

// Row Selection Helpers with Custom Checkbox
const selectColumns: ColumnDef<User, any>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox 
                checked={table.getIsAllRowsSelected()}
                indeterminate={table.getIsSomeRowsSelected()}
                onChange={table.getToggleAllRowsSelectedHandler()}
            />
        ),
        cell: ({ row }) => (
            <Checkbox 
                checked={row.getIsSelected()}
                onChange={row.getToggleSelectedHandler()}
            />
        ),
        size: 40,
    },
    ...columns
];

export const RowSelection: Story = {
    args: {
        data: USERS.slice(0, 10),
        columns: selectColumns as any,
        enableRowSelection: true,
        enableGlobalFilter: true, // To show toolbar where bulk actions appear
    },
};


export const LoadingParams: Story = {
    args: {
        data: [],
        columns: columns as any,
        isLoading: true,
    },
};

export const Empty: Story = {
    args: {
        data: [],
        columns: columns as any,
    },
};

// Expandable Rows Helper
const expandableColumns: ColumnDef<User, any>[] = [
    {
        id: 'expander',
        header: () => null,
        cell: ({ row }) => (
            <button
                onClick={row.getToggleExpandedHandler()}
                style={{ cursor: 'pointer', background: 'none', border: 'none' }}
            >
                {row.getIsExpanded() ? '👇' : '👉'}
            </button>
        ),
        size: 40,
    },
    ...columns
];

export const ExpandableRows: Story = {
    args: {
        data: USERS.slice(0, 5),
        columns: expandableColumns as any,
        renderSubComponent: ({ row }) => (
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-alt)' }}>
                <strong>Details for {(row.original as User).name}:</strong>
                <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                    Role: {(row.original as User).role} | Status: {(row.original as User).status}
                </div>
            </div>
        )
    },
};

// Actions Column Helper
const actionColumns: ColumnDef<User, any>[] = [
    ...columns,
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button size="sm" variant="outline" onClick={() => alert(`Edit ${(row.original as User).name}`)}>
                    Edit
                </Button>
                <Button size="sm" variant="ghost" style={{ color: 'var(--danger)' }} onClick={() => alert(`Delete ${(row.original as User).name}`)}>
                    Delete
                </Button>
            </div>
        ),
    }
];

export const WithActions: Story = {
    args: {
        data: USERS.slice(0, 5),
        columns: actionColumns as any,
    },
};

export const InfiniteScroll: Story = {
    args: {
        data: USERS.slice(0, 20),
        columns: columns as any,
        enableInfiniteScroll: true,
        // Mocking the behavior by alerting
        onLoadMore: () => {
             console.log('Load more triggered');
             // In a real Storybook, we might use State to append data, but argTypes control is static. 
             // We'd need a wrapper component for real infinite scroll simulation in Storybook.
        },
        isFetchingNextPage: false,
    },
    render: (args) => {
        // Wrapper state for infinite scroll simulation
        const [data, setData] = React.useState(args.data);
        const [isFetching, setIsFetching] = React.useState(false);

        const fetchMore = () => {
             if (isFetching || data.length >= 100) return;
             setIsFetching(true);
             setTimeout(() => {
                 const currentLength = data.length;
                 const nextBatch = USERS.slice(currentLength, currentLength + 10);
                 setData([...data, ...nextBatch]);
                 setIsFetching(false);
             }, 1000);
        };

        return <Table {...args} data={data} onLoadMore={fetchMore} isFetchingNextPage={isFetching} style={{ height: '400px' }} />;
    }
};
