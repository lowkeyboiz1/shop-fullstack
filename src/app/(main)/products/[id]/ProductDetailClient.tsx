'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Share2, Check, Palette, MemoryStick, HardDrive } from 'lucide-react'
import { TProduct } from '@/types/product'
import { calculateProductPrice, getDefaultSelectedOptions } from '@/lib/utils'

interface ProductDetailClientProps {
  product: TProduct
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => getDefaultSelectedOptions(product))

  // Calculate total price based on selected options
  const totalPrice = calculateProductPrice(product, selectedOptions)

  const handleOptionChange = (optionName: string, variantLabel: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: variantLabel
    }))
  }

  return (
    <div className='space-y-6'>
      {/* Options Selection */}
      {product.options.map((option) => (
        <div key={option.name}>
          <h3 className='mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900'>
            {option.name === 'RAM' && <MemoryStick className='h-5 w-5' />}
            {option.name === 'Storage' && <HardDrive className='h-5 w-5' />}
            {option.name === 'Processor' && <MemoryStick className='h-5 w-5' />}
            {option.name}
          </h3>
          <div className='grid gap-3'>
            {option.variants.map((variant) => (
              <div
                key={variant.label}
                onClick={() => handleOptionChange(option.name, variant.label)}
                className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
                  selectedOptions[option.name] === variant.label ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium text-slate-900'>{variant.label}</p>
                    {variant.priceDiff > 0 && <p className='text-sm text-slate-600'>+${variant.priceDiff}</p>}
                    {variant.priceDiff === 0 && <p className='text-sm text-green-600'>Included</p>}
                  </div>
                  {selectedOptions[option.name] === variant.label && <Check className='h-5 w-5 text-blue-500' />}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Color Selection */}
      <div>
        <h3 className='mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900'>
          <Palette className='h-5 w-5' />
          Available Colors
        </h3>
        <div className='flex gap-4'>
          {product.colors.map((color, index) => (
            <div key={index} onClick={() => setSelectedColor(index)} className='group cursor-pointer text-center'>
              <div className='relative'>
                <div
                  className={`h-14 w-14 rounded-full border-4 transition-all ${selectedColor === index ? 'scale-110 border-blue-500 shadow-lg' : 'border-slate-200 group-hover:border-slate-300'}`}
                  style={{
                    backgroundColor: getColorValue(color)
                  }}
                />
                {selectedColor === index && <Check className='absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform text-white' />}
              </div>
              <p className='mt-2 text-sm font-medium text-slate-600'>{color}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Price and Add to Cart */}
      <div className='space-y-4 rounded-xl bg-slate-50 p-6'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm text-slate-600'>Total Price</p>
            <p className='text-3xl font-bold text-slate-900'>${totalPrice.toLocaleString()}</p>
          </div>
          <div className='flex gap-3'>
            <Button variant='outline' size='icon'>
              <Heart className='h-4 w-4' />
            </Button>
            <Button variant='outline' size='icon'>
              <Share2 className='h-4 w-4' />
            </Button>
          </div>
        </div>

        <Button className='w-full' size='lg'>
          Add to Cart
        </Button>

        <div className='text-center text-sm text-slate-600'>Free delivery and returns</div>
      </div>
    </div>
  )
}

// Helper function to get color values
function getColorValue(colorName: string): string {
  const colorMapping: Record<string, string> = {
    Midnight: '#1a1a1a',
    Starlight: '#f5f5dc',
    'Space Gray': '#7d7d7d',
    Silver: '#c0c0c0',
    'Space Black': '#2c2c2c',
    Gold: '#ffd700',
    'Rose Gold': '#e8b4a0'
  }
  return colorMapping[colorName] || '#c0c0c0'
}
