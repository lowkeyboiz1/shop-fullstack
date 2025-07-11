'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Share2, Check, Palette, MemoryStick, HardDrive } from 'lucide-react'
import { MacBookProduct } from '@/types/product'

interface ProductDetailClientProps {
  product: MacBookProduct
  memoryOptions: Array<{
    size: string
    label: string
    price: number
  }>
  storageOptions: Array<{
    size: string
    label: string
    price: number
  }>
  colorMapping: Record<string, string>
}

export function ProductDetailClient({ product, memoryOptions, storageOptions, colorMapping }: ProductDetailClientProps) {
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedMemory, setSelectedMemory] = useState(product.ram[0] || '8GB')
  const [selectedStorage, setSelectedStorage] = useState(product.storage[0] || '256GB')

  return (
    <div className='space-y-6'>
      {/* Memory Selection */}
      <div>
        <h3 className='mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900'>
          <MemoryStick className='h-5 w-5' />
          Memory
        </h3>
        <div className='grid gap-3'>
          {memoryOptions.map((option) => (
            <div
              key={option.size}
              onClick={() => setSelectedMemory(option.size)}
              className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
                selectedMemory === option.size ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-medium text-slate-900'>{option.label}</p>
                  {option.price > 0 && <p className='text-sm text-slate-600'>+${option.price}</p>}
                </div>
                {selectedMemory === option.size && <Check className='h-5 w-5 text-blue-500' />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Storage Selection */}
      <div>
        <h3 className='mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900'>
          <HardDrive className='h-5 w-5' />
          Storage
        </h3>
        <div className='grid gap-3'>
          {storageOptions.map((option) => (
            <div
              key={option.size}
              onClick={() => setSelectedStorage(option.size)}
              className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
                selectedStorage === option.size ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-medium text-slate-900'>{option.label}</p>
                  {option.price > 0 && <p className='text-sm text-slate-600'>+${option.price}</p>}
                </div>
                {selectedStorage === option.size && <Check className='h-5 w-5 text-blue-500' />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className='mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900'>
          <Palette className='h-5 w-5' />
          Available Colors
        </h3>
        <div className='flex gap-4'>
          {product.color.map((color, index) => (
            <div key={index} onClick={() => setSelectedColor(index)} className='group cursor-pointer text-center'>
              <div className='relative'>
                <div
                  className={`h-14 w-14 rounded-full border-4 transition-all ${selectedColor === index ? 'scale-110 border-blue-500 shadow-lg' : 'border-slate-200 group-hover:border-slate-300'}`}
                  style={{ backgroundColor: colorMapping[color] || '#c0c0c0' }}
                />
                {selectedColor === index && <Check className='absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform text-white' />}
              </div>
              <p className='mt-2 text-sm font-medium text-slate-600'>{color}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
