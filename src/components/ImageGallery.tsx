'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MoreHorizontal, Download, Trash2, Edit, Eye, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface ImageItem {
  id: number
  name: string
  url: string
  size: string
  uploadDate: string
  dimensions: string
}

interface ImageGalleryProps {
  images: ImageItem[]
}

interface ImageCardProps {
  image: ImageItem
  onAction: (action: string, image: ImageItem) => void
}

function ImageCard({ image, onAction }: ImageCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card className='group overflow-hidden border-2 transition-all duration-200 hover:border-blue-200 hover:shadow-lg' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <CardContent className='relative p-0'>
        {/* Image container */}
        <div className='relative aspect-square overflow-hidden bg-gray-100'>
          <Image
            src={image.url}
            alt={image.name}
            fill
            className='object-cover transition-transform duration-200 group-hover:scale-105'
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = '/placeholder-image.jpg'
            }}
          />

          {/* Overlay with actions */}
          <div className={cn('absolute inset-0 flex items-center justify-center gap-2 bg-black/50 transition-opacity duration-200', isHovered ? 'opacity-100' : 'opacity-0')}>
            <Dialog>
              <DialogTrigger asChild>
                <Button size='sm' variant='secondary' className='bg-white/90 hover:bg-white'>
                  <Eye className='h-4 w-4' />
                </Button>
              </DialogTrigger>
              <DialogContent className='max-w-4xl'>
                <DialogHeader>
                  <DialogTitle>{image.name}</DialogTitle>
                </DialogHeader>
                <div className='flex justify-center'>
                  <div className='relative max-h-96 max-w-full'>
                    <Image src={image.url} alt={image.name} width={500} height={384} className='max-h-96 max-w-full object-contain' />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div>
                    <span className='font-medium'>Kích thước:</span> {image.dimensions}
                  </div>
                  <div>
                    <span className='font-medium'>Dung lượng:</span> {image.size}
                  </div>
                  <div>
                    <span className='font-medium'>Ngày tải lên:</span> {image.uploadDate}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button size='sm' variant='secondary' className='bg-white/90 hover:bg-white' onClick={() => onAction('download', image)}>
              <Download className='h-4 w-4' />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size='sm' variant='secondary' className='bg-white/90 hover:bg-white'>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => onAction('copy', image)}>
                  <Copy className='mr-2 h-4 w-4' />
                  Sao chép URL
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction('edit', image)}>
                  <Edit className='mr-2 h-4 w-4' />
                  Chỉnh sửa
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onAction('delete', image)} className='text-red-600 focus:text-red-600'>
                  <Trash2 className='mr-2 h-4 w-4' />
                  Xóa
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Image info */}
        <div className='space-y-2 p-3'>
          <div className='flex items-center justify-between'>
            <h3 className='truncate pr-2 text-sm font-medium' title={image.name}>
              {image.name}
            </h3>
            <Badge variant='secondary' className='text-xs'>
              {image.size}
            </Badge>
          </div>

          <div className='flex items-center justify-between text-xs text-gray-600'>
            <span>{image.dimensions}</span>
            <span>{image.uploadDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const handleAction = (action: string, image: ImageItem) => {
    switch (action) {
      case 'download':
        // Implement download functionality
        console.log('Download:', image.name)
        break
      case 'copy':
        // Copy URL to clipboard
        navigator.clipboard.writeText(image.url)
        console.log('Copied URL:', image.url)
        break
      case 'edit':
        // Implement edit functionality
        console.log('Edit:', image.name)
        break
      case 'delete':
        // Implement delete functionality
        console.log('Delete:', image.name)
        break
      default:
        break
    }
  }

  if (images.length === 0) {
    return (
      <div className='flex h-64 flex-col items-center justify-center text-gray-500'>
        <div className='mb-4 text-6xl'>📁</div>
        <h3 className='mb-2 text-lg font-medium'>Thư mục trống</h3>
        <p className='text-sm'>Không có hình ảnh nào trong thư mục này</p>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {images.map((image) => (
        <ImageCard key={image.id} image={image} onAction={handleAction} />
      ))}
    </div>
  )
}
