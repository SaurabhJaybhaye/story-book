import React, { useMemo } from 'react';
import clsx from 'clsx';
import type { FileItemProps } from './FileSelector.types';
import styles from './FileSelector.module.scss';
import { DEFAULT_LAYOUT } from './FileSelector.constants';
import { Typography } from '../Typography';

// Icons
const FileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const AlertIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  );

// Helper to format bytes
const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const FileItem: React.FC<FileItemProps> = ({
  extendedFile,
  layout = DEFAULT_LAYOUT,
  onRemove,
  disabled,
  showProgress = true,
}) => {
  const { file, id, status = 'idle', progress = 0, error, preview } = extendedFile;

  const isImage = file.type.startsWith('image/');
  
  // Decide what preview to show
  const renderPreview = useMemo(() => {
    if (isImage && preview) {
      return <img src={preview} alt={file.name} />;
    }
    return <FileIcon />;
  }, [isImage, preview, file.name]);

  const statusIcon = useMemo(() => {
    if (status === 'success') return <CheckIcon />;
    if (status === 'error') return <AlertIcon />;
    return null;
  }, [status]);

  return (
    <div className={clsx(styles.fileItem, styles[`fileItem--${layout}`])}>
      <div className={clsx(styles.filePreview, styles[`filePreview--${layout}`])}>
        {renderPreview}
      </div>

      <div className={clsx(styles.fileInfo, styles[`fileInfo--${layout}`])}>
        <Typography variant="body2" className={styles.fileName} title={file.name} truncate>
            {file.name}
        </Typography>
        <div className={styles.fileMeta}>
          <Typography variant="caption" as="span">{formatBytes(file.size)}</Typography>
          {status !== 'idle' && (
             <span className={clsx(styles.status, styles[`status--${status}`])} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}>
                {statusIcon} 
                <Typography variant="caption" as="span" style={{color: 'inherit'}}>
                    {status}
                </Typography>
             </span>
          )}
        </div>
        
        {/* Progress Bar */}
        {showProgress && status === 'uploading' && (
          <div className={styles.progressBarContainer}>
            <div 
              className={styles.progressBarFill} 
              style={{ width: `${progress}%` }} 
            />
          </div>
        )}
        
        {error && (
             <Typography variant="caption" className={styles.errorMessage} style={{ color: 'var(--danger)' }}>
                {error}
            </Typography>
        )}
      </div>

      <button
        type="button"
        className={clsx(styles.removeButton, styles[`removeButton--${layout}`])}
        onClick={() => onRemove?.(id)}
        disabled={disabled || status === 'uploading'}
        aria-label={`Remove ${file.name}`}
      >
        <TrashIcon />
      </button>
    </div>
  );
};
