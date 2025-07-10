'use client'

import { useState } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FolderTree, Plus, Upload } from 'lucide-react'
import { FolderTreeComponent } from '@/components/FolderTreeComponent'
import { ImageGallery } from '@/components/ImageGallery'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Sample data for folder structure
const initialFolderStructure = [
  {
    id: 'root',
    name: 'Images',
    type: 'folder' as const,
    children: [
      {
        id: 'products',
        name: 'Products',
        type: 'folder' as const,
        children: [
          {
            id: 'macbook-air',
            name: 'MacBook Air',
            type: 'folder' as const,
            children: []
          },
          {
            id: 'macbook-pro',
            name: 'MacBook Pro',
            type: 'folder' as const,
            children: []
          }
        ]
      },
      {
        id: 'categories',
        name: 'Categories',
        type: 'folder' as const,
        children: [
          {
            id: 'laptops',
            name: 'Laptops',
            type: 'folder' as const,
            children: []
          },
          {
            id: 'accessories',
            name: 'Accessories',
            type: 'folder' as const,
            children: []
          }
        ]
      },
      {
        id: 'banners',
        name: 'Banners',
        type: 'folder' as const,
        children: []
      }
    ]
  }
]

// Sample images data
const initialImagesData = {
  'macbook-air': [
    {
      id: 1,
      name: 'macbook-air-1.jpg',
      url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
      size: '2.5 MB',
      uploadDate: '2024-01-15',
      dimensions: '1920x1080'
    },
    {
      id: 2,
      name: 'macbook-air-2.jpg',
      url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
      size: '3.1 MB',
      uploadDate: '2024-01-16',
      dimensions: '1920x1080'
    },
    {
      id: 3,
      name: 'macbook-air-3.jpg',
      url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop',
      size: '2.8 MB',
      uploadDate: '2024-01-17',
      dimensions: '1920x1080'
    },
    {
      id: 4,
      name: 'macbook-air-4.jpg',
      url: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=500&h=500&fit=crop',
      size: '2.2 MB',
      uploadDate: '2024-01-18',
      dimensions: '1920x1080'
    }
  ],
  'macbook-pro': [
    {
      id: 5,
      name: 'macbook-pro-1.jpg',
      url: 'https://images.unsplash.com/photo-1537432376769-00f83ed52b6c?w=500&h=500&fit=crop',
      size: '3.2 MB',
      uploadDate: '2024-01-18',
      dimensions: '2560x1440'
    },
    {
      id: 6,
      name: 'macbook-pro-2.jpg',
      url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&h=500&fit=crop',
      size: '2.9 MB',
      uploadDate: '2024-01-19',
      dimensions: '2560x1440'
    },
    {
      id: 7,
      name: 'macbook-pro-3.jpg',
      url: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&h=500&fit=crop',
      size: '3.5 MB',
      uploadDate: '2024-01-20',
      dimensions: '2560x1440'
    }
  ],
  laptops: [
    {
      id: 8,
      name: 'laptop-1.jpg',
      url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
      size: '2.1 MB',
      uploadDate: '2024-01-21',
      dimensions: '1920x1080'
    },
    {
      id: 9,
      name: 'laptop-2.jpg',
      url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=500&fit=crop',
      size: '2.7 MB',
      uploadDate: '2024-01-22',
      dimensions: '1920x1080'
    }
  ],
  accessories: [
    {
      id: 10,
      name: 'mouse-1.jpg',
      url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
      size: '1.8 MB',
      uploadDate: '2024-01-23',
      dimensions: '1920x1080'
    },
    {
      id: 11,
      name: 'keyboard-1.jpg',
      url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
      size: '2.3 MB',
      uploadDate: '2024-01-24',
      dimensions: '1920x1080'
    }
  ],
  banners: [
    {
      id: 12,
      name: 'hero-banner.jpg',
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop',
      size: '4.1 MB',
      uploadDate: '2024-01-20',
      dimensions: '1920x1080'
    },
    {
      id: 13,
      name: 'promo-banner.jpg',
      url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=500&fit=crop',
      size: '3.8 MB',
      uploadDate: '2024-01-25',
      dimensions: '1920x1080'
    }
  ]
}

