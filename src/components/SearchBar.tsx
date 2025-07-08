'use client'

import { useAtom } from 'jotai'
import { Search } from 'lucide-react'
import { searchQueryAtom } from '@/store/atoms'
import { Input } from '@/components/ui/input'

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)

  return (
    <div className='relative w-full max-w-md'>
      <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
      <Input type='search' placeholder='Search MacBooks...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='h-10 w-full pr-4 pl-10' />
    </div>
  )
}
