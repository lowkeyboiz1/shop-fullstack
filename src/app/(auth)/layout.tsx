import type { Metadata } from 'next'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Providers } from '@/components/providers'

export const metadata: Metadata = {
  title: 'MacBook Showcase Admin - Quản lý sản phẩm MacBook',
  description: 'Trang quản trị hệ thống MacBook Showcase với đầy đủ tính năng quản lý sản phẩm, danh mục và hình ảnh.',
  metadataBase: new URL('https://macbook-showcase.com'),
  alternates: {
    canonical: '/admin'
  },
  robots: {
    index: false,
    follow: false
  }
}

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className='min-h-screen'>{children}</SidebarInset>
      </SidebarProvider>
    </Providers>
  )
}
