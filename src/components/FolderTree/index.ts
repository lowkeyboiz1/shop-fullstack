/**
 * FolderTree Module
 *
 * Barrel export file for the FolderTree component system.
 * Provides clean imports for consuming components.
 */

// Main components
export { FolderTree } from './FolderTree'
export { TreeNode } from './TreeNode'
export { FolderActions } from './FolderActions'
export { AddFolderDialog } from './AddFolderDialog'

// Custom hooks
export { useFolderTree } from './hooks/useFolderTree'
export type { UseFolderTreeOptions, UseFolderTreeReturn } from './hooks/useFolderTree'

// Types
export type { FolderNode, FolderTreeProps, TreeNodeProps, FolderActionsProps, AddFolderDialogProps } from './types'

// Default export for convenience
export { FolderTree as default } from './FolderTree'
