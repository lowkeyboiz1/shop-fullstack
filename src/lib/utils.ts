import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ProductTag } from '@/types/product'

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

// Tag utility functions
export function getTagColor(tag: ProductTag): string {
  switch (tag) {
    case 'Bán chạy':
      return 'bg-orange-500'
    case 'Mới ra mắt':
      return 'bg-green-500'
    default:
      return 'bg-gray-500'
  }
}

export function getTagStyle(tag: ProductTag): string {
  const baseStyle = 'absolute top-3 right-3 z-10 rounded-sm border-0 px-2 py-1 text-xs font-medium text-white'
  return `${baseStyle} ${getTagColor(tag)}`
}

export function isValidTag(tag: string): tag is ProductTag {
  return tag === 'Bán chạy' || tag === 'Mới ra mắt'
}
