'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang Lab', href: '/about' },
    { name: 'Praktikum', href: '/praktikum' },
    { name: 'Pengumuman', href: '/pengumuman' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Kontak', href: '/kontak' },
  ]

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold text-neutral-900">
                Lab Kimia Dasar
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-neutral-600 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Link
              href="/search"
              className="p-2 text-neutral-600 hover:text-primary-600 transition-colors duration-200"
              aria-label="Cari"
            >
              <Search className="w-5 h-5" />
            </Link>
            
            {/* Admin Link */}
            <Link
              href="/admin/login"
              className="px-3 py-1 text-sm bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors duration-200"
            >
              Admin
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-neutral-600 hover:text-primary-600 transition-colors duration-200"
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
          <div className="md:hidden border-t border-neutral-200 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-neutral-600 hover:text-primary-600 font-medium transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}