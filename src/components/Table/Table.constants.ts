import type { TableSize, TableVariant } from './Table.types';

export const DEFAULT_TABLE_SIZE: TableSize = 'md';
export const DEFAULT_TABLE_VARIANT: TableVariant = 'default';
export const DEFAULT_PAGE_SIZES = [10, 20, 30, 40, 50];

export const DEFAULT_TEXTS = {
  noData: 'No data available',
  loading: 'Loading data...',
  searchPlaceholder: 'Search...',
  rowsSelected: (count: number) => `${count} row(s) selected`,
  pageOf: (current: number, total: number) => `Page ${current} of ${total}`,
  rowsPerPage: 'Rows per page:',
};
