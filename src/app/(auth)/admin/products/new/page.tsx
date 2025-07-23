'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ProductVariant, TProduct } from '@/types/product'
import { ArrowLeft, Plus, Trash2, Image as ImageIcon, Eye } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Image Preview Component
const ImagePreview = ({ src, alt }: { src: string; alt: string }) => {
  const [showPreview, setShowPreview] = useState(false)
  const [imageError, setImageError] = useState(false)

  if (!src.trim()) return null

  return (
    <div className='flex items-center gap-2'>
      <Button type='button' variant='outline' size='sm' onClick={() => setShowPreview(!showPreview)} className='h-8 px-2'>
        <Eye className='h-4 w-4' />
      </Button>
      {showPreview && (
        <div className='relative'>
          {!imageError ? (
            <img src={src} alt={alt} className='h-16 w-16 rounded-md border object-cover' onError={() => setImageError(true)} />
          ) : (
            <div className='flex h-16 w-16 items-center justify-center rounded-md border bg-gray-100'>
              <ImageIcon className='h-6 w-6 text-gray-400' />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Color Badge Component
const ColorBadge = ({ color }: { color: string }) => {
  if (!color.trim()) return null

  return (
    <div className='flex items-center gap-2 rounded-md bg-gray-100 px-2 py-1 text-sm'>
      <div className='h-3 w-3 rounded-full border' style={{ backgroundColor: color.toLowerCase() }} />
      <span>{color}</span>
    </div>
  )
}

// Option Group Component
const OptionGroup = ({
  option,
  optionIndex,
  onUpdateOptionName,
  onUpdateVariant,
  onAddVariant,
  onRemoveVariant,
  onRemoveOption,
  canRemoveOption
}: {
  option: { name: string; variants: ProductVariant[] }
  optionIndex: number
  onUpdateOptionName: (optionIndex: number, name: string) => void
  onUpdateVariant: (optionIndex: number, variantIndex: number, field: keyof ProductVariant, value: string | number) => void
  onAddVariant: (optionIndex: number) => void
  onRemoveVariant: (optionIndex: number, variantIndex: number) => void
  onRemoveOption: (optionIndex: number) => void
  canRemoveOption: boolean
}) => (
  <div className='space-y-4 rounded-lg border border-gray-200 bg-gray-50/50 p-4'>
    <div className='flex items-center gap-2'>
      <Input value={option.name} onChange={(e) => onUpdateOptionName(optionIndex, e.target.value)} placeholder='Tên tùy chọn (VD: RAM, Storage, Processor)' className='flex-1 bg-white' />
      {canRemoveOption && (
        <Button type='button' onClick={() => onRemoveOption(optionIndex)} size='sm' variant='outline' className='text-red-600 hover:bg-red-50'>
          <Trash2 className='h-4 w-4' />
        </Button>
      )}
    </div>

    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <Label className='text-sm font-medium'>Biến thể</Label>
        <Button type='button' onClick={() => onAddVariant(optionIndex)} size='sm' variant='outline' className='h-8'>
          <Plus className='mr-1 h-3 w-3' />
          Thêm biến thể
        </Button>
      </div>

      <div className='space-y-2'>
        {option.variants.map((variant, variantIndex) => (
          <div key={variantIndex} className='flex items-center gap-2'>
            <Input
              value={variant.label}
              onChange={(e) => onUpdateVariant(optionIndex, variantIndex, 'label', e.target.value)}
              placeholder='Nhãn biến thể (VD: 8GB, 16GB)'
              className='flex-1 bg-white'
            />
            <div className='flex items-center gap-1'>
              <span className='text-sm text-gray-500'>$</span>
              <Input
                type='number'
                value={variant.priceDiff}
                onChange={(e) => onUpdateVariant(optionIndex, variantIndex, 'priceDiff', parseInt(e.target.value) || 0)}
                placeholder='±0'
                className='w-20 bg-white text-center'
              />
            </div>
            {option.variants.length > 1 && (
              <Button type='button' onClick={() => onRemoveVariant(optionIndex, variantIndex)} size='sm' variant='outline' className='text-red-600 hover:bg-red-50'>
                <Trash2 className='h-4 w-4' />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default function NewProductPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [product, setProduct] = useState<TProduct>({
    images: [''],
    title: '',
    description: '',
    basePrice: 0,
    colors: [''],
    options: [
      {
        name: 'RAM',
        variants: [{ label: '8GB', priceDiff: 0 }]
      },
      {
        name: 'Storage',
        variants: [{ label: '256GB SSD', priceDiff: 0 }]
      },
      {
        name: 'Processor',
        variants: [{ label: 'Apple M3', priceDiff: 0 }]
      }
    ]
  })

  const updateField = (field: keyof TProduct, value: any) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value
    }))
    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const updateImage = (index: number, value: string) => {
    const newImages = [...product.images]
    newImages[index] = value
    setProduct((prev) => ({
      ...prev,
      images: newImages
    }))
  }

  const addImage = () => {
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, '']
    }))
  }

  const removeImage = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const updateColor = (index: number, value: string) => {
    const newColors = [...product.colors]
    newColors[index] = value
    setProduct((prev) => ({
      ...prev,
      colors: newColors
    }))
  }

  const addColor = () => {
    setProduct((prev) => ({
      ...prev,
      colors: [...prev.colors, '']
    }))
  }

  const removeColor = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }))
  }

  const updateOptionName = (optionIndex: number, name: string) => {
    const newOptions = [...product.options]
    newOptions[optionIndex] = {
      ...newOptions[optionIndex],
      name
    }
    setProduct((prev) => ({
      ...prev,
      options: newOptions
    }))
  }

  const updateVariant = (optionIndex: number, variantIndex: number, field: keyof ProductVariant, value: string | number) => {
    const newOptions = [...product.options]
    const newVariants = [...newOptions[optionIndex].variants]
    newVariants[variantIndex] = {
      ...newVariants[variantIndex],
      [field]: value
    }
    newOptions[optionIndex] = {
      ...newOptions[optionIndex],
      variants: newVariants
    }
    setProduct((prev) => ({
      ...prev,
      options: newOptions
    }))
  }

  const addVariant = (optionIndex: number) => {
    const newOptions = [...product.options]
    newOptions[optionIndex] = {
      ...newOptions[optionIndex],
      variants: [...newOptions[optionIndex].variants, { label: '', priceDiff: 0 }]
    }
    setProduct((prev) => ({
      ...prev,
      options: newOptions
    }))
  }

  const removeVariant = (optionIndex: number, variantIndex: number) => {
    const newOptions = [...product.options]
    newOptions[optionIndex] = {
      ...newOptions[optionIndex],
      variants: newOptions[optionIndex].variants.filter((_, i) => i !== variantIndex)
    }
    setProduct((prev) => ({
      ...prev,
      options: newOptions
    }))
  }

  const addOption = () => {
    setProduct((prev) => ({
      ...prev,
      options: [...prev.options, { name: '', variants: [{ label: '', priceDiff: 0 }] }]
    }))
  }

  const removeOption = (optionIndex: number) => {
    setProduct((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== optionIndex)
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!product.title.trim()) {
      newErrors.title = 'Tên sản phẩm là bắt buộc'
    }

    if (!product.description.trim()) {
      newErrors.description = 'Mô tả sản phẩm là bắt buộc'
    }

    if (product.basePrice <= 0) {
      newErrors.basePrice = 'Giá cơ bản phải lớn hơn 0'
    }

    const validImages = product.images.filter((img) => img.trim() !== '')
    if (validImages.length === 0) {
      newErrors.images = 'Ít nhất một hình ảnh là bắt buộc'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Filter out empty values
      const cleanProduct: TProduct = {
        ...product,
        images: product.images.filter((img) => img.trim() !== ''),
        colors: product.colors.filter((color) => color.trim() !== ''),
        options: product.options
          .filter((option) => option.name.trim() !== '' && option.variants.some((variant) => variant.label.trim() !== ''))
          .map((option) => ({
            ...option,
            variants: option.variants.filter((variant) => variant.label.trim() !== '')
          }))
      }

      console.log('Creating product:', cleanProduct)

      // TODO: Submit to API
      // const response = await fetch('/api/products', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(cleanProduct)
      // })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      router.push('/admin/products/all')
    } catch (error) {
      console.error('Error creating product:', error)
      setErrors({ submit: 'Có lỗi xảy ra khi tạo sản phẩm' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50/50'>
      <div className='mx-auto max-w-5xl p-6'>
        <div className='mb-8'>
          <Link href='/admin/products/all'>
            <Button variant='ghost' size='sm' className='mb-4 text-gray-600 hover:text-gray-900'>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Quay lại danh sách sản phẩm
            </Button>
          </Link>
          <div className='space-y-2'>
            <h1 className='text-4xl font-bold text-gray-900'>Tạo sản phẩm mới</h1>
            <p className='text-lg text-gray-600'>Thêm sản phẩm mới với cấu trúc tùy chọn linh hoạt</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='space-y-8'>
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className='text-xl'>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid gap-6 md:grid-cols-2'>
                <div className='md:col-span-2'>
                  <Label htmlFor='title' className='text-sm font-medium'>
                    Tên sản phẩm *
                  </Label>
                  <Input
                    id='title'
                    value={product.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder='VD: MacBook Pro 14" (M3, 2024)'
                    className={`mt-1 ${errors.title ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.title && <p className='mt-1 text-sm text-red-600'>{errors.title}</p>}
                </div>

                <div className='md:col-span-2'>
                  <Label htmlFor='description' className='text-sm font-medium'>
                    Mô tả sản phẩm *
                  </Label>
                  <Textarea
                    id='description'
                    value={product.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    placeholder='Mô tả chi tiết về sản phẩm, tính năng nổi bật...'
                    rows={4}
                    className={`mt-1 ${errors.description ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.description && <p className='mt-1 text-sm text-red-600'>{errors.description}</p>}
                </div>

                <div>
                  <Label htmlFor='basePrice' className='text-sm font-medium'>
                    Giá cơ bản (USD) *
                  </Label>
                  <Input
                    id='basePrice'
                    type='number'
                    value={product.basePrice}
                    onChange={(e) => updateField('basePrice', parseInt(e.target.value) || 0)}
                    placeholder='1999'
                    className={`mt-1 ${errors.basePrice ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.basePrice && <p className='mt-1 text-sm text-red-600'>{errors.basePrice}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center justify-between text-xl'>
                Hình ảnh sản phẩm
                <Button type='button' onClick={addImage} size='sm' variant='outline'>
                  <Plus className='mr-1 h-4 w-4' />
                  Thêm ảnh
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {product.images.map((image, index) => (
                <div key={index} className='flex items-center gap-3'>
                  <Input value={image} onChange={(e) => updateImage(index, e.target.value)} placeholder='URL hình ảnh hoặc đường dẫn...' className='flex-1' />
                  <ImagePreview src={image} alt={`Product image ${index + 1}`} />
                  {product.images.length > 1 && (
                    <Button type='button' onClick={() => removeImage(index)} size='sm' variant='outline' className='text-red-600 hover:bg-red-50'>
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  )}
                </div>
              ))}
              {errors.images && <p className='text-sm text-red-600'>{errors.images}</p>}
            </CardContent>
          </Card>

          {/* Colors */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center justify-between text-xl'>
                Màu sắc có sẵn
                <Button type='button' onClick={addColor} size='sm' variant='outline'>
                  <Plus className='mr-1 h-4 w-4' />
                  Thêm màu
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-3 sm:grid-cols-2'>
                {product.colors.map((color, index) => (
                  <div key={index} className='flex items-center gap-2'>
                    <Input value={color} onChange={(e) => updateColor(index, e.target.value)} placeholder='Tên màu (VD: Space Gray, Silver, ...)' className='flex-1' />
                    {product.colors.length > 1 && (
                      <Button type='button' onClick={() => removeColor(index)} size='sm' variant='outline' className='text-red-600 hover:bg-red-50'>
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Color Preview */}
              <div className='flex flex-wrap gap-2 pt-2'>
                {product.colors
                  .filter((color) => color.trim() !== '')
                  .map((color, index) => (
                    <ColorBadge key={index} color={color} />
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Options and Variants */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center justify-between text-xl'>
                Tùy chọn sản phẩm
                <Button type='button' onClick={addOption} size='sm' variant='outline'>
                  <Plus className='mr-1 h-4 w-4' />
                  Thêm tùy chọn
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {product.options.map((option, optionIndex) => (
                <OptionGroup
                  key={optionIndex}
                  option={option}
                  optionIndex={optionIndex}
                  onUpdateOptionName={updateOptionName}
                  onUpdateVariant={updateVariant}
                  onAddVariant={addVariant}
                  onRemoveVariant={removeVariant}
                  onRemoveOption={removeOption}
                  canRemoveOption={product.options.length > 1}
                />
              ))}
            </CardContent>
          </Card>

          {/* Submit */}
          <div className='flex flex-col-reverse gap-4 sm:flex-row sm:justify-end'>
            <Button type='button' variant='outline' onClick={() => router.back()} disabled={isSubmitting} className='sm:w-auto'>
              Hủy
            </Button>
            <Button type='submit' disabled={isSubmitting} className='sm:w-auto'>
              {isSubmitting ? 'Đang tạo...' : 'Tạo sản phẩm'}
            </Button>
          </div>

          {errors.submit && (
            <div className='rounded-md bg-red-50 p-4'>
              <p className='text-sm text-red-600'>{errors.submit}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
