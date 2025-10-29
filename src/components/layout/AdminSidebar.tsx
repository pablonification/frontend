'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Image,
  BookOpen,
  Award,
  Settings,
  LogOut,
  Menu,
  X,
  Home
} from 'lucide-react'
import Button from '../ui/Button'

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard
    },
    {
      name: 'Pengumuman',
      href: '/admin/announcements',
      icon: FileText
    },
    {
      name: 'Slider',
      href: '/admin/sliders',
      icon: Image
    },
    {
      name: 'File',
      href: '/admin/files',
      icon: FileText
    },
    {
      name: 'Modul',
      href: '/admin/modules',
      icon: BookOpen
    },
    {
      name: 'Nilai',
      href: '/admin/nilai',
      icon: Award
    }
  ]

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  return (
    <div className={`bg-white border-r border-neutral-100 h-screen flex flex-col transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-72'
    }`}>
      {/* Header */}
      <div className="p-6 border-b border-neutral-100">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-lg font-bold text-neutral-900">
                Admin Panel
              </span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2.5 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                active
                  ? 'bg-primary-50 text-primary-700 border border-primary-200 shadow-sm'
                  : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 hover:shadow-sm'
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${
                active ? 'text-primary-600' : 'text-neutral-500 group-hover:text-primary-600'
              }`} />
              {!isCollapsed && (
                <span className="font-medium">{item.name}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-100 space-y-2">
        {/* Back to Website */}
        <Link
          href="/"
          className="flex items-center space-x-3 px-4 py-3 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-xl transition-all duration-300 group hover:shadow-sm"
        >
          <Home className="w-5 h-5 text-neutral-500 group-hover:text-primary-600" />
          {!isCollapsed && (
            <span className="font-medium">Kembali ke Website</span>
          )}
        </Link>

        {/* Logout */}
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-300 group hover:shadow-sm">
          <LogOut className="w-5 h-5 text-red-500 group-hover:text-red-600" />
          {!isCollapsed && (
            <span className="font-medium">Keluar</span>
          )}
        </button>
      </div>
    </div>
  )
}