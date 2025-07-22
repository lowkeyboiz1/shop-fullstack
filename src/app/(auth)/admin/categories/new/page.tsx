'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'

interface Category {
  id: string
  name: string
  slug: string
}

// Mock parent categories - in real app, fetch from API
const parentCategories: Category[] = [
  { id: '1', name: 'Sản phẩm', slug: 'products' },
  { id: '2', name: 'Dịch vụ', slug: 'services' }
]

export default function NewCategoryPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parentId: ''
  })

  const handleNameChange = (value: string) => {
    setFormData({
      ...formData,
      name: value,
      // Auto-generate slug from name
      slug: value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In real app, submit to API
    console.log('Submit category:', formData)
    // Navigate back to categories list
    router.push('/admin/categories/all')
  }

  return (
    <div className='mx-auto max-w-3xl p-6'>
      <div className='mb-6'>
        <Link href='/admin/categories/all'>
          <Button variant='ghost' size='sm' className='mb-4'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Quay lại
          </Button>
        </Link>
        <h1 className='text-3xl font-bold text-gray-900'>Tạo danh mục mới</h1>
        <p className='mt-1 text-gray-500'>Thêm danh mục mới cho sản phẩm của bạn</p>
      </div>

      <Card className='p-6'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid gap-2'>
            <Label htmlFor='name'>
              Tên danh mục <span className='text-red-500'>*</span>
            </Label>
            <Input id='name' placeholder='VD: MacBook Pro' value={formData.name} onChange={(e) => handleNameChange(e.target.value)} required />
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='slug'>
              Đường dẫn (slug) <span className='text-red-500'>*</span>
            </Label>
            <Input id='slug' placeholder='VD: macbook-pro' value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} required />
            <p className='text-sm text-gray-500'>Đường dẫn URL cho danh mục. Sử dụng chữ thường, không dấu, ngăn cách bằng dấu gạch ngang</p>
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='parent'>Danh mục cha</Label>
            <select
              id='parent'
              className='border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm'
              value={formData.parentId}
              onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
            >
              <option value=''>-- Không có (Danh mục gốc) --</option>
              {parentCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <p className='text-sm text-gray-500'>Chọn danh mục cha nếu đây là danh mục con</p>
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='description'>Mô tả</Label>
            <Textarea id='description' placeholder='Mô tả ngắn về danh mục' value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} />
            <p className='text-sm text-gray-500'>Mô tả sẽ hiển thị trên trang danh mục và giúp SEO tốt hơn</p>
          </div>

          <div className='flex gap-3 pt-4'>
            <Button type='submit'>Tạo danh mục</Button>
            <Button type='button' variant='outline' onClick={() => router.push('/admin/categories/all')}>
              Hủy
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
