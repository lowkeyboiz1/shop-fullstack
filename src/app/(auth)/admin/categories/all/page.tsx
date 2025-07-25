'use client'

import { Badge } from '@/components/ui/badge'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArrowUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Edit2, Plus, Search, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import Link from 'next/link'

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  parentId?: string
  parentName?: string
  productCount: number
  createdAt: Date
  status: 'active' | 'inactive'
}

// Expanded mock data for pagination testing
const generateMockCategories = (): Category[] => {
  const baseCategories: Category[] = [
    {
      id: '1',
      name: 'Sản phẩm',
      slug: 'products',
      productCount: 45,
      createdAt: new Date('2024-01-01'),
      status: 'active'
    },
    {
      id: '1-1',
      name: 'MacBook Air',
      slug: 'macbook-air',
      description: 'Laptop mỏng nhẹ, hiệu suất cao',
      parentId: '1',
      parentName: 'Sản phẩm',
      productCount: 12,
      createdAt: new Date('2024-01-02'),
      status: 'active'
    },
    {
      id: '1-2',
      name: 'MacBook Pro',
      slug: 'macbook-pro',
      description: 'Laptop chuyên nghiệp cho công việc nặng',
      parentId: '1',
      parentName: 'Sản phẩm',
      productCount: 18,
      createdAt: new Date('2024-01-03'),
      status: 'active'
    },
    {
      id: '1-3',
      name: 'iMac',
      slug: 'imac',
      description: 'Máy tính để bàn All-in-One',
      parentId: '1',
      parentName: 'Sản phẩm',
      productCount: 8,
      createdAt: new Date('2024-01-04'),
      status: 'active'
    },
    {
      id: '1-4',
      name: 'Mac mini',
      slug: 'mac-mini',
      description: 'Máy tính để bàn nhỏ gọn',
      parentId: '1',
      parentName: 'Sản phẩm',
      productCount: 7,
      createdAt: new Date('2024-01-05'),
      status: 'active'
    },
    {
      id: '2',
      name: 'Dịch vụ',
      slug: 'services',
      productCount: 0,
      createdAt: new Date('2024-01-06'),
      status: 'active'
    },
    {
      id: '2-1',
      name: 'Bảo hành',
      slug: 'warranty',
      description: 'Dịch vụ bảo hành chính hãng',
      parentId: '2',
      parentName: 'Dịch vụ',
      productCount: 0,
      createdAt: new Date('2024-01-07'),
      status: 'active'
    },
    {
      id: '2-2',
      name: 'Sửa chữa',
      slug: 'repair',
      description: 'Dịch vụ sửa chữa chuyên nghiệp',
      parentId: '2',
      parentName: 'Dịch vụ',
      productCount: 0,
      createdAt: new Date('2024-01-08'),
      status: 'active'
    },
    {
      id: '2-3',
      name: 'Tư vấn',
      slug: 'consultation',
      description: 'Tư vấn chọn máy phù hợp',
      parentId: '2',
      parentName: 'Dịch vụ',
      productCount: 0,
      createdAt: new Date('2024-01-09'),
      status: 'active'
    }
  ]

  // Add more mock data for pagination
  const additionalCategories: Category[] = []
  for (let i = 3; i <= 10; i++) {
    additionalCategories.push({
      id: `${i}`,
      name: `Danh mục ${i}`,
      slug: `category-${i}`,
      productCount: (i * 7) % 50, // Deterministic value based on i
      createdAt: new Date(`2024-01-${10 + i}`),
      status: i % 4 === 0 ? 'inactive' : 'active' // Deterministic status based on i
    })

    // Add some subcategories
    for (let j = 1; j <= 3; j++) {
      additionalCategories.push({
        id: `${i}-${j}`,
        name: `Danh mục con ${i}-${j}`,
        slug: `subcategory-${i}-${j}`,
        description: `Mô tả cho danh mục con ${i}-${j}`,
        parentId: `${i}`,
        parentName: `Danh mục ${i}`,
        productCount: (i * j * 3) % 20, // Deterministic value based on i and j
        createdAt: new Date(`2024-01-${10 + i}`),
        status: (i + j) % 3 === 0 ? 'inactive' : 'active' // Deterministic status based on i and j
      })
    }
  }

  return [...baseCategories, ...additionalCategories]
}

type SortField = 'name' | 'productCount' | 'createdAt' | 'status'
type SortOrder = 'asc' | 'desc'

