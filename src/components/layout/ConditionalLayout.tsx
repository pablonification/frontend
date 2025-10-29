'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import AdminLayout from './AdminLayout'

interface ConditionalLayoutProps {
  children: ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login'

  useEffect(() => {
    // Check authentication for admin routes
    if (isAdminRoute) {
      // Check if we're on the client side
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token')
        if (!token) {
          router.push('/admin/login')
        }
      }
    }
  }, [isAdminRoute, router])

  if (isAdminRoute) {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        // Return null while redirecting
        return null
      }
      return <AdminLayout>{children}</AdminLayout>
    }
    // Return null on server side for admin routes
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}