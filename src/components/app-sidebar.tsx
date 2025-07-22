'use client'

import { AudioWaveform, Command, GalleryVerticalEnd, Package, ShoppingCart, Image as ImageIcon } from 'lucide-react'
import * as React from 'react'

import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import { TeamSwitcher } from '@/components/team-switcher'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'

// This is sample data.
const data = {
  user: {
    name: 'Admin',
    email: 'admin@macstore.com',
    avatar: '/avatars/admin.jpg'
  },
  teams: [
    {
      name: 'Mac Store',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise'
    },
    {
      name: 'Tech Shop',
      logo: AudioWaveform,
      plan: 'Pro'
    },
    {
      name: 'Electronics',
      logo: Command,
      plan: 'Basic'
    }
  ],
  navMain: [
    {
      title: 'Sản phẩm',
      url: '/products',
      icon: Package,
      items: [
        {
          title: 'Đăng sản phẩm',
          url: '/admin/products/create'
        },
        {
          title: 'Tất cả sản phẩm',
          url: '/admin/products/all'
        }
      ]
    },
    {
      title: 'Danh mục',
      url: '/categories',
      icon: ShoppingCart,
      items: [
        {
          title: 'Tạo danh mục mới',
          url: '/admin/categories/new'
        },
        {
          title: 'Tất cả danh mục',
          url: '/admin/categories/all'
        }
      ]
    },
    {
      title: 'Hình ảnh',
      url: '/images',
      icon: ImageIcon
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
