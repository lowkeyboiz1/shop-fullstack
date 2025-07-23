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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

export default function AdminProductsPage() {
  const [products] = useAtom(filteredProductsAtom)
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<TProduct | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
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

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const handleAction = useCallback((action: string, product: TProduct) => {
    switch (action) {
      case 'view':
        handleViewProduct(product)
        break
      case 'delete':
        handleDeleteProduct(product)
        break
    }
  }, [])

  const handleViewProduct = useCallback((product: TProduct) => {
    setSelectedProduct(product)
    setIsDrawerOpen(true)
  }, [])

  const handleDeleteProduct = useCallback((product: TProduct) => {
    setProductToDelete(product)
    setIsDeleteDialogOpen(true)
  }, [])

  const confirmDeleteProduct = useCallback(() => {
    if (productToDelete) {
      console.log('Product deleted:', productToDelete)
      // TODO: Implement delete logic (call API)

      // Close dialog and reset state
      setIsDeleteDialogOpen(false)
      setProductToDelete(null)
    }
  }, [productToDelete])

  const cancelDeleteProduct = useCallback(() => {
    setIsDeleteDialogOpen(false)
    setProductToDelete(null)
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
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <AdminProductTable
              products={paginationData.currentProducts}
              currentPage={currentPage}
              totalPages={paginationData.totalPages}
              onPageChange={handlePageChange}
              onHandleAction={handleAction}
            />
          </CardContent>
        </Card>

        {/* Product Detail Drawer */}
        <ProductDetailDrawer product={selectedProduct} isOpen={isDrawerOpen} onClose={handleCloseDrawer} onSave={handleSaveProduct} />

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xác nhận xóa sản phẩm</AlertDialogTitle>
              <AlertDialogDescription>Bạn có chắc chắn muốn xóa sản phẩm "{productToDelete?.title}"? Hành động này không thể hoàn tác.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={cancelDeleteProduct}>Hủy</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteProduct} className='bg-destructive hover:bg-destructive/90 text-white'>
                Xóa
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
