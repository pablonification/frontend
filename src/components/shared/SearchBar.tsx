'use client'

import React, { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  debounceMs?: number
  className?: string
}

export default function SearchBar({
  onSearch,
  placeholder = 'Cari...',
  debounceMs = 300,
  className = ''
}: SearchBarProps) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query)
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [query, onSearch, debounceMs])

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}