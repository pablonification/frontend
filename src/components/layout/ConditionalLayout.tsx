'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import AdminLayout from './AdminLayout'

interface ConditionalLayoutProps {
  children: ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login'

  if (isAdminRoute) {
    return <AdminLayout>{children}</AdminLayout>
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