import type { TableToolbarProps } from './Table.types';
import styles from './Table.module.scss';
import { DEFAULT_TEXTS } from './Table.constants';
import { Input } from '../Input';

export function TableToolbar<TData>({
  table,
  enableGlobalFilter,
  searchPlaceholder = DEFAULT_TEXTS.searchPlaceholder,
}: TableToolbarProps<TData>) {
  const globalFilter = table.getState().globalFilter;

  // Render if filtering enabled OR if we have selected rows (for bulk actions)
  const showToolbar = enableGlobalFilter || table.getSelectedRowModel().rows.length > 0;

  if (!showToolbar) return null;

  return (
    <div className={styles.toolbar}>
      {/* 1. Bulk Actions (Left) */}
      {table.getSelectedRowModel().rows.length > 0 ? (
          <div className={styles.bulkActions}>
            <span className={styles.selectionCount}>
                {table.getSelectedRowModel().rows.length} selected
            </span>
             <button
                className={styles.bulkDeleteButton}
                onClick={() => {
                   (table.options.meta as any)?.onBulkDelete?.(table.getSelectedRowModel().rows.map(r => r.original));
                }}
             >
                Delete Selected
             </button>
          </div>
      ) : <div /> /* Spacer if no bulk actions to keep search on right if using space-between, or just let it float */}

      {/* 2. Global Search (Right) */}
      {enableGlobalFilter && (
        <div style={{ marginLeft: 'auto' }}>
            <Input
            value={globalFilter ?? ''}
            onChange={(e) => table.setGlobalFilter(String(e.target.value))}
            placeholder={searchPlaceholder}
            className={styles.filterInput}
            size="sm"
            variant="search"
            />
        </div>
      )}
    </div>
  );
}
