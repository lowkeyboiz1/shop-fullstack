/**
 * Types and interfaces for FolderTree component
 *
 * This file contains all type definitions used across the FolderTree component system.
 * Designed to be easily extensible for future API integration with React Query.
 */

export interface FolderNode {
  /** Unique identifier for the folder */
  id: string
  /** Display name of the folder */
  name: string
  /** Type identifier - always 'folder' for consistency */
  type: 'folder'
  /** Array of child folders */
  children: FolderNode[]
  /** Optional parent folder ID for API operations */
  parentId?: string
  /** Optional metadata for future API integration */
  metadata?: {
    createdAt?: string
    updatedAt?: string
    [key: string]: any
  }
}

export interface FolderTreeProps {
  /** Array of root folder nodes */
  folders: FolderNode[]
  /** Currently selected folder ID */
  selectedFolder: string
  /** Callback when a folder is selected */
  onFolderSelect: (folderId: string, folderName: string) => void
  /** Optional callback for adding new folders */
  onAddFolder?: (parentId: string, folderName: string) => Promise<void> | void
  /** Optional callback for deleting folders */
  onDeleteFolder?: (folderId: string) => Promise<void> | void
  /** Optional loading state for API operations */
  isLoading?: boolean
  /** Optional error state */
  error?: string | null
}

export interface TreeNodeProps {
  /** The folder node to render */
  node: FolderNode
  /** Nesting level for indentation */
  level: number
  /** Currently selected folder ID */
  selectedFolder: string
  /** Callback when folder is selected */
  onFolderSelect: (folderId: string, folderName: string) => void
  /** Set of expanded node IDs */
  expandedNodes: Set<string>
  /** Callback to toggle node expansion */
  onToggleExpand: (nodeId: string) => void
  /** Optional callback for adding folders */
  onAddFolder?: (parentId: string, folderName: string) => Promise<void> | void
  /** Optional callback for deleting folders */
  onDeleteFolder?: (folderId: string) => Promise<void> | void
}

export interface FolderActionsProps {
  /** The folder node for actions */
  node: FolderNode
  /** Callback for adding folders */
  onAddFolder?: (parentId: string, folderName: string) => Promise<void> | void
  /** Callback for deleting folders */
  onDeleteFolder?: (folderId: string) => Promise<void> | void
}

export interface AddFolderDialogProps {
  /** Whether dialog is open */
  open: boolean
  /** Callback when dialog open state changes */
  onOpenChange: (open: boolean) => void
  /** Callback when folder is added */
  onAddFolder: (folderName: string) => void
  /** Loading state for add operation */
  isLoading?: boolean
}
