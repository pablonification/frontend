'use client'

import { useState, useEffect } from 'react'
import { Metadata } from 'next'
import Footer from '../../components/layout/Footer'
import { Search, FileText, Calendar, BookOpen, AlertCircle } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { useApp } from '../../contexts/AppContext'
import { api, endpoints, Announcement, Module, SearchResult } from '../../lib/api'

export default function SearchPage() {
  const { addNotification } = useApp()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
      // Make real API call to search
      const response = await api.getWithQuery<SearchResult[]>(endpoints.search.global, {
        q: query,
        type: activeTab === 'all' ? undefined : activeTab
      })
      
      setSearchResults(response.data || [])
    } catch (err) {
      console.error('Error searching:', err)
      setError('Failed to search. Please try again.')
      addNotification({
        type: 'error',
        title: 'Search Error',
        message: 'Failed to search. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery)
    }
  }, [searchQuery, activeTab])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'announcement':
        return <AlertCircle className="w-5 h-5 text-blue-600" />
      case 'module':
        return <BookOpen className="w-5 h-5 text-green-600" />
      default:
        return <FileText className="w-5 h-5 text-neutral-600" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'announcement':
        return 'Pengumuman'
      case 'module':
        return 'Modul'
      default:
        return 'Lainnya'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const tabs = [
    { id: 'all', label: 'Semua', count: searchResults.length },
    { id: 'announcements', label: 'Pengumuman', count: searchResults.filter(r => r.type === 'announcement').length },
    { id: 'modules', label: 'Modul', count: searchResults.filter(r => r.type === 'module').length }
  ]

  return (
    <div className="min-h-screen bg-white">
      
      <main>
        {/* Hero Section */}
        <section className="hero-gradient relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent"></div>
          <div className="container-custom section-padding relative">
            <div className="text-center max-w-5xl mx-auto space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
                Pencarian
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight tracking-tight">
                Pencarian
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed max-w-4xl mx-auto">
                Cari informasi yang Anda butuhkan di website Lab Kimia Dasar
              </p>
              
              {/* Search Input */}
              <div className="relative max-w-3xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari pengumuman, modul, atau informasi lainnya..."
                    className="w-full pl-16 pr-6 py-5 text-xl border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Results */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              {/* Search Tabs */}
              {searchQuery && (
                <div className="mb-12">
                  <div className="inline-flex items-center bg-neutral-100 p-1 rounded-2xl">
                    {tabs.map((tab) => (
                      <Button
                        key={tab.id}
                        variant={activeTab === tab.id ? "primary" : "ghost"}
                        size="sm"
                        onClick={() => setActiveTab(tab.id)}
                        className={`rounded-xl ${
                          activeTab === tab.id ? "shadow-md" : ""
                        }`}
                      >
                        {tab.label} ({tab.count})
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Results */}
              {searchQuery ? (
                <div>
                  {isLoading ? (
                    <div className="text-center py-16">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-3 border-primary-500"></div>
                      <p className="mt-6 text-xl text-neutral-600">Mencari...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div>
                      <div className="mb-8">
                        <p className="text-lg text-neutral-600">
                          Ditemukan {searchResults.length} hasil untuk "{searchQuery}"
                        </p>
                      </div>
                      
                      <div className="space-y-8">
                        {searchResults.map((result) => (
                          <Card
                            key={result.id}
                            className="p-8 group cursor-pointer border-neutral-100 hover:shadow-xl transition-all duration-300"
                          >
                            <div className="flex items-start space-x-6">
                              <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                                {getTypeIcon(result.type)}
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center space-x-4 mb-4">
                                  <Badge variant="primary" className="text-sm">
                                    {getTypeLabel(result.type)}
                                  </Badge>
                                  <div className="flex items-center text-sm text-neutral-500">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {formatDate(result.created_at)}
                                  </div>
                                </div>
                                
                                <h3 className="text-2xl font-semibold text-neutral-900 mb-4 hover:text-primary-600 transition-colors duration-300">
                                  <a href={result.url} className="group">
                                    {result.title}
                                    <span className="block text-sm text-primary-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                      Baca selengkapnya →
                                    </span>
                                  </a>
                                </h3>
                                
                                <p className="text-neutral-600 mb-6 leading-relaxed text-lg">
                                  {result.excerpt}
                                </p>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Search className="w-10 h-10 text-neutral-400" />
                      </div>
                      <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
                        Tidak ada hasil ditemukan
                      </h3>
                      <p className="text-lg text-neutral-600 mb-8 max-w-md mx-auto">
                        Coba gunakan kata kunci yang berbeda atau periksa ejaan
                      </p>
                      <Button onClick={() => setSearchQuery('')} className="shadow-lg hover:shadow-xl">
                        Hapus Pencarian
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
                    Mulai Pencarian
                  </h3>
                  <p className="text-lg text-neutral-600 max-w-md mx-auto">
                    Masukkan kata kunci untuk mencari informasi yang Anda butuhkan
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
