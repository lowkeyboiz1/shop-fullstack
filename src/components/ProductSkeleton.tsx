import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

export function ProductSkeleton() {
  return (
    <Card className='h-full'>
      <CardHeader className='p-0'>
        <div className='bg-muted aspect-[4/3] animate-pulse' />
      </CardHeader>

      <CardContent className='space-y-3 p-4'>
        <div className='space-y-2'>
          <div className='bg-muted h-5 w-3/4 animate-pulse rounded' />
          <div className='bg-muted h-4 w-1/2 animate-pulse rounded' />
        </div>

        <div className='space-y-2'>
          <div className='bg-muted h-4 w-full animate-pulse rounded' />
          <div className='bg-muted h-4 w-5/6 animate-pulse rounded' />
          <div className='bg-muted h-4 w-4/6 animate-pulse rounded' />
          <div className='bg-muted h-4 w-3/4 animate-pulse rounded' />
        </div>
      </CardContent>

      <CardFooter className='p-4 pt-0'>
        <div className='flex w-full items-center justify-between'>
          <div className='space-y-1'>
            <div className='bg-muted h-3 w-16 animate-pulse rounded' />
            <div className='bg-muted h-6 w-24 animate-pulse rounded' />
          </div>
          <div className='bg-muted h-9 w-24 animate-pulse rounded' />
        </div>
      </CardFooter>
    </Card>
  )
}

export function ProductGridSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  )
}
