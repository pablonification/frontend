'use client'

import { useState, useEffect } from 'react'
import { Metadata } from 'next'
import Footer from '../../components/layout/Footer'
import { Search, FileText, Calendar, BookOpen, AlertCircle } from 'lucide-react'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('all')

  // Mock search results - in real app, this would come from API
  const mockResults = {
    all: [
      {
        id: 1,
        type: 'announcement',
        title: 'Jadwal Praktikum Semester Genap 2024',
        excerpt: 'Jadwal praktikum untuk semester genap 2024 telah tersedia...',
        date: '2024-01-15',
        url: '/pengumuman/1'
      },
      {
        id: 2,
        type: 'module',
        title: 'Modul Praktikum Percobaan 1',
        excerpt: 'Modul praktikum untuk percobaan 1: Pengenalan Alat dan Bahan...',
        date: '2024-01-10',
        url: '/praktikum'
      },
      {
        id: 3,
        type: 'announcement',
        title: 'Pembagian Kelompok Praktikum',
        excerpt: 'Daftar pembagian kelompok praktikum kimia dasar telah diumumkan...',
        date: '2024-01-12',
        url: '/pengumuman/2'
      }
    ],
    announcements: [
      {
        id: 1,
        type: 'announcement',
        title: 'Jadwal Praktikum Semester Genap 2024',
        excerpt: 'Jadwal praktikum untuk semester genap 2024 telah tersedia...',
        date: '2024-01-15',
        url: '/pengumuman/1'
      },
      {
        id: 3,
        type: 'announcement',
        title: 'Pembagian Kelompok Praktikum',
        excerpt: 'Daftar pembagian kelompok praktikum kimia dasar telah diumumkan...',
        date: '2024-01-12',
        url: '/pengumuman/2'
      }
    ],
    modules: [
      {
        id: 2,
        type: 'module',
        title: 'Modul Praktikum Percobaan 1',
        excerpt: 'Modul praktikum untuk percobaan 1: Pengenalan Alat dan Bahan...',
        date: '2024-01-10',
        url: '/praktikum'
      }
    ]
  }

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const results = mockResults[activeTab as keyof typeof mockResults] || []
      setSearchResults(results)
      setIsLoading(false)
    }, 500)
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
    { id: 'all', label: 'Semua', count: mockResults.all.length },
    { id: 'announcements', label: 'Pengumuman', count: mockResults.announcements.length },
    { id: 'modules', label: 'Modul', count: mockResults.modules.length }
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      
      <main>
        {/* Hero Section */}
        <section className="hero-gradient section-padding">
          <div className="container-custom">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
                Pencarian
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed mb-8">
                Cari informasi yang Anda butuhkan di website Lab Kimia Dasar
              </p>
              
              {/* Search Input */}
              <div className="relative max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari pengumuman, modul, atau informasi lainnya..."
                    className="w-full pl-12 pr-4 py-4 text-lg border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Results */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              {/* Search Tabs */}
              {searchQuery && (
                <div className="mb-8">
                  <div className="flex space-x-1 bg-neutral-100 p-1 rounded-lg">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                          activeTab === tab.id
                            ? 'bg-white text-primary-600 shadow-sm'
                            : 'text-neutral-600 hover:text-neutral-900'
                        }`}
                      >
                        {tab.label} ({tab.count})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Results */}
              {searchQuery ? (
                <div>
                  {isLoading ? (
                    <div className="text-center py-12">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                      <p className="mt-4 text-neutral-600">Mencari...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div>
                      <div className="mb-6">
                        <p className="text-neutral-600">
                          Ditemukan {searchResults.length} hasil untuk "{searchQuery}"
                        </p>
                      </div>
                      
                      <div className="space-y-6">
                        {searchResults.map((result) => (
                          <div
                            key={result.id}
                            className="card p-6 hover:shadow-lg transition-all duration-200"
                          >
                            <div className="flex items-start space-x-4">
                              <div className="flex-shrink-0">
                                {getTypeIcon(result.type)}
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="badge-primary text-xs">
                                    {getTypeLabel(result.type)}
                                  </span>
                                  <div className="flex items-center text-sm text-neutral-500">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {formatDate(result.date)}
                                  </div>
                                </div>
                                
                                <h3 className="text-xl font-semibold text-neutral-900 mb-2 hover:text-primary-600 transition-colors duration-200">
                                  <a href={result.url}>
                                    {result.title}
                                  </a>
                                </h3>
                                
                                <p className="text-neutral-600 mb-4 leading-relaxed">
                                  {result.excerpt}
                                </p>
                                
                                <a
                                  href={result.url}
                                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                                >
                                  Baca selengkapnya →
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Search className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                        Tidak ada hasil ditemukan
                      </h3>
                      <p className="text-neutral-600 mb-6">
                        Coba gunakan kata kunci yang berbeda atau periksa ejaan
                      </p>
                      <button
                        onClick={() => setSearchQuery('')}
                        className="btn-primary"
                      >
                        Hapus Pencarian
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    Mulai Pencarian
                  </h3>
                  <p className="text-neutral-600">
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
