'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState, useCallback } from 'react'
import { useDebounce } from '@/hooks'
import SearchSkeleton from './SearchSkeleton'

// Mock search results data
const mockSearchResults = [
  {
    id: 1,
    title: 'MacBook Air M3 13-inch',
    description: 'Siêu mỏng, siêu nhẹ với chip M3 mạnh mẽ',
    price: '28,999,000đ',
    image: '/macbook-air-m3.jpg',
    href: '/products/macbook-air-m3'
  },
  {
    id: 2,
    title: 'MacBook Pro 14-inch M3',
    description: 'Hiệu năng đỉnh cao cho công việc chuyên nghiệp',
    price: '52,999,000đ',
    image: '/macbook-pro-14-m3.jpg',
    href: '/products/macbook-pro-14-m3'
  },
  {
    id: 3,
    title: 'Magic Keyboard',
    description: 'Bàn phím không dây cho MacBook',
    price: '2,999,000đ',
    image: '/magic-keyboard.jpg',
    href: '/products/magic-keyboard'
  }
]

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<typeof mockSearchResults>([])
  const [isLoading, setIsLoading] = useState(false)

  // Use debounce hook with 300ms delay
  const debouncedQuery = useDebounce(searchQuery, 300)

  // Simulate search functionality with loading
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const filtered = mockSearchResults.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()) || item.description.toLowerCase().includes(query.toLowerCase()))

    setSearchResults(filtered)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery)
    } else {
      setSearchResults([])
      setIsLoading(false)
    }
  }, [debouncedQuery, performSearch])

  const handleClose = () => {
    onClose()
    setSearchQuery('')
    setSearchResults([])
    setIsLoading(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm' onClick={handleClose} />

          {/* Search Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className='fixed top-20 left-1/2 z-[101] w-full max-w-2xl -translate-x-1/2 px-4'
          >
            <div className='rounded-2xl bg-white shadow-2xl dark:bg-neutral-900'>
              {/* Search Input */}
              <div className='flex items-center border-b border-gray-200 p-4 dark:border-neutral-700'>
                <Search className='mr-3 h-5 w-5 text-gray-400' />
                <input
                  type='text'
                  placeholder='Tìm kiếm sản phẩm...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='flex-1 bg-transparent text-lg outline-none placeholder:text-gray-400 dark:text-white'
                  autoFocus
                />
                <button
                  onClick={handleClose}
                  className='ml-3 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-neutral-800 dark:hover:text-gray-300'
                >
                  <X className='h-5 w-5' />
                </button>
              </div>

              {/* Search Results */}
              <div className='max-h-96 overflow-y-auto'>
                {/* Loading State */}
                {isLoading && <SearchSkeleton />}

                {/* No Results */}
                {!isLoading && searchQuery.trim() && searchResults.length === 0 && (
                  <div className='p-8 text-center text-gray-500 dark:text-gray-400'>Không tìm thấy kết quả cho &quot;{searchQuery}&quot;</div>
                )}

                {/* Search Results */}
                {!isLoading && searchResults.length > 0 && (
                  <div className='p-2'>
                    {searchResults.map((result) => (
                      <Link key={result.id} href={result.href} onClick={handleClose} className='flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-neutral-800'>
                        <div className='h-12 w-12 rounded-lg bg-gray-100 dark:bg-neutral-800'></div>
                        <div className='flex-1'>
                          <h3 className='font-medium text-gray-900 dark:text-white'>{result.title}</h3>
                          <p className='text-sm text-gray-500 dark:text-gray-400'>{result.description}</p>
                        </div>
                        <div className='text-right'>
                          <p className='font-semibold text-blue-600 dark:text-blue-400'>{result.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Empty State */}
                {!isLoading && !searchQuery.trim() && <div className='p-8 text-center text-gray-500 dark:text-gray-400'>Nhập từ khóa để tìm kiếm sản phẩm</div>}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SearchModal
