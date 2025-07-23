'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { TProduct } from '@/types/product'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Save, X, Edit, Package, Monitor, Cpu, HardDrive, Battery, Calendar, DollarSign, Plus, Trash2 } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface ProductDetailDrawerProps {
  product: TProduct | null
  isOpen: boolean
  onClose: () => void
  onSave?: (product: TProduct) => void
}

export function ProductDetailDrawer({ product, isOpen, onClose, onSave }: ProductDetailDrawerProps) {
  const [isEditing, setIsEditing] = useState(true)
  const [editedProduct, setEditedProduct] = useState<TProduct | null>(null)

  useEffect(() => {
    if (product) {
      setEditedProduct({ ...product })
    }
    setIsEditing(true)
  }, [product])

  const handleSave = () => {
    if (editedProduct && onSave) {
      onSave(editedProduct)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    if (product) {
      setEditedProduct({ ...product })
    }
    setIsEditing(false)
  }

  const updateField = (field: keyof TProduct, value: any) => {
    if (editedProduct) {
      setEditedProduct({
        ...editedProduct,
        [field]: value
      })
    }
  }

  const updateOption = (optionIndex: number, field: 'name', value: string) => {
    if (editedProduct) {
      const updatedOptions = [...editedProduct.options]
      updatedOptions[optionIndex] = {
        ...updatedOptions[optionIndex],
        [field]: value
      }
      setEditedProduct({
        ...editedProduct,
        options: updatedOptions
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
                  {isEditing ? <Input id='title' value={editedProduct.title} onChange={(e) => updateField('title', e.target.value)} /> : <p className='mt-1 text-sm font-medium'>{product.title}</p>}
                </div>

                <div>
                  <Label htmlFor='description'>Mô tả</Label>
                  {isEditing ? (
                    <Textarea id='description' value={editedProduct.description} onChange={(e) => updateField('description', e.target.value)} rows={4} />
                  ) : (
                    <p className='mt-1 text-sm text-gray-600'>{product.description}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor='basePrice'>Giá cơ bản</Label>
                  {isEditing ? (
                    <Input id='basePrice' type='number' value={editedProduct.basePrice} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('basePrice', parseInt(e.target.value))} />
                  ) : (
                    <div className='mt-1 flex items-center gap-1'>
                      <DollarSign className='h-4 w-4 text-green-600' />
                      <span className='text-sm font-semibold text-green-600'>{formatPrice(product.basePrice)}đ</span>
                    </div>
                  )}
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
                        {isEditing ? (
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
                        ) : (
                          <div className='flex w-full items-center justify-between'>
                            <Badge variant='outline' className='text-xs'>
                              {variant.label}
                            </Badge>
                            {variant.priceDiff > 0 && <span className='text-xs text-green-600'>+${variant.priceDiff}</span>}
                          </div>
                        )}
                      </div>
                    ))}

                    {isEditing && (
                      <Button variant='outline' size='sm' onClick={() => addVariant(optionIndex)} className='gap-1'>
                        <Plus className='h-4 w-4' />
                        Add Variant
                      </Button>
                    )}
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
