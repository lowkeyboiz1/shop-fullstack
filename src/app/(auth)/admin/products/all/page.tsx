'use client'

import { useState, useCallback, useMemo } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AdminProductTable } from '@/components/AdminProductTable'
import { ProductDetailDrawer } from '@/components/ProductDetailDrawer'
import { useAtom } from 'jotai'
import { filteredProductsAtom, filterOptionsAtom, sortOptionAtom, searchQueryAtom } from '@/store/atoms'
import { TProduct } from '@/types/product'
import Link from 'next/link'

export default function AdminProductsPage() {
  const [products] = useAtom(filteredProductsAtom)
  const [filters, setFilters] = useAtom(filterOptionsAtom)
  const [sortOption, setSortOption] = useAtom(sortOptionAtom)
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const itemsPerPage = 10

  // Memoized calculations
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(products.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentProducts = products.slice(startIndex, endIndex)

    return {
      totalPages,
      startIndex,
      endIndex,
      currentProducts
    }
  }, [products, currentPage, itemsPerPage])

  // Memoized handlers to prevent re-renders
  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query)
      setCurrentPage(1)
    },
    [setSearchQuery]
  )

  const handleCategoryFilter = useCallback(
    (category: string | undefined) => {
      setFilters((prev) => ({ ...prev, category: category === 'all' ? undefined : category }))
      setCurrentPage(1)
    },
    [setFilters]
  )

  const handleSortChange = useCallback(
    (sort: string) => {
      setSortOption(sort as any)
      setCurrentPage(1)
    },
    [setSortOption]
  )

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const handleViewProduct = useCallback((product: TProduct) => {
    setSelectedProduct(product)
    setIsDrawerOpen(true)
  }, [])

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false)
    setSelectedProduct(null)
  }, [])

  const handleSaveProduct = useCallback((updatedProduct: TProduct) => {
    console.log('Product updated:', updatedProduct)
    // TODO: Implement update logic (call API)
    // For now, just close drawer
    setIsDrawerOpen(false)
  }, [])

  return (
    <div className='flex h-full flex-col'>
      {/* Header */}
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

        <Link href='/admin/products/new'>
          <Button className='gap-2'>
            <Plus className='h-4 w-4' />
            Thêm sản phẩm
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <div className='flex-1 space-y-4 p-4'>
        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
              <div>
                <CardTitle>Danh sách sản phẩm</CardTitle>
                <CardDescription>
                  Hiển thị {paginationData.startIndex + 1}-{Math.min(paginationData.endIndex, products.length)} của {products.length} sản phẩm
                </CardDescription>
              </div>

              <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
                {/* Search */}
                <div className='relative'>
                  <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
                  <Input placeholder='Tìm kiếm sản phẩm...' value={searchQuery} onChange={(e) => handleSearch(e.target.value)} className='pl-9 sm:w-64' />
                </div>

                {/* Category Filter */}
                <Select onValueChange={handleCategoryFilter} defaultValue='all'>
                  <SelectTrigger className='w-full sm:w-40'>
                    <SelectValue placeholder='Danh mục' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>Tất cả</SelectItem>
                    <SelectItem value='MacBook Air'>MacBook Air</SelectItem>
                    <SelectItem value='MacBook Pro'>MacBook Pro</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select onValueChange={handleSortChange} defaultValue='name'>
                  <SelectTrigger className='w-full sm:w-40'>
                    <SelectValue placeholder='Sắp xếp' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='name'>Tên A-Z</SelectItem>
                    <SelectItem value='price-asc'>Giá tăng dần</SelectItem>
                    <SelectItem value='price-desc'>Giá giảm dần</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <AdminProductTable
              products={paginationData.currentProducts}
              currentPage={currentPage}
              totalPages={paginationData.totalPages}
              onPageChange={handlePageChange}
              onViewProduct={handleViewProduct}
            />
          </CardContent>
        </Card>

        {/* Product Detail Drawer */}
        <ProductDetailDrawer product={selectedProduct} isOpen={isDrawerOpen} onClose={handleCloseDrawer} onSave={handleSaveProduct} />
      </div>
    </div>
  )
}
