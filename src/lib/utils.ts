import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ProductTag, TProduct } from '@/types/product'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Product utility functions
export function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN')
}

export function formatCurrency(price: number): string {
  return `${formatPrice(price)}đ`
}

// Calculate total price for a product with selected options
export function calculateProductPrice(product: TProduct, selectedOptions: Record<string, string>): number {
  let totalPrice = product.basePrice

  product.options.forEach((option) => {
    const selectedVariantLabel = selectedOptions[option.name]
    const selectedVariant = option.variants.find((v) => v.label === selectedVariantLabel)
    if (selectedVariant) {
      totalPrice += selectedVariant.priceDiff
    }
  })

  return totalPrice
}

// Get the price range for a product (min to max possible price)
export function getProductPriceRange(product: TProduct): { min: number; max: number } {
  let minPrice = product.basePrice
  let maxPrice = product.basePrice

  product.options.forEach((option) => {
    const minPriceDiff = Math.min(...option.variants.map((v) => v.priceDiff))
    const maxPriceDiff = Math.max(...option.variants.map((v) => v.priceDiff))
    minPrice += minPriceDiff
    maxPrice += maxPriceDiff
  })

  return { min: minPrice, max: maxPrice }
}

// Get default selected options for a product (first variant of each option)
export function getDefaultSelectedOptions(product: TProduct): Record<string, string> {
  const defaultOptions: Record<string, string> = {}
  product.options.forEach((option) => {
    if (option.variants.length > 0) {
      defaultOptions[option.name] = option.variants[0].label
    }
  })
  return defaultOptions
}

// Tag utility functions
export function getTagColor(tag: ProductTag): string {
  switch (tag) {
    case 'Bán chạy':
      return 'bg-orange-500'
    case 'Mới ra mắt':
      return 'bg-green-500'
    case 'Giảm giá':
      return 'bg-red-500'
    default:
      return 'bg-gray-500'
  }
}

export function getTagStyle(tag: ProductTag): string {
  const baseStyle = 'absolute top-3 right-3 z-10 rounded-sm border-0 px-2 py-1 text-xs font-medium text-white'
  return `${baseStyle} ${getTagColor(tag)}`
}

export function isValidTag(tag: string): tag is ProductTag {
  return tag === 'Bán chạy' || tag === 'Mới ra mắt' || tag === 'Giảm giá'
}
