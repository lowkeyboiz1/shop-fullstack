/**
 * AddFolderDialog Component
 *
 * A reusable dialog component for adding new folders.
 * Handles form validation and submission with loading states.
 */

'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import type { AddFolderDialogProps } from './types'

export function AddFolderDialog({ open, onOpenChange, onAddFolder, isLoading = false }: AddFolderDialogProps) {
  // Local state for folder name input
  const [folderName, setFolderName] = useState('')

  /**
   * Handle form submission
   * Validates input and calls onAddFolder callback
   */
  const handleSubmit = async () => {
    const trimmedName = folderName.trim()

    if (!trimmedName) return

    try {
      await onAddFolder(trimmedName)
      handleClose()
    } catch (error) {
      // Error handling can be added here
      console.error('Failed to add folder:', error)
    }
  }

  /**
   * Handle dialog close
   * Resets form state and closes dialog
   */
  const handleClose = () => {
    setFolderName('')
    onOpenChange(false)
  }

  /**
   * Handle Enter key press in input
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Thêm thư mục mới</DialogTitle>
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='folder-name' className='text-right'>
              Tên thư mục
            </Label>
            <Input
              id='folder-name'
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className='col-span-3'
              placeholder='Nhập tên thư mục...'
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              autoFocus
            />
          </div>
        </div>

        <div className='flex justify-end gap-2'>
          <Button variant='outline' onClick={handleClose} disabled={isLoading}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={!folderName.trim() || isLoading}>
            {isLoading ? 'Đang thêm...' : 'Thêm'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
