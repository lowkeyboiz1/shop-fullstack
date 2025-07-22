'use client'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { MobileNav, MobileNavHeader, NavBody, Navbar } from '@/components/ui/resizable-navbar'
import { useIsMobile } from '@/hooks'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import SearchModal from './SearchModal'

interface NavItem {
  labelKey: string
  href: string
  children?: {
    labelKey: string
    href: string
    description: string
  }[]
}

const navItems: NavItem[] = [
  {
    labelKey: 'Trang chủ',
    href: '/'
  },
  {
    labelKey: 'Sản phẩm',
    href: '/products',
    children: [
      {
        labelKey: 'MacBook Air',
        href: '/products/macbook-air',
        description: 'Laptop mỏng nhẹ, hiệu suất cao'
      },
      {
        labelKey: 'MacBook Pro',
        href: '/products/macbook-pro',
        description: 'Laptop chuyên nghiệp cho công việc nặng'
      },
      {
        labelKey: 'iMac',
        href: '/products/imac',
        description: 'Máy tính để bàn All-in-One'
      },
      {
        labelKey: 'Mac mini',
        href: '/products/mac-mini',
        description: 'Máy tính để bàn nhỏ gọn'
      }
    ]
  },
  {
    labelKey: 'Dịch vụ',
    href: '/services',
    children: [
      {
        labelKey: 'Bảo hành',
        href: '/services/warranty',
        description: 'Dịch vụ bảo hành chính hãng'
      },
      {
        labelKey: 'Sửa chữa',
        href: '/services/repair',
        description: 'Dịch vụ sửa chữa chuyên nghiệp'
      },
      {
        labelKey: 'Tư vấn',
        href: '/services/consultation',
        description: 'Tư vấn chọn máy phù hợp'
      }
    ]
  },
  {
    labelKey: 'Về chúng tôi',
    href: '/about'
  },
  {
    labelKey: 'Liên hệ',
    href: '/contact'
  }
]

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    // Prevent scrolling when mobile menu or search modal is open
    if (mobileMenuOpen || searchModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen, searchModalOpen, isMobile])

  const handleMouseEnter = (index: number) => {
    if (hovered !== null) {
      if (index > hovered) {
        setDirection('right')
      } else {
        setDirection('left')
      }
    }
    setHovered(index)
  }

  const handleSearchModalClose = () => {
    setSearchModalOpen(false)
  }

  const animationVariants = {
    initial: (direction: 'left' | 'right') => ({
      opacity: 0,
      x: direction === 'right' ? 100 : -100,
      scale: 0.95
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1
    },
    exit: (direction: 'left' | 'right') => ({
      opacity: 0,
      x: direction === 'right' ? -100 : 100,
      scale: 0.95
    })
  }

  return (
    <Navbar className={cn('!sticky !top-0 p-2 transition-all duration-100 lg:p-4')}>
      <NavBody>
        <div className='flex w-full items-center justify-between'>
          <div className='flex items-center gap-10'>
            <Link href='/' className='group flex items-center space-x-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600'>
                <span className='text-lg font-bold text-white'>M</span>
              </div>
              <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent'>macCTO</span>
            </Link>
            {/* Desktop Navigation */}
            <motion.nav onMouseLeave={() => setHovered(null)} className={`hidden items-center space-x-1 text-black lg:flex`}>
              {navItems.map((item: NavItem, index: number) => {
                const isHovered = hovered === index
                return (
                  <motion.div key={item.labelKey} onMouseEnter={() => handleMouseEnter(index)} className='relative'>
                    <Link
                      href={item.href}
                      className='relative flex cursor-pointer items-center rounded-md px-3 py-2 font-medium whitespace-nowrap transition-all duration-200 hover:text-[#2EAF5D]'
                      aria-label={item.labelKey}
                    >
                      {isHovered && <motion.div layoutId='hovered' className='absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800' />}
                      <span className='relative z-20 flex items-center'>
                        {item.labelKey}
                        {item.children && (
                          <motion.div animate={{ rotate: isHovered ? 180 : 0 }} transition={{ duration: 0.2 }}>
                            <ChevronDown className='ml-1 size-4' />
                          </motion.div>
                        )}
                      </span>
                    </Link>
                    <AnimatePresence>
                      {isHovered && item.children && (
                        <motion.div
                          layoutId='dropdown-background'
                          className='absolute top-full left-1/2 mt-2 w-max -translate-x-1/2'
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className='w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800'>
                            <AnimatePresence custom={direction} mode='popLayout'>
                              <motion.div
                                key={hovered}
                                custom={direction}
                                variants={animationVariants}
                                initial='initial'
                                animate='animate'
                                exit='exit'
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                              >
                                <div className='grid grid-cols-1 gap-2 p-3'>
                                  {item.children.map((child) => (
                                    <Link
                                      key={child.labelKey}
                                      href={child.href}
                                      className='block w-full rounded-lg p-3 text-left hover:bg-gray-100 dark:hover:bg-neutral-700'
                                      onClick={() => {
                                        setHovered(null)
                                        setMobileMenuOpen(false)
                                      }}
                                    >
                                      <p className='font-semibold text-gray-900 dark:text-white'>{child.labelKey}</p>
                                      <p className='text-sm text-gray-500 dark:text-gray-400'>{child.description}</p>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </motion.nav>
          </div>

          {/* Search Button */}
          <div className='flex items-center'>
            <button
              onClick={() => setSearchModalOpen(true)}
              className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-200 hover:bg-gray-200 hover:text-gray-800 dark:bg-neutral-800 dark:text-gray-400 dark:hover:bg-neutral-700 dark:hover:text-gray-200'
              aria-label='Tìm kiếm'
            >
              <Search className='h-5 w-5' />
            </button>
          </div>
        </div>
      </NavBody>

      <MobileNav className='!justify-between'>
        <MobileNavHeader>
          <Link href='/' aria-label='homeAriaLabel' className='flex items-center justify-center gap-2'>
            <div className='size-10'>
              <Image src='/logo.png' alt='logoAlt' width={100} height={100} />
            </div>
          </Link>
          <div className='flex items-center gap-3'>
            {/* Mobile Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-200 hover:bg-gray-200 hover:text-gray-800'
              aria-label='Tìm kiếm'
            >
              <Search className='h-4 w-4' />
            </button>
            {/* Mobile Hamburger Menu */}
            <Hamburger isActive={mobileMenuOpen} setIsActive={setMobileMenuOpen} />
          </div>
        </MobileNavHeader>
      </MobileNav>

      {/* Search Modal */}
      <SearchModal isOpen={searchModalOpen} onClose={handleSearchModalClose} />

      {/* Mobile Navigation Drawer */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 lg:hidden ${mobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`} onClick={() => setMobileMenuOpen(false)} />
      <motion.div
        id='mobile-menu'
        className='fixed top-0 right-0 bottom-0 z-[55] h-dvh w-full bg-white lg:hidden'
        style={{
          top: '50px'
        }}
        initial={{ x: '100%' }}
        animate={{ x: mobileMenuOpen ? 0 : '100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        role='dialog'
        aria-modal='true'
        aria-label='mobileNavAriaLabel'
      >
        <div className='flex h-full flex-col p-6'>
          <nav className='flex flex-col space-y-2' aria-label='mobileNavAriaLabel'>
            {navItems.map((item: NavItem, index: number) =>
              item.children ? (
                <motion.div
                  key={item.labelKey}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: mobileMenuOpen ? 1 : 0, x: mobileMenuOpen ? 0 : 50 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                >
                  <Collapsible>
                    <CollapsibleTrigger className='flex w-full items-center justify-between rounded-md px-4 py-3 text-lg font-medium text-gray-800 transition-all duration-200 hover:bg-green-50 hover:pl-6 hover:text-green-600'>
                      {item.labelKey}
                      <ChevronDown className='size-5 transition-transform duration-300 group-data-[state=open]:rotate-180' />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className='mt-2 flex flex-col space-y-2 pl-8'>
                        {item.children.map((child) => (
                          <Link
                            key={child.labelKey}
                            href={child.href}
                            className='block rounded-md px-4 py-3 text-base font-medium text-gray-700 transition-all duration-200 hover:bg-green-50 hover:pl-6 hover:text-green-600'
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.labelKey}
                          </Link>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: mobileMenuOpen ? 1 : 0, x: mobileMenuOpen ? 0 : 50 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                  key={index}
                >
                  <Link
                    href={item.href}
                    className='block rounded-md px-4 py-3 text-lg font-medium text-gray-800 transition-all duration-200 hover:bg-green-50 hover:pl-6 hover:text-green-600'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.labelKey}
                  </Link>
                </motion.div>
              )
            )}
          </nav>
        </div>
      </motion.div>
    </Navbar>
  )
}

const Hamburger = ({ isActive, setIsActive }: { isActive: boolean; setIsActive: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <motion.div className='relative z-[60] flex h-5 w-8 cursor-pointer flex-col justify-between hover:opacity-85' onClick={() => setIsActive((prev) => !prev)}>
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.div
          key={index}
          className={cn('h-1 rounded-2xl bg-[#F4A300]')}
          initial={false}
          animate={
            index === 1
              ? {
                  x: isActive ? '100%' : 0,
                  opacity: isActive ? 0 : 1
                }
              : index === 0
                ? {
                    y: isActive ? '150%' : 0,
                    rotate: isActive ? 45 : 0
                  }
                : {
                    y: isActive ? '-250%' : '0%',
                    rotate: isActive ? -45 : 0
                  }
          }
          transition={{ duration: 0.3 }}
          style={{ width: '100%' }}
        />
      ))}
    </motion.div>
  )
}

export default Header
