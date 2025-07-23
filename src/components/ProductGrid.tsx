'use client'

import { filteredProductsAtom } from '@/store/atoms'
import { PromotionalOffer } from '@/types/product'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { ProductCard } from './ProductCard'
import { ProductGridSkeleton } from './ProductSkeleton'

export function ProductGrid() {
  const [products] = useAtom(filteredProductsAtom)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Sample tag data with proper typing
  const getProductOffers = (index: number): PromotionalOffer => {
    const offers: PromotionalOffer[] = [{ tag: 'Bán chạy' }, { tag: 'Mới ra mắt' }, { tag: 'Bán chạy' }, { tag: 'Mới ra mắt' }, { tag: 'Bán chạy' }, { tag: 'Mới ra mắt' }, {}, {}]
    return offers[index % offers.length]
  }

  if (isLoading) {
    return <ProductGridSkeleton />
  }

  if (products.length === 0) {
    return (
      <div className='animate-in fade-in-50 flex min-h-[400px] items-center justify-center duration-500'>
        <div className='text-center'>
          <p className='text-muted-foreground text-lg font-medium'>No products found</p>
          <p className='text-muted-foreground text-sm'>Try adjusting your filters or search query</p>
        </div>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {products.map((product, index) => {
        const { tag } = getProductOffers(index)
        return (
          <div
            key={product.title}
            className='animate-in fade-in-50 slide-in-from-bottom-3'
            style={{
              animationDuration: '500ms',
              animationDelay: `${index * 50}ms`,
              animationFillMode: 'backwards'
            }}
          >
            <ProductCard product={product} tag={tag} />
          </div>
        )
      })}
    </div>
  )
}
