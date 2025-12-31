import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
} from '@tanstack/react-table';
import type {
  SortingState,
  ColumnFiltersState,
  RowSelectionState,
  PaginationState,
} from '@tanstack/react-table';
import clsx from 'clsx';

import type { TableProps } from './Table.types';
import styles from './Table.module.scss';
import { DEFAULT_TABLE_SIZE, DEFAULT_TABLE_VARIANT, DEFAULT_PAGE_SIZES } from './Table.constants';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { TablePagination } from './TablePagination';
import { TableToolbar } from './TableToolbar';

export function Table<TData>({
  data,
  columns,
  variant = DEFAULT_TABLE_VARIANT,
  size = DEFAULT_TABLE_SIZE,
  className,
  style,
  
  enableSorting = false,
  enableFiltering = false,
  enableRowSelection = false,
  enablePagination = false,
  enableColumnVisibility = false,
  enableGlobalFilter = false,
  
  state: controlledState,
  
  onSortingChange,
  onColumnFiltersChange,
  onRowSelectionChange,
  onPaginationChange,
  onGlobalFilterChange,
  
  pageCount,
  manualPagination,
  enableInfiniteScroll,
  onLoadMore,
  isFetchingNextPage,
  
  renderSubComponent,
  isLoading = false,
  texts,
}: TableProps<TData>) {

  // Internal State (if uncontrolled)
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: DEFAULT_PAGE_SIZES[0],
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    
    // Feature: Sorting
    enableSorting,
    onSortingChange: onSortingChange ?? setSorting,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    
    // Feature: Filtering
    enableFilters: enableFiltering,
    enableGlobalFilter,
    onColumnFiltersChange: onColumnFiltersChange ?? setColumnFilters,
    onGlobalFilterChange: onGlobalFilterChange ?? setGlobalFilter,
    getFilteredRowModel: (enableFiltering || enableGlobalFilter) ? getFilteredRowModel() : undefined,
    
    // Feature: Pagination
    // Note: If manualPagination is true, getPaginationRowModel is typically skipped or config is different.
    // Tanstack table generally behaves well with getPaginationRowModel even for manual if we set pageCount correct.
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    onPaginationChange: onPaginationChange ?? setPagination,
    pageCount: manualPagination ? pageCount : undefined,
    manualPagination,

    // Feature: Row Selection
    enableRowSelection,
    onRowSelectionChange: onRowSelectionChange ?? setRowSelection,
    
    // Feature: Expansion
    getRowCanExpand: () => !!renderSubComponent,
    getExpandedRowModel: getExpandedRowModel(),

    // State Merging
    state: {
      sorting: controlledState?.sorting ?? sorting,
      columnFilters: controlledState?.columnFilters ?? columnFilters,
      globalFilter: controlledState?.globalFilter ?? globalFilter,
      rowSelection: controlledState?.rowSelection ?? rowSelection,
      pagination: controlledState?.pagination ?? pagination,
      ...controlledState
    },
  });

  return (
    <div className={clsx(styles.wrapper, className)} style={style}>
       <TableToolbar 
          table={table} 
          enableGlobalFilter={enableGlobalFilter} 
          enableColumnVisibility={enableColumnVisibility} // Pass through if we add visibility toggle
       />

       <div className={styles.tableContainer}>
         <table 
           className={clsx(
             styles.table,
             styles[`table--${variant}`],
             styles[`table--${size}`]
           )}
         >
           <TableHeader table={table} />
           <TableBody 
              table={table} 
              isLoading={isLoading} 
              renderSubComponent={renderSubComponent}
              loadingText={texts?.loading}
              noDataText={texts?.noData}
              enableInfiniteScroll={enableInfiniteScroll}
              onLoadMore={onLoadMore}
              isFetchingNextPage={isFetchingNextPage}
           />
         </table>
       </div>
       
       {enablePagination && (
          <TablePagination table={table} texts={texts} />
       )}
    </div>
  );
}
