'use client'

import { useAtom } from 'jotai'
import { Filter, SortAsc } from 'lucide-react'
import { filterOptionsAtom, sortOptionAtom, uniqueChipsAtom, uniqueYearsAtom } from '@/store/atoms'
import { SortOption } from '@/types/product'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function FilterControls() {
  const [filters, setFilters] = useAtom(filterOptionsAtom)
  const [sortOption, setSortOption] = useAtom(sortOptionAtom)
  const [uniqueChips] = useAtom(uniqueChipsAtom)
  const [uniqueYears] = useAtom(uniqueYearsAtom)

  const handleCategoryChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      category: value === 'all' ? undefined : value
    }))
  }

  const handleChipChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      chip: value === 'all' ? undefined : value
    }))
  }

  const handleYearChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      year: value === 'all' ? undefined : parseInt(value)
    }))
  }

  const handleClearFilters = () => {
    setFilters({})
    setSortOption('name')
  }

  const hasActiveFilters = Object.keys(filters).length > 0

  return (
    <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
      <div className='flex flex-wrap items-center gap-3'>
        <div className='flex items-center gap-2'>
          <Filter className='text-muted-foreground h-4 w-4' />
          <span className='text-sm font-medium'>Filters:</span>
        </div>

        <Select onValueChange={handleCategoryChange} value={filters.category || 'all'}>
          <SelectTrigger className='w-[140px]'>
            <SelectValue placeholder='Category' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Categories</SelectItem>
            <SelectItem value='MacBook Air'>MacBook Air</SelectItem>
            <SelectItem value='MacBook Pro'>MacBook Pro</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={handleChipChange} value={filters.chip || 'all'}>
          <SelectTrigger className='w-[140px]'>
            <SelectValue placeholder='Chip' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Chips</SelectItem>
            {uniqueChips.map((chip) => (
              <SelectItem key={chip} value={chip}>
                {chip}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={handleYearChange} value={filters.year?.toString() || 'all'}>
          <SelectTrigger className='w-[100px]'>
            <SelectValue placeholder='Year' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Years</SelectItem>
            {uniqueYears.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant='ghost' size='sm' onClick={handleClearFilters} className='h-9'>
            Clear filters
          </Button>
        )}
      </div>

      <Separator orientation='vertical' className='hidden h-6 lg:block' />

      <div className='flex items-center gap-3'>
        <div className='flex items-center gap-2'>
          <SortAsc className='text-muted-foreground h-4 w-4' />
          <span className='text-sm font-medium'>Sort by:</span>
        </div>
        <Select onValueChange={(value) => setSortOption(value as SortOption)} value={sortOption}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='name'>Name</SelectItem>
            <SelectItem value='price-asc'>Price: Low to High</SelectItem>
            <SelectItem value='price-desc'>Price: High to Low</SelectItem>
            <SelectItem value='date-desc'>Newest First</SelectItem>
            <SelectItem value='date-asc'>Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
