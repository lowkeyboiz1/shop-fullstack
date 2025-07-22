'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { MacBookProduct } from '@/types/product'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Save, X, Edit, Package, Monitor, Cpu, HardDrive, Battery, Calendar, DollarSign } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface ProductDetailDrawerProps {
  product: MacBookProduct | null
  isOpen: boolean
  onClose: () => void
  onSave?: (product: MacBookProduct) => void
}

export function ProductDetailDrawer({ product, isOpen, onClose, onSave }: ProductDetailDrawerProps) {
  const [isEditing, setIsEditing] = useState(true)
  const [editedProduct, setEditedProduct] = useState<MacBookProduct | null>(null)

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

  const updateField = (field: keyof MacBookProduct, value: any) => {
    if (editedProduct) {
      setEditedProduct({
        ...editedProduct,
        [field]: value
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
              <SheetTitle className='text-2xl'>{product.name}</SheetTitle>
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
                    <Image src={image} alt={`${product.name} ${index + 1}`} fill className='object-contain p-2' />
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
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='name'>Tên sản phẩm</Label>
                  {isEditing ? <Input id='name' value={editedProduct.name} onChange={(e) => updateField('name', e.target.value)} /> : <p className='mt-1 text-sm font-medium'>{product.name}</p>}
                </div>

                <div>
                  <Label htmlFor='model'>Model</Label>
                  {isEditing ? <Input id='model' value={editedProduct.model} onChange={(e) => updateField('model', e.target.value)} /> : <p className='mt-1 text-sm font-medium'>{product.model}</p>}
                </div>

                <div>
                  <Label htmlFor='price'>Giá</Label>
                  {isEditing ? (
                    <Input id='price' type='number' value={editedProduct.price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('price', parseInt(e.target.value))} />
                  ) : (
                    <div className='mt-1 flex items-center gap-1'>
                      <DollarSign className='h-4 w-4 text-green-600' />
                      <span className='text-sm font-semibold text-green-600'>{formatPrice(product.price)}đ</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor='year'>Năm ra mắt</Label>
                  {isEditing ? (
                    <Input id='year' type='number' value={editedProduct.year} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('year', parseInt(e.target.value))} />
                  ) : (
                    <div className='mt-1 flex items-center gap-1'>
                      <Calendar className='h-4 w-4 text-blue-600' />
                      <span className='text-sm font-medium'>{product.year}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor='description'>Mô tả</Label>
                {isEditing ? (
                  <Textarea id='description' value={editedProduct.description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateField('description', e.target.value)} rows={3} />
                ) : (
                  <p className='mt-1 text-sm text-gray-600'>{product.description}</p>
                )}
              </div>

              <div>
                <Label>Danh mục</Label>
                <div className='mt-1'>
                  <Badge variant={product.category === 'MacBook Pro' ? 'default' : 'secondary'}>{product.category}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Specs */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Cpu className='h-5 w-5' />
                Thông số kỹ thuật
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='chip'>Chip</Label>
                  {isEditing ? <Input id='chip' value={editedProduct.chip} onChange={(e) => updateField('chip', e.target.value)} /> : <p className='mt-1 text-sm font-medium'>{product.chip}</p>}
                </div>

                <div>
                  <Label htmlFor='weight'>Trọng lượng</Label>
                  {isEditing ? (
                    <Input id='weight' value={editedProduct.weight} onChange={(e) => updateField('weight', e.target.value)} />
                  ) : (
                    <p className='mt-1 text-sm font-medium'>{product.weight}</p>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <Label className='flex items-center gap-2'>
                  <Monitor className='h-4 w-4' />
                  Màn hình
                </Label>
                <div className='mt-2 space-y-2'>
                  <div className='grid grid-cols-2 gap-4 text-sm'>
                    <div>
                      <span className='text-gray-600'>Kích thước:</span>
                      <span className='ml-2 font-medium'>{product.display.size}</span>
                    </div>
                    <div>
                      <span className='text-gray-600'>Độ phân giải:</span>
                      <span className='ml-2 font-medium'>{product.display.resolution}</span>
                    </div>
                    <div>
                      <span className='text-gray-600'>Độ sáng:</span>
                      <span className='ml-2 font-medium'>{product.display.brightness}</span>
                    </div>
                    <div>
                      <span className='text-gray-600'>Không gian màu:</span>
                      <span className='ml-2 font-medium'>{product.display.colorSpace}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label className='flex items-center gap-2'>
                    <HardDrive className='h-4 w-4' />
                    RAM
                  </Label>
                  <div className='mt-1 flex gap-1'>
                    {product.ram.map((ram, index) => (
                      <Badge key={index} variant='outline' className='text-xs'>
                        {ram}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className='flex items-center gap-2'>
                    <HardDrive className='h-4 w-4' />
                    Lưu trữ
                  </Label>
                  <div className='mt-1 flex gap-1'>
                    {product.storage.map((storage, index) => (
                      <Badge key={index} variant='outline' className='text-xs'>
                        {storage}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <Label className='flex items-center gap-2'>
                  <Battery className='h-4 w-4' />
                  Pin
                </Label>
                <p className='mt-1 text-sm font-medium'>{product.battery}</p>
              </div>

              <div>
                <Label>Màu sắc</Label>
                <div className='mt-1 flex gap-1'>
                  {product.color.map((color, index) => (
                    <Badge key={index} variant='secondary' className='text-xs'>
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Tính năng nổi bật</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 gap-2'>
                {product.features.map((feature, index) => (
                  <div key={index} className='flex items-center gap-2 text-sm'>
                    <div className='h-1.5 w-1.5 rounded-full bg-blue-500' />
                    {feature}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sticky Save Button */}
        <div className='sticky right-0 bottom-0 left-0 flex justify-end gap-2 border-t bg-white p-4'>
          <Button onClick={handleCancel} variant='outline' className='gap-2'>
            <X className='h-4 w-4' />
            Hủy
          </Button>
          <Button onClick={handleSave} className='gap-2'>
            <Save className='h-4 w-4' />
            Lưu thay đổi
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