export default function CategoriesPage() {
  const [categories] = useState<Category[]>(generateMockCategories())
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  // Filter and sort categories
  const filteredAndSortedCategories = useMemo(() => {
    let filtered = categories.filter((category) => {
      const matchesSearch =
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (category.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)

      const matchesStatus = filterStatus === 'all' || category.status === filterStatus

      return matchesSearch && matchesStatus
    })

    // Sort
    filtered.sort((a, b) => {
      let aValue: any = a[sortField]
      let bValue: any = b[sortField]

      if (sortField === 'createdAt') {
        aValue = aValue.getTime()
        bValue = bValue.getTime()
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [categories, searchTerm, filterStatus, sortField, sortOrder])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCategories.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredAndSortedCategories.slice(startIndex, endIndex)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const parentCategories = categories.filter((cat) => !cat.parentId)

  return (
    <div className='mx-auto w-full max-w-7xl'>
      <header className='sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-white px-4'>
        <div className='flex items-center gap-2'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mr-2 h-4' />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className='hidden md:block'>
                <BreadcrumbLink href='/admin'>Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='hidden md:block' />
              <BreadcrumbItem>
                <BreadcrumbPage>Quản lý sản phẩm</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <Link href='/admin/categories/new'>
          <Button className='gap-2'>
            <Plus className='h-4 w-4' />
            Thêm danh mục
          </Button>
        </Link>
      </header>
      {/* Filters and Search */}
      <div className='flex flex-col gap-4 p-6 pb-4 sm:flex-row'>
        <div className='flex-1'>
          <div className='relative'>
            <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
            <Input
              placeholder='Tìm kiếm danh mục...'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className='pl-10'
            />
          </div>
        </div>
        <Select
          value={filterStatus}
          onValueChange={(value: any) => {
            setFilterStatus(value)
            setCurrentPage(1)
          }}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả trạng thái</SelectItem>
            <SelectItem value='active'>Hoạt động</SelectItem>
            <SelectItem value='inactive'>Không hoạt động</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => {
            setItemsPerPage(Number(value))
            setCurrentPage(1)
          }}
        >
          <SelectTrigger className='w-[100px]'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='10'>10</SelectItem>
            <SelectItem value='20'>20</SelectItem>
            <SelectItem value='50'>50</SelectItem>
            <SelectItem value='100'>100</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className='m-6 mt-0 p-2 pt-0'>
        <div className='overflow-x-auto'>
          <Table className=''>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[50px]'>STT</TableHead>
                <TableHead>
                  <button className='flex items-center gap-1 font-medium hover:text-gray-900' onClick={() => handleSort('name')}>
                    Tên danh mục
                    <ArrowUpDown className='h-4 w-4' />
                  </button>
                </TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Danh mục cha</TableHead>
                <TableHead>
                  <button className='flex items-center gap-1 font-medium hover:text-gray-900' onClick={() => handleSort('productCount')}>
                    Sản phẩm
                    <ArrowUpDown className='h-4 w-4' />
                  </button>
                </TableHead>
                <TableHead>
                  <button className='flex items-center gap-1 font-medium hover:text-gray-900' onClick={() => handleSort('status')}>
                    Trạng thái
                    <ArrowUpDown className='h-4 w-4' />
                  </button>
                </TableHead>
                <TableHead>
                  <button className='flex items-center gap-1 font-medium hover:text-gray-900' onClick={() => handleSort('createdAt')}>
                    Ngày tạo
                    <ArrowUpDown className='h-4 w-4' />
                  </button>
                </TableHead>
                <TableHead className='text-right whitespace-nowrap'>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className='py-8 text-center text-gray-500'>
                    Không tìm thấy danh mục nào
                  </TableCell>
                </TableRow>
              ) : (
                currentItems.map((category, index) => (
                  <TableRow key={category.id}>
                    <TableCell className='font-medium'>{startIndex + index + 1}</TableCell>
                    <TableCell>
                      <div>
                        <p className='font-medium'>{category.name}</p>
                        {category.description && <p className='mt-1 text-sm text-gray-500'>{category.description}</p>}
                      </div>
                    </TableCell>
                    <TableCell className='text-gray-500'>/{category.slug}</TableCell>
                    <TableCell>{category.parentName ? <Badge variant='outline'>{category.parentName}</Badge> : <span className='text-gray-400'>—</span>}</TableCell>
                    <TableCell>
                      <Badge variant='secondary'>{category.productCount}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={category.status === 'active' ? 'default' : 'secondary'} className={category.status === 'active' ? 'bg-green-100 text-green-800' : ''}>
                        {category.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-gray-500'>{category.createdAt.toLocaleDateString('vi-VN')}</TableCell>
                    <TableCell className='text-right'>
                      <div className='flex justify-end gap-2'>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => {
                            setEditingCategory(category)
                            setIsAddDialogOpen(true)
                          }}
                        >
                          <Edit2 className='h-4 w-4' />
                        </Button>
                        <Button variant='ghost' size='sm' className='text-red-600 hover:text-red-700'>
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex items-center justify-between border-t p-4'>
            <div className='text-sm text-gray-500'>
              Hiển thị {startIndex + 1} - {Math.min(endIndex, filteredAndSortedCategories.length)} trong tổng số {filteredAndSortedCategories.length} danh mục
            </div>
            <div className='flex items-center gap-2'>
              <Button variant='outline' size='sm' onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                <ChevronsLeft className='h-4 w-4' />
              </Button>
              <Button variant='outline' size='sm' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                <ChevronLeft className='h-4 w-4' />
              </Button>

              <div className='flex items-center gap-1'>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  if (pageNum < 1 || pageNum > totalPages) return null

                  return (
                    <Button key={pageNum} variant={currentPage === pageNum ? 'default' : 'outline'} size='sm' onClick={() => handlePageChange(pageNum)} className='min-w-[40px]'>
                      {pageNum}
                    </Button>
                  )
                })}
              </div>

              <Button variant='outline' size='sm' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                <ChevronRight className='h-4 w-4' />
              </Button>
              <Button variant='outline' size='sm' onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
                <ChevronsRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
