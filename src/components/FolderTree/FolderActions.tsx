/**
 * FolderActions Component
 *
 * Dropdown menu component for folder actions (add, delete).
 * Handles action menu state and provides clean interface for folder operations.
 */

'use client'

import { useState } from 'react'
import { MoreHorizontal, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { AddFolderDialog } from './AddFolderDialog'
import type { FolderActionsProps } from './types'

export function FolderActions({ node, onAddFolder, onDeleteFolder }: FolderActionsProps) {
  // State for controlling dropdown menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // State for controlling add folder dialog
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  /**
   * Handle add folder action
   * Opens the add folder dialog
   */
  const handleAddFolder = () => {
    setIsAddDialogOpen(true)
    setIsMenuOpen(false)
  }

  /**
   * Handle delete folder action
   * Calls onDeleteFolder callback if folder is not root
   */
  const handleDeleteFolder = async () => {
    if (onDeleteFolder && node.id !== 'root') {
      try {
        await onDeleteFolder(node.id)
      } catch (error) {
        console.error('Failed to delete folder:', error)
      }
    }
    setIsMenuOpen(false)
  }

  /**
   * Handle folder creation from dialog
   *
   * @param folderName - Name of the new folder
   */
  const handleCreateFolder = async (folderName: string) => {
    if (onAddFolder) {
      await onAddFolder(node.id, folderName)
    }
  }

  /**
   * Handle menu trigger click
   * Prevents event bubbling to parent elements
   */
  const handleMenuTrigger = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <>
      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button size='sm' variant='ghost' className='h-6 w-6 p-0' onClick={handleMenuTrigger}>
            <MoreHorizontal className='h-3 w-3' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          {/* Add folder option */}
          <DropdownMenuItem onClick={handleAddFolder} onSelect={(e) => e.preventDefault()}>
            <Plus className='mr-2 h-4 w-4' />
            Thêm thư mục con
          </DropdownMenuItem>

          {/* Delete folder option - only show if not root */}
          {node.id !== 'root' && (
            <DropdownMenuItem onClick={handleDeleteFolder} className='text-red-600 focus:text-red-600'>
              <Trash2 className='mr-2 h-4 w-4' />
              Xóa thư mục
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Add folder dialog */}
      <AddFolderDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAddFolder={handleCreateFolder} />
    </>
  )
}
