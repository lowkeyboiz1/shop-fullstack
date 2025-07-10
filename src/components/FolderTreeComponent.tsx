'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Folder, FolderOpen, Plus, Trash2, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface FolderNode {
  id: string
  name: string
  type: 'folder'
  children: FolderNode[]
}

interface FolderTreeComponentProps {
  folders: FolderNode[]
  selectedFolder: string
  onFolderSelect: (folderId: string, folderName: string) => void
  onAddFolder?: (parentId: string, folderName: string) => void
  onDeleteFolder?: (folderId: string) => void
}

interface TreeNodeProps {
  node: FolderNode
  level: number
  selectedFolder: string
  onFolderSelect: (folderId: string, folderName: string) => void
  expandedNodes: Set<string>
  onToggleExpand: (nodeId: string) => void
  onAddFolder?: (parentId: string, folderName: string) => void
  onDeleteFolder?: (folderId: string) => void
}

function TreeNode({ node, level, selectedFolder, onFolderSelect, expandedNodes, onToggleExpand, onAddFolder, onDeleteFolder }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(expandedNodes.has(node.id))
  const [newFolderName, setNewFolderName] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const hasChildren = node.children.length > 0
  const isSelected = selectedFolder === node.id

  const handleToggle = () => {
    if (hasChildren) {
      onToggleExpand(node.id)
    }
  }

  const handleSelect = () => {
    onFolderSelect(node.id, node.name)
  }

  const handleAddFolder = () => {
    if (newFolderName.trim() && onAddFolder) {
      onAddFolder(node.id, newFolderName.trim())
      setNewFolderName('')
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteFolder = () => {
    if (onDeleteFolder && node.id !== 'root') {
      onDeleteFolder(node.id)
    }
  }

  return (
    <div className='select-none'>
      <div
        className={cn('group flex cursor-pointer items-center gap-2 rounded-md p-2 transition-colors hover:bg-gray-100', isSelected && 'bg-blue-100 hover:bg-blue-200')}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleSelect}
      >
        <div className='flex items-center gap-1'>
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleToggle()
              }}
              className='rounded p-0.5 hover:bg-gray-200'
            >
              {expandedNodes.has(node.id) ? <ChevronDown className='h-4 w-4' /> : <ChevronRight className='h-4 w-4' />}
            </button>
          ) : (
            <div className='h-5 w-5' />
          )}

          {expandedNodes.has(node.id) ? <FolderOpen className='h-4 w-4 text-blue-600' /> : <Folder className='h-4 w-4 text-gray-600' />}
        </div>

        <span className={cn('flex-1 text-sm font-medium', isSelected && 'text-blue-700')}>{node.name}</span>

        {/* Action buttons */}
        <div className='opacity-0 transition-opacity group-hover:opacity-100'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size='sm' variant='ghost' className='h-6 w-6 p-0' onClick={(e) => e.stopPropagation()}>
                <MoreHorizontal className='h-3 w-3' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Plus className='mr-2 h-4 w-4' />
                    Thêm thư mục con
                  </DropdownMenuItem>
                </DialogTrigger>
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
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        className='col-span-3'
                        placeholder='Nhập tên thư mục...'
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleAddFolder()
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className='flex justify-end gap-2'>
                    <Button variant='outline' onClick={() => setIsAddDialogOpen(false)}>
                      Hủy
                    </Button>
                    <Button onClick={handleAddFolder} disabled={!newFolderName.trim()}>
                      Thêm
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              {node.id !== 'root' && (
                <DropdownMenuItem onClick={handleDeleteFolder} className='text-red-600 focus:text-red-600'>
                  <Trash2 className='mr-2 h-4 w-4' />
                  Xóa thư mục
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {hasChildren && expandedNodes.has(node.id) && (
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

export function FolderTreeComponent({ folders, selectedFolder, onFolderSelect, onAddFolder, onDeleteFolder }: FolderTreeComponentProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']))

  const handleToggleExpand = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId)
    } else {
      newExpanded.add(nodeId)
    }
    setExpandedNodes(newExpanded)
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
          onToggleExpand={handleToggleExpand}
          onAddFolder={onAddFolder}
          onDeleteFolder={onDeleteFolder}
        />
      ))}
    </div>
  )
}
