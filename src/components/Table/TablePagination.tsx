import type { TablePaginationProps } from './Table.types';
import styles from './Table.module.scss';
import { DEFAULT_PAGE_SIZES, DEFAULT_TEXTS } from './Table.constants';
import { Select } from '../Select';

// Icons
const IconFirst = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/></svg>;
const IconPrev = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IconNext = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;
const IconLast = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>;

export function TablePagination<TData>({ table, texts }: TablePaginationProps<TData>) {
  // If table doesn't have pagination enabled or active, it might just show all rows.
  // But usually this component is only rendered if pagination is enabled.
  
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const pageCount = table.getPageCount();

  const labels = { ...DEFAULT_TEXTS, ...texts };

  return (
    <div className={styles.pagination}>
      <div className={styles.paginationInfo}>
          {labels.rowsSelected(table.getSelectedRowModel().rows.length)}
      </div>

      <div className={styles.paginationControls}>
        <span>
          {labels.pageOf(pageIndex + 1, pageCount)}
        </span>
        
        <button
          className={styles.pageButton}
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          aria-label="First page"
        >
          <IconFirst />
        </button>
        <button
          className={styles.pageButton}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="Previous page"
        >
          <IconPrev />
        </button>
        <button
          className={styles.pageButton}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label="Next page"
        >
          <IconNext />
        </button>
        <button
          className={styles.pageButton}
          onClick={() => table.setPageIndex(pageCount - 1)}
          disabled={!table.getCanNextPage()}
          aria-label="Last page"
        >
          <IconLast />
        </button>

        <span style={{ marginLeft: '1rem' }}>{labels.rowsPerPage}</span>
        <div style={{ width: '80px', display: 'inline-block' }}>
            <Select
              options={DEFAULT_PAGE_SIZES.map(size => ({ value: size, label: String(size) }))}
              value={{ value: pageSize, label: String(pageSize) }}
              onChange={(option: any) => {
                 if (option) table.setPageSize(Number(option.value));
              }}
              size="sm"
            />
        </div>
      </div>
    </div>
  );
}
