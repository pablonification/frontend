'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Search, ChevronDown } from 'lucide-react'
import Image from 'next/image'

interface NavItem {
  name: string;
  href?: string;
  children?: NavItem[];
  isDropdown?: boolean;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [expandedMobileDropdowns, setExpandedMobileDropdowns] = useState<string[]>([])
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const navigation: NavItem[] = [
    { name: 'Beranda', href: '/' },
    { name: 'Virtual Lab', href: '/virtual-lab' },
    { name: 'Praktikum', href: '/praktikum' },
    { name: 'Pengumuman', href: '/pengumuman' },
    {
      name: 'Tentang',
      isDropdown: true,
      children: [
        { name: 'Tentang Lab', href: '/about' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Kontak', href: '/kontak' }
      ]
    }
  ]

  // Handle dropdown hover with delays
  const handleDropdownHover = (itemName: string, isEntering: boolean) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    
    if (isEntering) {
      setOpenDropdown(itemName);
    } else {
      const timeout = setTimeout(() => {
        setOpenDropdown(null);
      }, 200);
      setDropdownTimeout(timeout);
    }
  }

  // Toggle mobile dropdown
  const toggleMobileDropdown = (itemName: string) => {
    setExpandedMobileDropdowns(prev =>
      prev.includes(itemName)
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);

  // Close mobile menu when navigating
  const handleNavigation = () => {
    setIsMenuOpen(false);
    setExpandedMobileDropdowns([]);
  }

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
          <nav className="hidden lg:flex items-center space-x-10" ref={dropdownRef}>
            {navigation.map((item) => (
              item.children ? (
                // Dropdown trigger
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleDropdownHover(item.name, true)}
                  onMouseLeave={() => handleDropdownHover(item.name, false)}
                >
                  <button
                    className="flex items-center space-x-1 text-neutral-600 hover:text-primary-600 font-medium transition-all duration-300 hover:-translate-y-0.5 relative group focus:outline-none focus-visible:focus"
                    aria-haspopup="true"
                    aria-expanded={openDropdown === item.name}
                    aria-controls={`dropdown-${item.name.toLowerCase().replace(' ', '-')}`}
                  >
                    <span>{item.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div
                    id={`dropdown-${item.name.toLowerCase().replace(' ', '-')}`}
                    className={`absolute top-full left-0 mt-2 w-48 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-neutral-100 transition-all duration-200 overflow-hidden ${
                      openDropdown === item.name ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                    role="menu"
                    onMouseEnter={() => handleDropdownHover(item.name, true)}
                    onMouseLeave={() => handleDropdownHover(item.name, false)}
                  >
                    <div className="py-2">
                      {item.children.map((child, index) => (
                        <Link
                          key={index}
                          href={child.href}
                          className="block px-4 py-3 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 hover:translate-x-1 first:rounded-t-xl last:rounded-b-xl"
                          role="menuitem"
                          onClick={handleNavigation}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                // Regular link
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-neutral-600 hover:text-primary-600 font-medium transition-all duration-300 hover:-translate-y-0.5 relative group"
                  onClick={handleNavigation}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )
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
              Login
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
                item.children ? (
                  // Expandable section
                  <div key={item.name} className="border-b border-neutral-100 last:border-b-0">
                    <button
                      onClick={() => toggleMobileDropdown(item.name)}
                      className="w-full flex items-center justify-between text-neutral-600 hover:text-primary-600 font-medium transition-colors duration-300 py-3 px-4 rounded-xl hover:bg-neutral-50 focus:outline-none focus-visible:focus"
                      aria-expanded={expandedMobileDropdowns.includes(item.name)}
                      aria-controls={`mobile-${item.name.toLowerCase().replace(' ', '-')}`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                        expandedMobileDropdowns.includes(item.name) ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    {/* Nested items */}
                    <div
                      id={`mobile-${item.name.toLowerCase().replace(' ', '-')}`}
                      className={`overflow-hidden transition-all duration-300 ${
                        expandedMobileDropdowns.includes(item.name) ? 'max-h-48' : 'max-h-0'
                      }`}
                      role="region"
                      aria-label={`${item.name} submenu`}
                    >
                      <div className="pl-4 pr-4 pb-2 space-y-1">
                        {item.children.map((child, index) => (
                          <Link
                            key={index}
                            href={child.href}
                            className="block text-neutral-600 hover:text-primary-600 font-medium transition-colors duration-300 py-2 px-4 rounded-xl hover:bg-neutral-50"
                            onClick={handleNavigation}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Regular link
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-neutral-600 hover:text-primary-600 font-medium transition-colors duration-300 py-3 px-4 rounded-xl hover:bg-neutral-50"
                    onClick={handleNavigation}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <Link
                href="/admin/login"
                className="sm:hidden px-4 py-3 text-sm bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all duration-300 text-center font-medium"
                onClick={handleNavigation}
              >
                Login
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}