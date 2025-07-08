import { MacBookProduct } from '@/types/product'
import { ProductGrid } from './ProductGrid'

interface ProductGridServerProps {
  initialProducts: MacBookProduct[]
}

export function ProductGridServer({ initialProducts }: ProductGridServerProps) {
  return (
    <div>
      {/* Initial server-rendered product count */}
      <div className='text-muted-foreground mb-4 text-sm'>Showing {initialProducts.length} products</div>

      {/* Client component for interactive filtering */}
      <ProductGrid />
    </div>
  )
}
