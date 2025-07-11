'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MacBookProduct, ProductCardProps } from '@/types/product'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Monitor, Battery, ArrowRight, HardDrive } from 'lucide-react'
import { formatPrice, getTagColor } from '@/lib/utils'

export function ProductCard({ product, tag }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className='group block h-full'>
      <Card className='h-full cursor-pointer overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
        {/* Header with Image */}
        <CardHeader className='relative p-0'>
          <div className='relative aspect-[4/3] overflow-hidden bg-gray-50'>
            {/* Product Tag Badge */}
            {tag && <Badge className={`absolute top-3 right-3 z-10 rounded-sm border-0 px-2 py-1 text-xs font-medium text-white ${getTagColor(tag)}`}>{tag}</Badge>}

            <Image src={product.images[0]} alt={product.name} fill className='object-contain p-4' />
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className='flex-1 space-y-3 p-4'>
          <div className='space-y-1'>
            <h3 className='line-clamp-2 text-lg leading-tight font-semibold text-gray-900'>{product.name}</h3>
            <p className='text-sm text-gray-600'>
              {product.chipDetails.cpu} • {product.chipDetails.gpu}
            </p>
          </div>

          {/* Product Model */}
          <div className='line-clamp-1 text-sm font-medium text-gray-700'>
            {product.model} {product.ram[0]} {product.storage[0]} | Chính hãng
          </div>

          {/* Compact Specs */}
          <div className='flex flex-wrap gap-2 text-xs text-gray-600'>
            <span className='flex items-center gap-1'>
              <Monitor className='h-3 w-3' />
              {product.display.size}
            </span>
            <span className='flex items-center gap-1'>
              <HardDrive className='h-3 w-3' />
              {product.storage[0]}
            </span>
            <span className='flex items-center gap-1'>
              <Battery className='h-3 w-3' />
              {product.battery}
            </span>
          </div>
        </CardContent>

        {/* Footer with Pricing */}
        <CardFooter className='p-4 pt-0'>
          <div className='w-full'>
            {/* Price Display */}
            <div className='flex items-center justify-between'>
              <div className='flex flex-col'>
                <div className='flex items-baseline gap-2'>
                  <span className='text-2xl font-bold text-red-600'>{formatPrice(product.price)}</span>
                  <span className='text-lg font-medium text-red-600'>đ</span>
                </div>
              </div>

              <div className='translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100'>
                <div className='rounded-full bg-blue-500 p-2 text-white shadow-lg'>
                  <ArrowRight className='h-4 w-4' />
                </div>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
