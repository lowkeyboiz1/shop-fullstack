import { atom } from 'jotai'
import { MacBookProduct, FilterOptions, SortOption } from '@/types/product'
import { macbookProducts } from '@/data/macbooks'

// Search atom
export const searchQueryAtom = atom<string>('')

// Filter atoms
export const filterOptionsAtom = atom<FilterOptions>({})

// Sort atom
export const sortOptionAtom = atom<SortOption>('name')

// Filtered and sorted products atom (derived)
export const filteredProductsAtom = atom<MacBookProduct[]>((get) => {
  const searchQuery = get(searchQueryAtom).toLowerCase()
  const filters = get(filterOptionsAtom)
  const sortOption = get(sortOptionAtom)

  // Start with all products
  let filtered = [...macbookProducts]

  // Apply search filter
  if (searchQuery) {
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.model.toLowerCase().includes(searchQuery) ||
        product.chip.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery)
    )
  }

  // Apply filters
  if (filters.category) {
    filtered = filtered.filter((product) => product.category === filters.category)
  }

  if (filters.chip) {
    filtered = filtered.filter((product) => product.chip === filters.chip)
  }

  if (filters.year) {
    filtered = filtered.filter((product) => product.year === filters.year)
  }

  if (filters.minPrice !== undefined) {
    filtered = filtered.filter((product) => product.price >= filters.minPrice!)
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter((product) => product.price <= filters.maxPrice!)
  }

  // Apply sorting
  switch (sortOption) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'date-asc':
      filtered.sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime())
      break
    case 'date-desc':
      filtered.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
      break
    case 'name':
    default:
      filtered.sort((a, b) => a.name.localeCompare(b.name))
      break
  }

  return filtered
})

// Get unique values for filters
export const uniqueChipsAtom = atom<string[]>(() => {
  const products = macbookProducts
  const chips = [...new Set(products.map((p) => p.chip))]
  return chips.sort()
})

export const uniqueYearsAtom = atom<number[]>(() => {
  const products = macbookProducts
  const years = [...new Set(products.map((p) => p.year))]
  return years.sort((a, b) => b - a)
})

export const priceRangeAtom = atom<{ min: number; max: number }>(() => {
  const prices = macbookProducts.map((p) => p.price)
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  }
})
