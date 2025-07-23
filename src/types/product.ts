export interface ProductVariant {
  label: string
  priceDiff: number
}

export interface ProductOption {
  name: string
  variants: ProductVariant[]
}

export interface TProduct {
  images: string[]
  title: string
  description: string
  options: ProductOption[]
  colors: string[]
  basePrice: number
}

// Legacy MacBookProduct interface for backward compatibility during migration
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
  category: string
}

// Filter and sort types
export interface FilterOptions {
  category?: string
  chip?: string
  year?: number
  minPrice?: number
  maxPrice?: number
}

export type SortOption = 'name' | 'price-asc' | 'price-desc' | 'date-asc' | 'date-desc'

// Promotional and card types
export interface PromotionalOffer {
  tag?: string
}

export interface ProductCardProps {
  product: TProduct
  tag?: string
}

export const PRODUCT_TAGS = ['Bán chạy', 'Mới ra mắt', 'Giảm giá'] as const
export type ProductTag = (typeof PRODUCT_TAGS)[number]

// Sample TProduct object demonstrating real-world usage
export const sampleProduct: TProduct = {
  images: [
    'https://example.com/macbook-pro-space-gray-1.jpg',
    'https://example.com/macbook-pro-space-gray-2.jpg',
    'https://example.com/macbook-pro-space-gray-3.jpg',
    'https://example.com/macbook-pro-space-gray-4.jpg'
  ],
  title: 'MacBook Pro 14-inch',
  description:
    "The most powerful MacBook Pro ever is here. With the blazing-fast M3 Pro or M3 Max chip — built on 3-nanometer technology — MacBook Pro delivers game-changing performance and amazing battery life. Whether you're working on professional creative projects, coding complex applications, or handling intensive workflows, MacBook Pro has the power and performance to take on anything.",
  options: [
    {
      name: 'RAM',
      variants: [
        { label: '8GB', priceDiff: 0 },
        { label: '16GB', priceDiff: 200 },
        { label: '32GB', priceDiff: 600 },
        { label: '64GB', priceDiff: 1400 }
      ]
    },
    {
      name: 'Storage',
      variants: [
        { label: '512GB SSD', priceDiff: 0 },
        { label: '1TB SSD', priceDiff: 200 },
        { label: '2TB SSD', priceDiff: 600 },
        { label: '4TB SSD', priceDiff: 1200 },
        { label: '8TB SSD', priceDiff: 2400 }
      ]
    },
    {
      name: 'Processor',
      variants: [
        { label: 'M3 Pro 11-core CPU', priceDiff: 0 },
        { label: 'M3 Pro 12-core CPU', priceDiff: 200 },
        { label: 'M3 Max 14-core CPU', priceDiff: 500 },
        { label: 'M3 Max 16-core CPU', priceDiff: 700 }
      ]
    }
  ],
  colors: ['Space Gray', 'Silver', 'Space Black'],
  basePrice: 1999
}
