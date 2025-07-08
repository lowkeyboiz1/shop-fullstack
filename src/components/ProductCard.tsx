'use client'

import Link from 'next/link'
import { MacBookProduct } from '@/types/product'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Cpu, HardDrive, Monitor, Battery } from 'lucide-react'

interface ProductCardProps {
  product: MacBookProduct
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className='block h-full'>
      <Card className='group h-full cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg'>
        <CardHeader className='p-0'>
          <div className='relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100'>
            <img src={product.images[0]} alt={product.name} className='h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105' />
            <Badge className='absolute top-2 right-2'>{product.category}</Badge>
          </div>
        </CardHeader>

        <CardContent className='flex-1 space-y-3 p-4'>
          <div>
            <h3 className='group-hover:text-primary text-lg font-semibold transition-colors'>{product.name}</h3>
            <p className='text-muted-foreground text-sm'>
              {product.model} • {product.year}
            </p>
          </div>

          <div className='space-y-2 text-sm'>
            <div className='flex items-center gap-2'>
              <Cpu className='text-muted-foreground h-4 w-4' />
              <span>{product.chip}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Monitor className='text-muted-foreground h-4 w-4' />
              <span>{product.display.size}</span>
            </div>
            <div className='flex items-center gap-2'>
              <HardDrive className='text-muted-foreground h-4 w-4' />
              <span>
                {product.storage[0]} - {product.storage[product.storage.length - 1]}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <Battery className='text-muted-foreground h-4 w-4' />
              <span>{product.battery}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className='p-4 pt-0'>
          <div className='w-full'>
            <p className='text-muted-foreground text-sm'>Starting at</p>
            <p className='text-2xl font-bold'>${product.price.toLocaleString()}</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
