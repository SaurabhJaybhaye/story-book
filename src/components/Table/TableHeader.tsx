import { flexRender } from '@tanstack/react-table';
import clsx from 'clsx';
import type { TableHeaderProps } from './Table.types';
import styles from './Table.module.scss';

const SortIcon = ({ isSorted }: { isSorted: false | 'asc' | 'desc' }) => {
  if (!isSorted) {
    // Default neutral sort icon
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.sortIcon} style={{ opacity: 0.3 }}>
        <path d="m8 9 4-4 4 4"/>
        <path d="m8 15 4 4 4-4"/>
      </svg>
    )
  }
  if (isSorted === 'asc') {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.sortIcon}>
           <path d="m18 15-6-6-6 6"/>
        </svg>
      )
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.sortIcon}>
       <path d="m6 9 6 6 6-6"/>
    </svg>
  )
}

export function TableHeader<TData>({ table }: TableHeaderProps<TData>) {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const canSort = header.column.getCanSort();
            const isSorted = header.column.getIsSorted();

            return (
              <th
                key={header.id}
                colSpan={header.colSpan}
                onClick={header.column.getToggleSortingHandler()}
                className={clsx({ [styles.sortable]: canSort })}
                style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }} // Basic sizing support
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                {canSort && <SortIcon isSorted={isSorted} />}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}
