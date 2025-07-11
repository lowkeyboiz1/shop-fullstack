/**
 * FolderTreeComponent - Legacy wrapper
 *
 * This is a legacy wrapper component that maintains backward compatibility
 * while using the new optimized FolderTree component system.
 *
 * @deprecated Use FolderTree from '@/components/FolderTree' instead
 */

'use client'

import { FolderTree } from './FolderTree'
import type { FolderNode } from './FolderTree'

interface FolderTreeComponentProps {
  folders: FolderNode[]
  selectedFolder: string
  onFolderSelect: (folderId: string, folderName: string) => void
  onAddFolder?: (parentId: string, folderName: string) => void
  onDeleteFolder?: (folderId: string) => void
}

/**
 * Legacy FolderTreeComponent wrapper
 *
 * This component provides backward compatibility for existing code
 * while using the new optimized FolderTree component under the hood.
 *
 * @deprecated Please migrate to using FolderTree directly:
 * ```tsx
 * import { FolderTree } from '@/components/FolderTree'
 * ```
 */
export function FolderTreeComponent({ folders, selectedFolder, onFolderSelect, onAddFolder, onDeleteFolder }: FolderTreeComponentProps) {
  return <FolderTree folders={folders} selectedFolder={selectedFolder} onFolderSelect={onFolderSelect} onAddFolder={onAddFolder} onDeleteFolder={onDeleteFolder} />
}

// Export the new types and components for easier migration
export { FolderTree } from './FolderTree'
export type { FolderNode } from './FolderTree'
