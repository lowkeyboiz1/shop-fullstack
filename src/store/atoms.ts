import { atom } from 'jotai'
import { TProduct, FilterOptions, SortOption } from '@/types/product'
import { macbookProducts } from '@/data/macbooks'

// Search atom
export const searchQueryAtom = atom<string>('')

// Filter options atom
export const filterOptionsAtom = atom<FilterOptions>({})

// Sort option atom
export const sortOptionAtom = atom<SortOption>('name')

// Filtered and sorted products atom (derived)
export const filteredProductsAtom = atom<TProduct[]>((get) => {
  const searchQuery = get(searchQueryAtom).toLowerCase()
  const filters = get(filterOptionsAtom)
  const sortOption = get(sortOptionAtom)

  // Start with all products
  let filtered = [...macbookProducts]

  // Apply search filter
  if (searchQuery) {
    filtered = filtered.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery) ||
        product.colors.some((color) => color.toLowerCase().includes(searchQuery)) ||
        product.options.some((option) => option.name.toLowerCase().includes(searchQuery) || option.variants.some((variant) => variant.label.toLowerCase().includes(searchQuery)))
    )
  }

  // Apply filters - Note: These will need to be updated as the old structure filters don't apply directly
  // For now, keeping basic filtering on title and price
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter((product) => product.basePrice >= filters.minPrice!)
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter((product) => product.basePrice <= filters.maxPrice!)
  }

  // Apply sorting
  switch (sortOption) {
    case 'price-asc':
      filtered.sort((a, b) => a.basePrice - b.basePrice)
      break
    case 'price-desc':
      filtered.sort((a, b) => b.basePrice - a.basePrice)
      break
    case 'name':
    default:
      filtered.sort((a, b) => a.title.localeCompare(b.title))
      break
  }

  return filtered
})

// Get unique values for filters - simplified for new structure
export const uniqueChipsAtom = atom<string[]>(() => {
  const products = macbookProducts
  const processors = [...new Set(products.flatMap((p) => p.options.find((opt) => opt.name === 'Processor')?.variants.map((v) => v.label) || []))]
  return processors.sort()
})

export const uniqueYearsAtom = atom<number[]>(() => {
  // Extract years from titles for now (since we removed the year field)
  const products = macbookProducts
  const years = [
    ...new Set(
      products.map((p) => {
        const yearMatch = p.title.match(/\(.*(\d{4})\)/)
        return yearMatch ? parseInt(yearMatch[1]) : 2024
      })
    )
  ]
  return years.sort((a, b) => b - a)
})

export const priceRangeAtom = atom(() => {
  const products = macbookProducts
  const prices = products.map((p) => p.basePrice)
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  }
})
