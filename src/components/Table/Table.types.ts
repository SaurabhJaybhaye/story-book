import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  RowSelectionState,
  PaginationState,
  OnChangeFn,
  Row,
  Table as TanStackTable,
} from '@tanstack/react-table';
import type { ReactNode, CSSProperties } from 'react';

export type TableVariant = 'default' | 'striped' | 'bordered' | 'compact';
export type TableSize = 'sm' | 'md' | 'lg';

export interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];

  // Appearance
  variant?: TableVariant;
  size?: TableSize;
  className?: string;
  style?: CSSProperties;
  
  // Features
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableRowSelection?: boolean;
  enablePagination?: boolean;
  enableColumnVisibility?: boolean;
  enableGlobalFilter?: boolean;
  
  // Controlled States (Optional)
  state?: {
    sorting?: SortingState;
    columnFilters?: ColumnFiltersState;
    rowSelection?: RowSelectionState;
    pagination?: PaginationState;
    globalFilter?: string;
  };
  
  // OnChange Handlers (Optional)
  onSortingChange?: OnChangeFn<SortingState>;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  onPaginationChange?: OnChangeFn<PaginationState>; // Note: TanStack handles this carefully
  onGlobalFilterChange?: OnChangeFn<string>;

  // Server-side Pagination Support
  pageCount?: number; // Total pages controlled by server
  manualPagination?: boolean;
  
  // UI Slots
  renderSubComponent?: (props: { row: Row<TData> }) => ReactNode;
  
  // Infinite Scroll Support
  enableInfiniteScroll?: boolean;
  onLoadMore?: () => void;
  isFetchingNextPage?: boolean;
  totalCount?: number;

  // State indicators
  isLoading?: boolean;
  isEmpty?: boolean; // Can act as override, usually derived from data.length
  
  // Labels / I18n
  texts?: {
      noData?: string;
      loading?: string;
      searchPlaceholder?: string;
      rowsSelected?: (count: number) => string;
      pageOf?: (current: number, total: number) => string;
      rowsPerPage?: string;
  }
}

// Subcomponent Props
export interface TableHeaderProps<TData> {
  table: TanStackTable<TData>;
}

export interface TableBodyProps<TData> {
  table: TanStackTable<TData>;
  isLoading?: boolean;
  renderSubComponent?: (props: { row: Row<TData> }) => ReactNode;
  noDataText?: string;
  loadingText?: string;
  enableInfiniteScroll?: boolean;
  onLoadMore?: () => void;
  isFetchingNextPage?: boolean;
}

export interface TablePaginationProps<TData> {
  table: TanStackTable<TData>;
  texts?: {
      pageOf?: (current: number, total: number) => string;
      rowsPerPage?: string;
  }
}

export interface TableToolbarProps<TData> {
  table: TanStackTable<TData>;
  enableGlobalFilter?: boolean;
  enableColumnVisibility?: boolean;
  searchPlaceholder?: string;
}
