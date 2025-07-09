'use client'

import * as React from 'react'
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Package,
  Plus,
  List,
  Settings,
  LayoutDashboard,
  Users,
  ShoppingCart,
  User,
  LogOut
} from 'lucide-react'

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
          url: '/products/create'
        },
        {
          title: 'Tất cả sản phẩm',
          url: '/products'
        },
        {
          title: 'Quản lý sản phẩm',
          url: '/products/manage'
        },
        {
          title: 'Danh mục',
          url: '/products/categories'
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
          url: '/categories/new'
        },
        {
          title: 'Tất cả danh mục',
          url: '/categories/all'
        }
      ]
    },
    {
      title: 'Hình ảnh',
      url: '/images',
      icon: Users
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
