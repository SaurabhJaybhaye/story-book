import type { FileLayout } from './FileSelector.types';

export const DEFAULT_MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const DEFAULT_MAX_FILES = 0; // 0 means unlimited
export const DEFAULT_LAYOUT: FileLayout = 'list';
export const DEFAULT_ACCEPT = '*';

export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: 'File is larger than the maximum allowed size.',
  FILE_TYPE_INVALID: 'File type is not allowed.',
  TOO_MANY_FILES: 'Maximum number of files reached.',
};
