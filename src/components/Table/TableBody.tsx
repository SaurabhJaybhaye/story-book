import React, { useEffect, useRef } from 'react';
import { flexRender } from '@tanstack/react-table';
import clsx from 'clsx';
import type { TableBodyProps } from './Table.types';
import styles from './Table.module.scss';
import { DEFAULT_TEXTS } from './Table.constants';
import { Spinner } from '../Spinner';

export function TableBody<TData>({ 
    table, 
    isLoading, 
    renderSubComponent,
    noDataText = DEFAULT_TEXTS.noData,
    loadingText = DEFAULT_TEXTS.loading,
    enableInfiniteScroll,
    onLoadMore,
    isFetchingNextPage
}: TableBodyProps<TData>) {
  
  const rows = table.getRowModel().rows;
  const bottomRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    if (!enableInfiniteScroll || !onLoadMore || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, [enableInfiniteScroll, onLoadMore, isFetchingNextPage, rows.length]); // Re-run when rows change to re-attach to new bottom if needed, though ref should be stable. Wait, bottom element is static relative to list end.

  if (isLoading && rows.length === 0) {
      return (
          <tbody>
              <tr>
                  <td colSpan={table.getAllColumns().length}>
                      <div className={styles.loadingOverlay}>
                        <Spinner size="md" />
                        <span style={{ marginLeft: '1rem' }}>{loadingText}</span>
                      </div>
                  </td>
              </tr>
          </tbody>
      )
  }

  if (rows.length === 0) {
      return (
          <tbody>
              <tr>
                  <td colSpan={table.getAllColumns().length} className={styles.emptyState}>
                      {noDataText}
                  </td>
              </tr>
          </tbody>
      )
  }

  return (
    <tbody>
      {rows.map((row) => (
        <React.Fragment key={row.id}>
          <tr 
            className={clsx({
                [styles['tr--selected']]: row.getIsSelected(),
                [styles['tr--hover']]: true, // Always hoverable for now
            })}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
          {row.getIsExpanded() && renderSubComponent && (
            <tr>
              <td colSpan={row.getVisibleCells().length}>
                {renderSubComponent({ row })}
              </td>
            </tr>
          )}
        </React.Fragment>
      ))}

      {/* Sentinel for Infinite Scroll */}
      {enableInfiniteScroll && (
         <tr ref={bottomRef} style={{ height: '20px', background: 'transparent', border: 'none' }}>
            <td colSpan={table.getAllColumns().length} style={{ padding: 0, border: 'none' }} />
         </tr>
      )}

      {/* Loading More Indicator */}
      {isFetchingNextPage && (
          <tr>
              <td colSpan={table.getAllColumns().length} style={{ padding: 0, border: 'none' }}>
                  <div className={styles.loadingOverlay} style={{ padding: '1rem' }}>
                    <Spinner size="sm" />
                  </div>
              </td>
          </tr>
      )}
    </tbody>
  );
}
