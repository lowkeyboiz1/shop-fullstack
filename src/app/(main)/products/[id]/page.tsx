import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { macbookProducts } from '@/data/macbooks'
import { ArrowLeft, Laptop, Star } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProductDetailClient } from './ProductDetailClient'

interface ProductDetailPageProps {
  params: Promise<{
    id: string
  }>
}

const generateStructuredData = (product: any) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.title,
  description: product.description,
  image: product.images,
  brand: { '@type': 'Brand', name: 'Apple' },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: product.basePrice,
    availability: 'https://schema.org/InStock',
    seller: { '@type': 'Organization', name: 'MacBook Showcase' }
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127'
  }
})

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const decodedTitle = decodeURIComponent(resolvedParams.id)
  const product = macbookProducts.find((p) => p.title === decodedTitle)

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested MacBook product was not found.'
    }
  }

  return {
    title: `${product.title} - MacBook Showcase`,
    description: `${product.description} Starting at $${product.basePrice.toLocaleString()}.`,
    keywords: [product.title, 'MacBook', 'Apple', 'M3', 'M2', 'laptop', 'computer', 'Apple Silicon'],
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.images[0],
          width: 1200,
          height: 630,
          alt: product.title
        }
      ],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description,
      images: [product.images[0]]
    }
  }
}

// Generate static params for all products
export async function generateStaticParams() {
  return macbookProducts.map((product) => ({
    id: encodeURIComponent(product.title)
  }))
}

// Components
const ProductBadges = ({ product }: { product: any }) => (
  <div className='flex items-center gap-3'>
    <Badge variant='secondary' className='bg-blue-100 text-blue-700 hover:bg-blue-200'>
      MacBook
    </Badge>
    <Badge variant='outline' className='border-slate-300'>
      Apple Silicon
    </Badge>
    <div className='ml-auto flex items-center gap-1'>
      {[...Array(5)].map((_, i) => (
        <Star key={i} className='h-4 w-4 fill-yellow-400 text-yellow-400' />
      ))}
      <span className='ml-1 text-sm text-slate-600'>(4.9)</span>
    </div>
  </div>
)

const ProductHeader = ({ product }: { product: any }) => (
  <div className='space-y-4'>
    <ProductBadges product={product} />
    <h1 className='bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-4xl font-bold text-transparent'>{product.title}</h1>
    <div className='flex items-baseline gap-3'>
      <span className='text-4xl font-bold text-slate-900'>${product.basePrice.toLocaleString()}</span>
      <span className='text-lg text-slate-600'>starting from</span>
    </div>
    <p className='text-lg leading-relaxed text-slate-600'>{product.description}</p>
  </div>
)

const ProductImageGallery = ({ product }: { product: any }) => (
  <div className='space-y-6'>
    <div className='group relative'>
      <div className='aspect-square overflow-hidden rounded-3xl border border-slate-200/50 bg-gradient-to-br from-white to-slate-50 p-12 shadow-2xl'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
        <Image
          src={product.images[0]}
          alt={product.title}
          width={600}
          height={600}
          className='relative z-10 h-full w-full object-contain transition-transform duration-500 group-hover:scale-105'
          priority
        />
      </div>
    </div>

    <div className='grid grid-cols-4 gap-3'>
      {product.images.slice(0, 4).map((image: string, index: number) => (
        <div key={index} className='aspect-square rounded-xl border-2 border-slate-200/50 bg-white p-3 shadow-sm'>
          <Image src={image} alt={`${product.title} view ${index + 1}`} width={150} height={150} className='h-full w-full object-contain opacity-70' />
        </div>
      ))}
    </div>
  </div>
)

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = await params
  const decodedTitle = decodeURIComponent(resolvedParams.id)
  const product = macbookProducts.find((p) => p.title === decodedTitle)

  if (!product) {
    notFound()
  }

  const structuredData = generateStructuredData(product)

  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100'>
        <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
          {/* Back Button */}
          <div className='mb-8'>
            <Link href='/'>
              <Button variant='ghost' className='gap-2 text-slate-600 hover:text-slate-900'>
                <ArrowLeft className='h-4 w-4' />
                Back to Products
              </Button>
            </Link>
          </div>

          <div className='grid items-start gap-16 lg:grid-cols-2'>
            <ProductImageGallery product={product} />

            <div className='space-y-8'>
              <ProductHeader product={product} />
              <ProductDetailClient product={product} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
