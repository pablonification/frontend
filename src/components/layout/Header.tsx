'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang Lab', href: '/about' },
    { name: 'Virtual Lab', href: '/virtual-lab' },
    { name: 'Praktikum', href: '/praktikum' },
    { name: 'Pengumuman', href: '/pengumuman' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Kontak', href: '/kontak' },
  ]

  return (
    <header className="bg-white/60 backdrop-blur-sm border-b border-neutral-100 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <Image src="/logo_itb2.png" alt="Lab Kimia Dasar" width={55} height={55} />
              <span className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors duration-300">
                Lab Kimia Dasar
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-neutral-600 hover:text-primary-600 font-medium transition-all duration-300 hover:-translate-y-0.5 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Link
              href="/search"
              className="p-3 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-xl transition-all duration-300"
              aria-label="Cari"
            >
              <Search className="w-5 h-5" />
            </Link>
            
            {/* Admin Link */}
            <Link
              href="/admin/login"
              className="hidden sm:block px-4 py-2 text-sm bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            >
              Admin
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-xl transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-neutral-100 py-6 animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-neutral-600 hover:text-primary-600 font-medium transition-colors duration-300 py-3 px-4 rounded-xl hover:bg-neutral-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/admin/login"
                className="sm:hidden px-4 py-3 text-sm bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all duration-300 text-center font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}