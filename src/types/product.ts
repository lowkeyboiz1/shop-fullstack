export interface MacBookProduct {
  id: string
  name: string
  model: string
  year: number
  price: number
  chip: string
  chipDetails: {
    cpu: string
    gpu: string
    neuralEngine: string
  }
  ram: string[]
  storage: string[]
  display: {
    size: string
    resolution: string
    brightness: string
    colorSpace: string
  }
  battery: string
  weight: string
  dimensions: string
  color: string[]
  images: string[]
  description: string
  features: string[]
  releaseDate: string
  category: 'MacBook Air' | 'MacBook Pro'
  // Note: Promotional tags are handled separately as external data
}

export interface FilterOptions {
  category?: string
  chip?: string
  year?: number
  minPrice?: number
  maxPrice?: number
  hasTag?: boolean
  tag?: ProductTag
}

export type SortOption = 'price-asc' | 'price-desc' | 'date-asc' | 'date-desc' | 'name'

export interface ProductCardProps {
  product: MacBookProduct
  tag?: ProductTag // External promotional tag (e.g., "Bán chạy", "Mới ra mắt")
}

// Product promotional tags - handled as external data for flexibility
export const PRODUCT_TAGS = ['Bán chạy', 'Mới ra mắt'] as const

export type ProductTag = (typeof PRODUCT_TAGS)[number]

// Utility type for components that need promotional tag information
export interface PromotionalOffer {
  tag?: ProductTag
}
