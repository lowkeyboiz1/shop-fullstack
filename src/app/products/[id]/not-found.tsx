import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, ArrowLeft, Laptop } from 'lucide-react'

export default function NotFound() {
  return (
    <div className='bg-background min-h-screen'>
      {/* Header */}
      <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
        <div className='container mx-auto px-4 py-4'>
          <Link href='/' className='flex items-center gap-2 transition-opacity hover:opacity-80'>
            <Laptop className='h-6 w-6' />
            <span className='text-xl font-bold'>MacBook Showcase</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className='container mx-auto px-4 py-16'>
        <div className='flex min-h-[60vh] items-center justify-center'>
          <Card className='w-full max-w-md text-center'>
            <CardHeader>
              <div className='bg-muted mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full'>
                <Search className='text-muted-foreground h-8 w-8' />
              </div>
              <CardTitle className='text-2xl'>Product Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>The MacBook product you&apos;re looking for doesn&apos;t exist or has been moved.</p>
            </CardContent>
            <CardFooter className='flex justify-center gap-4'>
              <Button variant='outline' asChild>
                <Link href='/' className='gap-2'>
                  <ArrowLeft className='h-4 w-4' />
                  Back to Products
                </Link>
              </Button>
              <Button asChild>
                <Link href='/'>Browse All MacBooks</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
