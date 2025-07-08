'use client'

import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageCarouselProps {
  images: string[]
  alt: string
}

export function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  if (images.length === 0) return null

  return (
    <div className='relative'>
      <div className='overflow-hidden rounded-lg' ref={emblaRef}>
        <div className='flex'>
          {images.map((image, index) => (
            <div key={index} className='relative min-w-0 flex-[0_0_100%]'>
              <div className='relative aspect-[16/10] bg-gradient-to-br from-gray-50 to-gray-100'>
                <img src={image} alt={`${alt} - Image ${index + 1}`} className='h-full w-full object-contain p-8' />
              </div>
            </div>
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <>
          <Button variant='outline' size='icon' className='bg-background/80 absolute top-1/2 left-2 -translate-y-1/2 backdrop-blur-sm' onClick={scrollPrev}>
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button variant='outline' size='icon' className='bg-background/80 absolute top-1/2 right-2 -translate-y-1/2 backdrop-blur-sm' onClick={scrollNext}>
            <ChevronRight className='h-4 w-4' />
          </Button>
        </>
      )}
    </div>
  )
}
