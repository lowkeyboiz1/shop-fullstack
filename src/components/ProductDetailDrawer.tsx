'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { TProduct } from '@/types/product'
import { Cpu, HardDrive, Package, Plus, Save, Trash2, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ProductDetailDrawerProps {
  product: TProduct | null
  isOpen: boolean
  onClose: () => void
  onSave?: (product: TProduct) => void
}

export function ProductDetailDrawer({ product, isOpen, onClose, onSave }: ProductDetailDrawerProps) {
  const [editedProduct, setEditedProduct] = useState<TProduct | null>(product)

  const handleSave = () => {
    if (editedProduct && onSave) {
      onSave(editedProduct)
    }
  }

  const handleCancel = () => {
    setEditedProduct(product)
  }

  const updateField = (field: keyof TProduct, value: any) => {
    if (editedProduct) {
      setEditedProduct({
        ...editedProduct,
        [field]: value
      })
    }
  }

  const updateVariant = (optionIndex: number, variantIndex: number, field: 'label' | 'priceDiff', value: string | number) => {
    if (editedProduct) {
      const updatedOptions = [...editedProduct.options]
      const updatedVariants = [...updatedOptions[optionIndex].variants]
      updatedVariants[variantIndex] = {
        ...updatedVariants[variantIndex],
        [field]: value
      }
      updatedOptions[optionIndex] = {
        ...updatedOptions[optionIndex],
        variants: updatedVariants
      }
      setEditedProduct({
        ...editedProduct,
        options: updatedOptions
      })
    }
  }

  const addVariant = (optionIndex: number) => {
    if (editedProduct) {
      const updatedOptions = [...editedProduct.options]
      updatedOptions[optionIndex] = {
        ...updatedOptions[optionIndex],
        variants: [...updatedOptions[optionIndex].variants, { label: '', priceDiff: 0 }]
      }
      setEditedProduct({
        ...editedProduct,
        options: updatedOptions
      })
    }
  }

  const removeVariant = (optionIndex: number, variantIndex: number) => {
    if (editedProduct) {
      const updatedOptions = [...editedProduct.options]
      updatedOptions[optionIndex] = {
        ...updatedOptions[optionIndex],
        variants: updatedOptions[optionIndex].variants.filter((_, idx) => idx !== variantIndex)
      }
      setEditedProduct({
        ...editedProduct,
        options: updatedOptions
      })
    }
  }

  if (!product || !editedProduct) return null

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='w-[80vw] overflow-y-auto sm:max-w-none'>
        <SheetHeader>
          <div className='flex items-center justify-between'>
            <div>
              <SheetTitle className='text-2xl'>{product.title}</SheetTitle>
              <SheetDescription>Chi tiết và chỉnh sửa thông tin sản phẩm</SheetDescription>
            </div>
            <div className='flex gap-2'>
              <Button onClick={handleSave} className='gap-2'>
                <Save className='h-4 w-4' />
                Lưu
              </Button>
              <Button onClick={handleCancel} variant='outline' className='gap-2'>
                <X className='h-4 w-4' />
                Hủy
              </Button>
            </div>
          </div>
        </SheetHeader>

        <div className='space-y-6 p-4 pb-20'>
          {/* Product Images */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Package className='h-5 w-5' />
                Hình ảnh sản phẩm
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 gap-4'>
                {product.images.slice(0, 4).map((image, index) => (
                  <div key={index} className='relative aspect-square overflow-hidden rounded-lg border'>
                    <Image src={image} alt={`${product.title} ${index + 1}`} fill className='object-contain p-2' />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 gap-4'>
                <div>
                  <Label htmlFor='title'>Tên sản phẩm</Label>
                  <Input id='title' value={editedProduct.title} onChange={(e) => updateField('title', e.target.value)} />
                </div>

                <div>
                  <Label htmlFor='description'>Mô tả</Label>
                  <Textarea id='description' value={editedProduct.description} onChange={(e) => updateField('description', e.target.value)} rows={4} />
                </div>

                <div>
                  <Label htmlFor='basePrice'>Giá cơ bản</Label>
                  <Input id='basePrice' type='number' value={editedProduct.basePrice} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('basePrice', parseInt(e.target.value))} />
                </div>

                <div>
                  <Label>Màu sắc</Label>
                  <div className='mt-1 flex flex-wrap gap-1'>
                    {product.colors.map((color, index) => (
                      <Badge key={index} variant='secondary' className='text-xs'>
                        {color}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Options and Variants */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Cpu className='h-5 w-5' />
                Tùy chọn sản phẩm
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {editedProduct.options.map((option, optionIndex) => (
                <div key={optionIndex} className='space-y-3 rounded-lg border p-4'>
                  <div className='flex items-center gap-2'>
                    {option.name === 'RAM' && <HardDrive className='h-4 w-4' />}
                    {option.name === 'Storage' && <HardDrive className='h-4 w-4' />}
                    {option.name === 'Processor' && <Cpu className='h-4 w-4' />}
                    <Label className='font-medium'>{option.name}</Label>
                  </div>

                  <div className='space-y-2'>
                    {option.variants.map((variant, variantIndex) => (
                      <div key={variantIndex} className='flex items-center gap-2'>
                        <>
                          <Input placeholder='Variant label' value={variant.label} onChange={(e) => updateVariant(optionIndex, variantIndex, 'label', e.target.value)} className='flex-1' />
                          <Input
                            type='number'
                            placeholder='Price diff'
                            value={variant.priceDiff}
                            onChange={(e) => updateVariant(optionIndex, variantIndex, 'priceDiff', parseInt(e.target.value) || 0)}
                            className='w-24'
                          />
                          <Button variant='outline' size='sm' onClick={() => removeVariant(optionIndex, variantIndex)}>
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </>
                      </div>
                    ))}

                    <Button variant='outline' size='sm' onClick={() => addVariant(optionIndex)} className='gap-1'>
                      <Plus className='h-4 w-4' />
                      Add Variant
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  )
}
