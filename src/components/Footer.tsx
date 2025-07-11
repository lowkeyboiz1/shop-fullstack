import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className='bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900'>
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {/* Company Info */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Về chúng tôi</h3>
            <p className='text-sm text-gray-600'>Chúng tôi cung cấp các sản phẩm Apple chính hãng với chất lượng tốt nhất và dịch vụ khách hàng xuất sắc.</p>
            <div className='flex space-x-4'>
              <Link href='#' className='text-gray-500 transition-colors hover:text-gray-900'>
                <Facebook className='h-5 w-5' />
              </Link>
              <Link href='#' className='text-gray-500 transition-colors hover:text-gray-900'>
                <Twitter className='h-5 w-5' />
              </Link>
              <Link href='#' className='text-gray-500 transition-colors hover:text-gray-900'>
                <Instagram className='h-5 w-5' />
              </Link>
              <Link href='#' className='text-gray-500 transition-colors hover:text-gray-900'>
                <Youtube className='h-5 w-5' />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Liên kết nhanh</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='/' className='text-sm text-gray-600 transition-colors hover:text-gray-900'>
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href='/products' className='text-sm text-gray-600 transition-colors hover:text-gray-900'>
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link href='/about' className='text-sm text-gray-600 transition-colors hover:text-gray-900'>
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href='/contact' className='text-sm text-gray-600 transition-colors hover:text-gray-900'>
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Sản phẩm</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='/products/macbook-air' className='text-sm text-gray-600 transition-colors hover:text-gray-900'>
                  MacBook Air
                </Link>
              </li>
              <li>
                <Link href='/products/macbook-pro' className='text-sm text-gray-600 transition-colors hover:text-gray-900'>
                  MacBook Pro
                </Link>
              </li>
              <li>
                <Link href='/products/imac' className='text-sm text-gray-600 transition-colors hover:text-gray-900'>
                  iMac
                </Link>
              </li>
              <li>
                <Link href='/products/mac-mini' className='text-sm text-gray-600 transition-colors hover:text-gray-900'>
                  Mac mini
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Thông tin liên hệ</h3>
            <div className='space-y-3'>
              <div className='flex items-center space-x-3'>
                <MapPin className='h-4 w-4 text-gray-500' />
                <span className='text-sm text-gray-600'>123 Đường ABC, Quận 1, TP.HCM</span>
              </div>
              <div className='flex items-center space-x-3'>
                <Phone className='h-4 w-4 text-gray-500' />
                <span className='text-sm text-gray-600'>+84 123 456 789</span>
              </div>
              <div className='flex items-center space-x-3'>
                <Mail className='h-4 w-4 text-gray-500' />
                <span className='text-sm text-gray-600'>info@example.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='mt-8 border-t border-gray-200 pt-8'>
          <div className='flex flex-col items-center justify-between md:flex-row'>
            <p className='text-sm text-gray-500'>© 2024 Apple Store. Tất cả quyền được bảo lưu.</p>
            <div className='mt-4 flex space-x-6 md:mt-0'>
              <Link href='/privacy' className='text-sm text-gray-500 transition-colors hover:text-gray-900'>
                Chính sách bảo mật
              </Link>
              <Link href='/terms' className='text-sm text-gray-500 transition-colors hover:text-gray-900'>
                Điều khoản sử dụng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
