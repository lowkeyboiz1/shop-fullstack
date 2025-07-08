import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { macbookProducts } from '@/data/macbooks'
import { ArrowLeft, Battery, Calendar, Cpu, HardDrive, Laptop, MemoryStick, Monitor, Star, Weight, Zap } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProductDetailClient } from './ProductDetailClient'
import { Badge } from '@/components/ui/badge'

interface ProductDetailPageProps {
  params: Promise<{
    id: string
  }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const product = macbookProducts.find((p) => p.id === resolvedParams.id)

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested MacBook product was not found.'
    }
  }

  return {
    title: `${product.name} ${product.model} (${product.year}) - MacBook Showcase`,
    description: `${product.description} Starting at $${product.price.toLocaleString()}. Features ${product.chip} chip, ${product.display.size} display, and ${product.battery} battery life.`,
    keywords: [product.name, product.model, product.chip, 'MacBook', product.category, product.year.toString(), ...product.features],
    openGraph: {
      title: `${product.name} ${product.model} (${product.year})`,
      description: product.description,
      images: [
        {
          url: product.images[0],
          width: 1200,
          height: 630,
          alt: product.name
        }
      ],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} ${product.model} (${product.year})`,
      description: product.description,
      images: [product.images[0]]
    }
  }
}

// Generate static params for all products (SSG)
export async function generateStaticParams() {
  return macbookProducts.map((product) => ({
    id: product.id
  }))
}

// Color mapping for MacBook colors
const colorMapping: Record<string, string> = {
  Midnight: '#1a1a1a',
  Starlight: '#f5f5dc',
  'Space Gray': '#7d7d7d',
  Silver: '#c0c0c0',
  'Space Black': '#2c2c2c',
  Gold: '#ffd700',
  'Rose Gold': '#e8b4a0'
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = await params
  const product = macbookProducts.find((p) => p.id === resolvedParams.id)

  if (!product) {
    notFound()
  }

  // Price calculation options
  const memoryOptions = [
    { size: '8GB', label: '8GB unified memory', price: 0 },
    { size: '16GB', label: '16GB unified memory', price: 200 },
    { size: '18GB', label: '18GB unified memory', price: 300 },
    { size: '24GB', label: '24GB unified memory', price: 400 },
    { size: '36GB', label: '36GB unified memory', price: 800 },
    { size: '48GB', label: '48GB unified memory', price: 1200 },
    { size: '64GB', label: '64GB unified memory', price: 1600 },
    { size: '96GB', label: '96GB unified memory', price: 2400 },
    { size: '128GB', label: '128GB unified memory', price: 3200 }
  ].filter((option) => product.ram.includes(option.size))

  const storageOptions = [
    { size: '256GB', label: '256GB SSD storage', price: 0 },
    { size: '512GB', label: '512GB SSD storage', price: 200 },
    { size: '1TB', label: '1TB SSD storage', price: 500 },
    { size: '2TB', label: '2TB SSD storage', price: 1000 },
    { size: '4TB', label: '4TB SSD storage', price: 2000 },
    { size: '8TB', label: '8TB SSD storage', price: 4000 }
  ].filter((option) => product.storage.includes(option.size))

  const specs = [
    { icon: Cpu, label: 'Chip', value: product.chip },
    { icon: MemoryStick, label: 'Memory', value: product.ram[0] },
    { icon: HardDrive, label: 'Storage', value: product.storage[0] },
    { icon: Monitor, label: 'Display', value: product.display.size },
    { icon: Calendar, label: 'Year', value: product.year.toString() },
    { icon: Weight, label: 'Weight', value: product.weight },
    { icon: Battery, label: 'Battery', value: product.battery }
  ]

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.name} ${product.model}`,
    description: product.description,
    image: product.images,
    brand: {
      '@type': 'Brand',
      name: 'Apple'
    },
    model: product.model,
    releaseDate: product.releaseDate,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'MacBook Showcase'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127'
    }
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100'>
        {/* Header */}
        <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
          <div className='container mx-auto px-4 py-4'>
            <div className='flex items-center justify-between'>
              <Link href='/' className='flex items-center gap-2 transition-opacity hover:opacity-80'>
                <Laptop className='h-6 w-6' />
                <span className='text-xl font-bold'>MacBook Showcase</span>
              </Link>
              <Link href='/'>
                <Button variant='ghost' size='sm' className='gap-2'>
                  <ArrowLeft className='h-4 w-4' />
                  Back to Products
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
          <div className='grid items-start gap-16 lg:grid-cols-2'>
            {/* Product Image Section - Static */}
            <div className='space-y-6'>
              <div className='group relative'>
                <div className='aspect-square overflow-hidden rounded-3xl border border-slate-200/50 bg-gradient-to-br from-white to-slate-50 p-12 shadow-2xl'>
                  <div className='absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={600}
                    height={600}
                    className='relative z-10 h-full w-full object-contain transition-transform duration-500 group-hover:scale-105'
                    priority
                  />
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className='grid grid-cols-4 gap-3'>
                {product.images.slice(0, 4).map((image, index) => (
                  <div key={index} className='aspect-square rounded-xl border-2 border-slate-200/50 bg-white p-3 shadow-sm'>
                    <Image src={image} alt={`${product.name} view ${index + 1}`} width={150} height={150} className='h-full w-full object-contain opacity-70' />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div className='space-y-8'>
              {/* Header */}
              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <Badge variant='secondary' className='bg-blue-100 text-blue-700 hover:bg-blue-200'>
                    {product.model}
                  </Badge>
                  <Badge variant='outline' className='border-slate-300'>
                    {product.year}
                  </Badge>
                  <Badge variant='outline' className='border-slate-300'>
                    {product.category}
                  </Badge>
                  <div className='ml-auto flex items-center gap-1'>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                    ))}
                    <span className='ml-1 text-sm text-slate-600'>(4.9)</span>
                  </div>
                </div>
                <h1 className='bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-4xl font-bold text-transparent'>{product.name}</h1>
                <div className='flex items-baseline gap-3'>
                  <span className='text-4xl font-bold text-slate-900'>${product.price.toLocaleString()}</span>
                </div>
                <p className='text-lg leading-relaxed text-slate-600'>{product.description}</p>
              </div>

              {/* Interactive Configuration - Client Component */}
              <ProductDetailClient product={product} memoryOptions={memoryOptions} storageOptions={storageOptions} colorMapping={colorMapping} />

              <Separator className='my-8' />

              {/* Technical Specifications */}
              <div>
                <h2 className='mb-6 text-2xl font-semibold text-slate-900'>Technical Specifications</h2>
                <div className='grid gap-4'>
                  {specs.map((spec, index) => (
                    <Card key={index} className='border-0 shadow-sm transition-shadow hover:shadow-md'>
                      <CardContent className='p-5'>
                        <div className='flex items-center gap-4'>
                          <div className='rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 p-3'>
                            <spec.icon className='h-5 w-5 text-slate-600' />
                          </div>
                          <div className='flex-1'>
                            <p className='text-sm font-medium tracking-wide text-slate-500 uppercase'>{spec.label}</p>
                            <p className='text-lg font-semibold text-slate-900'>{spec.value}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className='mb-6 text-2xl font-semibold text-slate-900'>Key Features</h2>
                <div className='grid gap-3'>
                  {product.features.map((feature, index) => (
                    <div key={index} className='flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-slate-50'>
                      <Zap className='h-4 w-4 text-blue-500' />
                      <span className='text-sm text-slate-700'>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
