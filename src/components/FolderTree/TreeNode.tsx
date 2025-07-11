/**
 * TreeNode Component
 *
 * Renders a single folder node in the tree structure.
 * Handles node selection, expansion, and displays folder actions.
 */

'use client'

import { ChevronDown, ChevronRight, Folder, FolderOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FolderActions } from './FolderActions'
import type { TreeNodeProps } from './types'

export function TreeNode({ node, level, selectedFolder, onFolderSelect, expandedNodes, onToggleExpand, onAddFolder, onDeleteFolder }: TreeNodeProps) {
  // Check if this node has children
  const hasChildren = node.children.length > 0
  // Check if this node is currently selected
  const isSelected = selectedFolder === node.id
  // Check if this node is expanded
  const isExpanded = expandedNodes.has(node.id)

  /**
   * Handle folder selection
   * Calls onFolderSelect with folder ID and name
   */
  const handleSelect = () => {
    onFolderSelect(node.id, node.name)
  }

  /**
   * Handle expand/collapse toggle
   * Only works if node has children
   */
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (hasChildren) {
      onToggleExpand(node.id)
    }
  }

  return (
    <div className='select-none'>
      {/* Main folder row */}
      <div
        className={cn('group flex cursor-pointer items-center gap-2 rounded-md p-2 transition-colors hover:bg-gray-100', isSelected && 'bg-blue-100 hover:bg-blue-200')}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleSelect}
      >
        {/* Expand/collapse button and folder icon */}
        <div className='flex items-center gap-1'>
          {/* Expand/collapse chevron */}
          {hasChildren ? (
            <button onClick={handleToggle} className='rounded p-0.5 hover:bg-gray-200'>
              {isExpanded ? <ChevronDown className='h-4 w-4' /> : <ChevronRight className='h-4 w-4' />}
            </button>
          ) : (
            <div className='h-5 w-5' />
          )}

          {/* Folder icon */}
          {isExpanded ? <FolderOpen className='h-4 w-4 text-blue-600' /> : <Folder className='h-4 w-4 text-gray-600' />}
        </div>

        {/* Folder name */}
        <span className={cn('flex-1 text-sm font-medium', isSelected && 'text-blue-700')}>{node.name}</span>

        {/* Action buttons - only visible on hover */}
        <div className='opacity-0 transition-opacity group-hover:opacity-100'>
          <FolderActions node={node} onAddFolder={onAddFolder} onDeleteFolder={onDeleteFolder} />
        </div>
      </div>

      {/* Child nodes - only render if expanded and has children */}
      {hasChildren && isExpanded && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              selectedFolder={selectedFolder}
              onFolderSelect={onFolderSelect}
              expandedNodes={expandedNodes}
              onToggleExpand={onToggleExpand}
              onAddFolder={onAddFolder}
              onDeleteFolder={onDeleteFolder}
            />
          ))}
        </div>
      )}
    </div>
  )
}
