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
}

export interface FilterOptions {
  category?: string
  chip?: string
  year?: number
  minPrice?: number
  maxPrice?: number
}

export type SortOption = 'price-asc' | 'price-desc' | 'date-asc' | 'date-desc' | 'name'