export default function ImagesPage() {
  const [selectedFolder, setSelectedFolder] = useState<string>('root')
  const [selectedFolderName, setSelectedFolderName] = useState<string>('Images')
  const [folderStructure, setFolderStructure] = useState(initialFolderStructure)
  const [imagesData, setImagesData] = useState(initialImagesData)
  const [isAddImageDialogOpen, setIsAddImageDialogOpen] = useState(false)
  const [newImageFile, setNewImageFile] = useState<File | null>(null)

  const handleFolderSelect = (folderId: string, folderName: string) => {
    setSelectedFolder(folderId)
    setSelectedFolderName(folderName)
  }

  const handleAddFolder = (parentId: string, folderName: string) => {
    const newFolderId = `${parentId}-${folderName.toLowerCase().replace(/\s+/g, '-')}`

    const addFolderToStructure = (folders: any[]): any[] => {
      return folders.map((folder) => {
        if (folder.id === parentId) {
          return {
            ...folder,
            children: [
              ...folder.children,
              {
                id: newFolderId,
                name: folderName,
                type: 'folder' as const,
                children: []
              }
            ]
          }
        }
        if (folder.children.length > 0) {
          return {
            ...folder,
            children: addFolderToStructure(folder.children)
          }
        }
        return folder
      })
    }

    setFolderStructure(addFolderToStructure(folderStructure))

    // Initialize empty images array for new folder
    setImagesData((prev) => ({
      ...prev,
      [newFolderId]: []
    }))
  }

  const handleDeleteFolder = (folderId: string) => {
    const deleteFolderFromStructure = (folders: any[]): any[] => {
      return folders
        .map((folder) => {
          if (folder.children.length > 0) {
            return {
              ...folder,
              children: deleteFolderFromStructure(folder.children).filter((child) => child.id !== folderId)
            }
          }
          return folder
        })
        .filter((folder) => folder.id !== folderId)
    }

    setFolderStructure(deleteFolderFromStructure(folderStructure))

    // Remove images data for deleted folder
    setImagesData((prev) => {
      const newImagesData = { ...prev }
      delete newImagesData[folderId as keyof typeof newImagesData]
      return newImagesData
    })

    // If current selected folder is deleted, select root
    if (selectedFolder === folderId) {
      setSelectedFolder('root')
      setSelectedFolderName('Images')
    }
  }

  const handleAddImage = () => {
    if (newImageFile) {
      const newImage = {
        id: Date.now(),
        name: newImageFile.name,
        url: URL.createObjectURL(newImageFile),
        size: `${(newImageFile.size / 1024 / 1024).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        dimensions: '1920x1080' // In real app, you'd get this from the file
      }

      setImagesData((prev) => ({
        ...prev,
        [selectedFolder]: [...(prev[selectedFolder as keyof typeof prev] || []), newImage]
      }))

      setNewImageFile(null)
      setIsAddImageDialogOpen(false)
    }
  }

  const currentImages = imagesData[selectedFolder as keyof typeof imagesData] || []

  return (
    <div className='flex h-full flex-col'>
      <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className='hidden md:block'>
              <BreadcrumbLink href='/'>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='hidden md:block' />
            <BreadcrumbItem>
              <BreadcrumbPage>Quản lý hình ảnh</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className='flex flex-1 gap-4 p-4'>
        {/* Left sidebar - 1 column (25%) */}
        <div className='w-1/4'>
          <Card className='h-full'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <FolderTree className='h-5 w-5' />
                Thư mục
              </CardTitle>
              <CardDescription>Chọn thư mục để xem hình ảnh</CardDescription>
            </CardHeader>
            <CardContent className='p-0'>
              <FolderTreeComponent folders={folderStructure} selectedFolder={selectedFolder} onFolderSelect={handleFolderSelect} onAddFolder={handleAddFolder} onDeleteFolder={handleDeleteFolder} />
            </CardContent>
          </Card>
        </div>

        {/* Right content - 3 columns (75%) */}
        <div className='flex-1'>
          <Card className='h-full'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div>
                  <CardTitle>Hình ảnh trong "{selectedFolderName}"</CardTitle>
                  <CardDescription>{currentImages.length} hình ảnh</CardDescription>
                </div>
                <Dialog open={isAddImageDialogOpen} onOpenChange={setIsAddImageDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className='gap-2'>
                      <Plus className='h-4 w-4' />
                      Thêm hình ảnh
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                      <DialogTitle>Thêm hình ảnh mới</DialogTitle>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='image-file' className='text-right'>
                          Chọn file
                        </Label>
                        <Input id='image-file' type='file' accept='image/*' onChange={(e) => setNewImageFile(e.target.files?.[0] || null)} className='col-span-3' />
                      </div>
                      {newImageFile && (
                        <div className='grid grid-cols-4 items-center gap-4'>
                          <Label className='text-right'>Preview</Label>
                          <div className='col-span-3'>
                            <img src={URL.createObjectURL(newImageFile)} alt={newImageFile.name} className='h-20 w-20 rounded border object-cover' />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className='flex justify-end gap-2'>
                      <Button variant='outline' onClick={() => setIsAddImageDialogOpen(false)}>
                        Hủy
                      </Button>
                      <Button onClick={handleAddImage} disabled={!newImageFile}>
                        <Upload className='mr-2 h-4 w-4' />
                        Tải lên
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <ImageGallery images={currentImages} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
