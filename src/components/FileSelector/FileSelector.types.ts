import type { ReactNode, CSSProperties } from 'react';

export type FileStatus = 'idle' | 'uploading' | 'success' | 'error';
export type FileLayout = 'list' | 'grid';

export interface ExtendedFile {
  file: File;
  id: string;
  status?: FileStatus;
  progress?: number; // 0 to 100
  error?: string;
  preview?: string; // Data URL or object URL
}

export interface FileRejection {
  file: File;
  errors: { code: string; message: string }[];
}

export interface FileSelectorProps {
  /**
   * Controlled selected files.
   */
  value?: ExtendedFile[];
  
  /**
   * Default initial files (uncontrolled).
   */
  defaultValue?: ExtendedFile[];
  
  /**
   * Callback when files are added or removed (controlled).
   */
  onChange?: (files: ExtendedFile[]) => void;
  
  /**
   * Callback when files are successfully selected/dropped (before adding to state).
   */
  onFilesSelected?: (files: File[], rejections: FileRejection[]) => void;
  
  /**
   * Callback when a file remove button is clicked.
   */
  onFileRemove?: (fileId: string) => void;

  /**
   * Callback for custom validation. Return error message or null/undefined if valid.
   */
  onValidate?: (file: File) => string | null | undefined;

  /**
   * Accepted file types (e.g. 'image/*', '.pdf').
   */
  accept?: string;
  
  /**
   * Allow multiple file selection.
   * @default false
   */
  multiple?: boolean;
  
  /**
   * Maximum file size in bytes.
   */
  maxFileSize?: number;
  
  /**
   * Maximum number of files allowed.
   */
  maxFiles?: number;
  
  /**
   * Disabled state for input.
   */
  disabled?: boolean;
  
  /**
   * Layout of the selected files list.
   * @default 'list'
   */
  layout?: FileLayout;
  
  /**
   * Label for the dropzone or button.
   */
  label?: ReactNode;
  
  /**
   * Helper text or instructions.
   */
  helperText?: ReactNode;
  
  /**
   * Custom content for the dropzone area.
   */
  dropzoneContent?: ReactNode;
  
  /**
   * Enable or disable drag and drop support.
   * @default true
   */
  dragAndDrop?: boolean;

  className?: string;
  style?: CSSProperties;
}

export interface FileItemProps {
  extendedFile: ExtendedFile;
  layout?: FileLayout;
  onRemove?: (id: string) => void;
  disabled?: boolean;
  showProgress?: boolean;
}
