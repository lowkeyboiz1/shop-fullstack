import { FilterControls } from '@/components/FilterControls'
import { macbookProducts } from '@/data/macbooks'
import { Metadata } from 'next'
import { ProductGridServer } from '@/components/ProductGridServer'

// SEO Metadata
export const metadata: Metadata = {
  title: 'MacBook Showcase - Discover the Perfect MacBook',
  description: 'Explore our complete lineup of MacBook Air and MacBook Pro models. Find the perfect MacBook for your needs with detailed specifications, features, and pricing.',
  keywords: ['MacBook', 'MacBook Air', 'MacBook Pro', 'Apple', 'M3', 'M2', 'laptop', 'computer', 'Apple Silicon'],
  openGraph: {
    title: 'MacBook Showcase - Discover the Perfect MacBook',
    description: 'Explore our complete lineup of MacBook Air and MacBook Pro models',
    type: 'website',
    images: [
      {
        url: '/api/og-image',
        width: 1200,
        height: 630,
        alt: 'MacBook Showcase'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MacBook Showcase - Discover the Perfect MacBook',
    description: 'Explore our complete lineup of MacBook Air and MacBook Pro models'
  }
}

export default async function Home() {
  // Server-side data fetching

  return (
    <main className='container mx-auto px-4 py-8'>
      <div className='space-y-8'>
        {/* Filter Controls - Client Component */}
        <FilterControls />

        {/* Product Grid - Server Component with Client Interactivity */}
        <ProductGridServer />
      </div>
    </main>
  )
}
