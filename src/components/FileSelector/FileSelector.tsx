import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { FileItem } from './FileItem';
import type { FileSelectorProps, ExtendedFile, FileRejection } from './FileSelector.types';
import { 
  DEFAULT_MAX_FILE_SIZE, 
  DEFAULT_MAX_FILES, 
  DEFAULT_LAYOUT, 
  DEFAULT_ACCEPT,
  ERROR_MESSAGES
} from './FileSelector.constants';
import styles from './FileSelector.module.scss';

// Simple ID generator
const generateId = () => Math.random().toString(36).substr(2, 9);

// Upload Icon
const UploadCloudIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
      <path d="M12 12v9"></path>
      <path d="m16 16-4-4-4 4"></path>
    </svg>
);

export const FileSelector: React.FC<FileSelectorProps> = ({
  value: controlledFiles,
  defaultValue,
  onChange,
  onFilesSelected,
  onFileRemove,
  onValidate,
  accept = DEFAULT_ACCEPT,
  multiple = false,
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  maxFiles = DEFAULT_MAX_FILES,
  disabled = false,
  layout = DEFAULT_LAYOUT,
  label = "Click or drag file to this area to upload",
  helperText = "Support for a single or bulk upload.",
  dropzoneContent,
  dragAndDrop = true,
  className,
  style,
}) => {
  // State for uncontrolled mode
  const [internalFiles, setInternalFiles] = useState<ExtendedFile[]>(defaultValue || []);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = controlledFiles !== undefined;
  const files = isControlled ? controlledFiles : internalFiles;

  // Cleanup object URLs on unmount or file removal
  useEffect(() => {
    return () => {
      files.forEach(f => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });
    };
  }, []); // We ideally want to track specific removed files, but clearing all on unmount is safe baseline.

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || !dragAndDrop) return;
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const validateFile = (file: File, currentFileCount: number): string | null => {
    if (maxFiles > 0 && currentFileCount >= maxFiles) {
        return ERROR_MESSAGES.TOO_MANY_FILES;
    }
    if (file.size > maxFileSize) {
        return ERROR_MESSAGES.FILE_TOO_LARGE;
    }
    // Basic type check override via onValidate
    if (onValidate) {
        const error = onValidate(file);
        if (error) return error;
    }
    // Note: Accept attribute matching is complex to replicate 100% exactly in JS for drops,
    // usually we rely on Input for selection and assume user checks types, or use a library for mime matching.
    // For this implementation, we will trust the browser native input for clicks,
    // and for drops we could do simple extension checking if needed, but let's stick to size/count/custom for now.
    
    return null;
  };

  const processFiles = (newFiles: File[]) => {
    const validFiles: ExtendedFile[] = [];
    const rejections: FileRejection[] = [];

    // Check max files limit globally including existing
    const potentialTotal = files.length + newFiles.length;
    let allowCount = newFiles.length;
    
    if (maxFiles > 0 && potentialTotal > maxFiles) {
        // If we strictly enforce limit, we might reject all or only accept up to limit.
        // Let's accept up to limit for better UX.
        allowCount = Math.max(0, maxFiles - files.length);
    }

    newFiles.forEach((file, index) => {
      if (maxFiles > 0 && index >= allowCount) {
        rejections.push({ file, errors: [{ code: 'too-many-files', message: ERROR_MESSAGES.TOO_MANY_FILES }]});
        return;
      }

      const error = validateFile(file, files.length + validFiles.length);
      if (error) {
        rejections.push({ file, errors: [{ code: 'validation-error', message: error }]});
      } else {
        const extended: ExtendedFile = {
            file,
            id: generateId(),
            status: 'idle',
            progress: 0,
        };
        
        // Generate preview for images
        if (file.type.startsWith('image/')) {
            extended.preview = URL.createObjectURL(file);
        }

        validFiles.push(extended);
      }
    });

    if (onFilesSelected) {
        onFilesSelected(validFiles.map(f => f.file), rejections);
    }

    if (validFiles.length > 0) {
        const updatedFiles = multiple ? [...files, ...validFiles] : validFiles; // Replace if single
        if (!isControlled) {
            setInternalFiles(updatedFiles);
        }
        onChange?.(updatedFiles);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (disabled || !dragAndDrop) return;

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
        processFiles(droppedFiles);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        const selectedFiles = Array.from(e.target.files);
        processFiles(selectedFiles);
    }
    // Reset value so same file can be selected again
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleRemove = (fileId: string) => {
    onFileRemove?.(fileId);
    
    // Default removal behavior
    const updatedFiles = files.filter(f => f.id !== fileId);
    
    // Revoke URL of removed file
    const removedFile = files.find(f => f.id === fileId);
    if (removedFile?.preview) {
        URL.revokeObjectURL(removedFile.preview);
    }

    if (!isControlled) {
        setInternalFiles(updatedFiles);
    }
    onChange?.(updatedFiles);
  };

  const openFileDialog = () => {
    if (!disabled && inputRef.current) {
        inputRef.current.click();
    }
  };

  return (
    <div className={clsx(styles.wrapper, className)} style={style}>
        {/* Dropzone */}
        <div
            className={clsx(styles.dropzone, {
                [styles['dropzone--active']]: isDragOver,
                [styles['dropzone--disabled']]: disabled,
            })}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={openFileDialog}
            role="button"
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
                if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                    openFileDialog();
                }
            }}
        >
            <input
                ref={inputRef}
                type="file"
                className={styles.input}
                accept={accept}
                multiple={multiple}
                onChange={handleInputChange}
                disabled={disabled}
            />
            
            {dropzoneContent || (
                <div className={styles.dropzoneContent}>
                    <div className={clsx(styles.icon, { [styles['icon--active']]: isDragOver })}>
                         <UploadCloudIcon />
                    </div>
                    <span className={styles.label}>{label}</span>
                    <span className={styles.helper}>{helperText}</span>
                </div>
            )}
        </div>

        {/* File List */}
        {files.length > 0 && (
            <div className={clsx(styles.filesContainer, styles[`filesContainer--${layout}`])}>
                {files.map(file => (
                    <FileItem 
                        key={file.id} 
                        extendedFile={file} 
                        layout={layout}
                        onRemove={handleRemove}
                        disabled={disabled}
                    />
                ))}
            </div>
        )}
    </div>
  );
};
