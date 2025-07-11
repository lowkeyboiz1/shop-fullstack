/**
 * FolderTree Component
 *
 * Main component for rendering a hierarchical folder tree structure.
 * Provides folder selection, expansion/collapse, and CRUD operations.
 * Designed to work seamlessly with React Query for API integration.
 */

'use client'

import { useFolderTree } from './hooks/useFolderTree'
import { TreeNode } from './TreeNode'
import type { FolderTreeProps } from './types'

export function FolderTree({ folders, selectedFolder, onFolderSelect, onAddFolder, onDeleteFolder, isLoading = false, error = null }: FolderTreeProps) {
  // Use custom hook for managing tree state
  const { expandedNodes, toggleExpand } = useFolderTree({
    initialExpanded: ['root']
  })

  // Show error state if there's an error
  if (error) {
    return (
      <div className='p-4 text-center text-red-600'>
        <p>Lỗi khi tải dữ liệu: {error}</p>
      </div>
    )
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className='p-4 text-center text-gray-500'>
        <p>Đang tải...</p>
      </div>
    )
  }

  // Show empty state if no folders
  if (!folders || folders.length === 0) {
    return (
      <div className='p-4 text-center text-gray-500'>
        <p>Không có thư mục nào</p>
      </div>
    )
  }

  return (
    <div className='max-h-96 overflow-y-auto p-2'>
      {folders.map((folder) => (
        <TreeNode
          key={folder.id}
          node={folder}
          level={0}
          selectedFolder={selectedFolder}
          onFolderSelect={onFolderSelect}
          expandedNodes={expandedNodes}
          onToggleExpand={toggleExpand}
          onAddFolder={onAddFolder}
          onDeleteFolder={onDeleteFolder}
        />
      ))}
    </div>
  )
}
