'use client'

import { useState, useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
  showClear?: boolean
  autoFocus?: boolean
}

const SearchBar = ({ 
  placeholder = 'Cari...',
  onSearch,
  className,
  showClear = true,
  autoFocus = false
}: SearchBarProps) => {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()

  const handleSearch = useCallback((searchQuery: string) => {
    if (onSearch) {
      onSearch(searchQuery)
    } else {
      // Default behavior: navigate to search page
      if (searchQuery.trim()) {
        router.push(`/pencarian?q=${encodeURIComponent(searchQuery.trim())}`)
      }
    }
  }, [onSearch, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  const handleClear = () => {
    setQuery('')
    if (onSearch) {
      onSearch('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setQuery('')
      setIsFocused(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          className="w-full px-3 py-2 pl-10 pr-10 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
          autoFocus={autoFocus}
        />
        {showClear && query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 p-2">
          <p className="text-xs text-neutral-500 px-2 py-1">
            Tekan Enter untuk mencari
          </p>
        </div>
      )}
    </form>
  )
}

export default SearchBar