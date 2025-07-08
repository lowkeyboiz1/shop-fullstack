import React from 'react'

const SearchSkeleton: React.FC = () => {
  return (
    <div className='p-2'>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className='flex animate-pulse items-center gap-4 rounded-lg p-3'>
          {/* Image placeholder */}
          <div className='h-12 w-12 rounded-lg bg-gray-200 dark:bg-neutral-700'></div>

          {/* Content placeholder */}
          <div className='flex-1'>
            <div className='mb-2 h-4 w-3/4 rounded bg-gray-200 dark:bg-neutral-700'></div>
            <div className='h-3 w-1/2 rounded bg-gray-200 dark:bg-neutral-700'></div>
          </div>

          {/* Price placeholder */}
          <div className='text-right'>
            <div className='h-4 w-20 rounded bg-gray-200 dark:bg-neutral-700'></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SearchSkeleton
