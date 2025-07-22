'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MacBookProduct } from '@/types/product'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Edit, Trash2, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface AdminProductTableProps {
  products: MacBookProduct[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onViewProduct?: (product: MacBookProduct) => void
}

interface ProductRowProps {
  product: MacBookProduct
  index: number
  onViewProduct?: (product: MacBookProduct) => void
}

function ProductRow({ product, index, onViewProduct }: ProductRowProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleAction = (action: string) => {
    console.log(`${action}:`, product.id)
    setIsMenuOpen(false)

    if (action === 'view' && onViewProduct) {
      onViewProduct(product)
    }
    // TODO: Implement other CRUD actions
  }

  return (
    <tr className={`group hover:bg-muted/50 border-b transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
      {/* Product Image & Name */}
      <td className='p-4'>
        <div className='flex items-center space-x-3'>
          <div className='relative h-12 w-12 overflow-hidden rounded-lg border bg-gray-50'>
            <Image
              src={
                product.images[0] ||
                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIzNiIgZmlsbD0iIzlDQTNBRiI+TWFjQm9vazwvdGV4dD4KPC9zdmc+'
              }
              alt={product.name}
              fill
              className='object-contain p-1'
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src =
                  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIzNiIgZmlsbD0iIzlDQTNBRiI+TWFjQm9vazwvdGV4dD4KPC9zdmc+'
              }}
            />
          </div>
          <div className='min-w-0 flex-1'>
            <Link href={`/products/${product.id}`} className='group-hover:text-blue-600'>
              <p className='text-sm font-medium text-gray-900 transition-colors'>{product.name}</p>
              <p className='text-xs text-gray-500'>{product.model}</p>
            </Link>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className='p-4'>
        <Badge variant={product.category === 'MacBook Pro' ? 'default' : 'secondary'} className='text-xs'>
          {product.category}
        </Badge>
      </td>

      {/* Chip */}
      <td className='p-4'>
        <div className='text-sm text-gray-900'>{product.chip}</div>
        <div className='text-xs text-gray-500'>{product.chipDetails.cpu}</div>
      </td>

      {/* RAM & Storage */}
      <td className='p-4'>
        <div className='text-sm text-gray-900'>
          {product.ram[0]} / {product.storage[0]}
        </div>
        <div className='text-xs text-gray-500'>
          {product.ram.length > 1 && `+${product.ram.length - 1} RAM`}
          {product.storage.length > 1 && ` | +${product.storage.length - 1} Storage`}
        </div>
      </td>

      {/* Price */}
      <td className='p-4'>
        <div className='text-sm font-semibold text-red-600'>{formatPrice(product.price)}đ</div>
      </td>

      {/* Year */}
      <td className='p-4'>
        <div className='text-sm text-gray-900'>{product.year}</div>
      </td>

      {/* Actions */}
      <td className='p-4'>
        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-40'>
            <DropdownMenuItem onClick={() => handleAction('view')}>
              <Eye className='mr-2 h-4 w-4' />
              Xem chi tiết
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleAction('delete')} className='text-red-600 focus:text-red-600'>
              <Trash2 className='mr-2 h-4 w-4' />
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  )
}

export function AdminProductTable({ products, currentPage, totalPages, onPageChange, onViewProduct }: AdminProductTableProps) {
  const generatePageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  if (products.length === 0) {
    return (
      <div className='flex h-64 flex-col items-center justify-center text-gray-500'>
        <div className='mb-4 text-6xl'>📦</div>
        <h3 className='mb-2 text-lg font-medium'>Không có sản phẩm</h3>
        <p className='text-sm'>Không tìm thấy sản phẩm nào với bộ lọc hiện tại</p>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      {/* Table */}
      <div className='overflow-hidden rounded-lg border'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase'>Sản phẩm</th>
                <th className='px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase'>Danh mục</th>
                <th className='px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase'>Chip</th>
                <th className='px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase'>RAM / Storage</th>
                <th className='px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase'>Giá</th>
                <th className='px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase'>Năm</th>
                <th className='px-4 py-3 text-right text-xs font-medium tracking-wide text-gray-500 uppercase'>Thao tác</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 bg-white'>
              {products.map((product, index) => (
                <ProductRow key={product.id} product={product} index={index} onViewProduct={onViewProduct} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex items-center justify-between'>
          <div className='text-sm text-gray-500'>
            Trang {currentPage} của {totalPages}
          </div>

          <div className='flex items-center space-x-1'>
            <Button variant='outline' size='sm' onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className='gap-1'>
              <ChevronLeft className='h-4 w-4' />
              Trước
            </Button>

            <div className='flex items-center space-x-1'>
              {generatePageNumbers().map((page, index) => (
                <Button
                  key={index}
                  variant={page === currentPage ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => typeof page === 'number' && onPageChange(page)}
                  disabled={page === '...'}
                  className='min-w-[36px]'
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button variant='outline' size='sm' onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className='gap-1'>
              Sau
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
