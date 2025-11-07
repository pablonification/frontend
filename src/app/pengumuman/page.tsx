'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, AlertCircle } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { useApp } from '../../contexts/AppContext'
import { api, endpoints, Announcement } from '../../lib/api'

interface TransformedAnnouncement extends Omit<Announcement, 'is_important' | 'published_at'> {
  isImportant: boolean
  publishedAt: string
  excerpt: string
}

export default function PengumumanPage() {
  const { addNotification } = useApp()
  const [announcements, setAnnouncements] = useState<TransformedAnnouncement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await api.get<Announcement[]>(endpoints.announcements.list)
        // Transform API response to match component structure
        const transformedAnnouncements: TransformedAnnouncement[] = (response.data || []).map((announcement) => ({
          ...announcement,
          isImportant: announcement.is_important || false,
          publishedAt: announcement.published_at,
          excerpt: announcement.content.length > 150 
            ? announcement.content.substring(0, 150) + '...'
            : announcement.content
        }))
        setAnnouncements(transformedAnnouncements)
        
      } catch (err) {
        console.error('Error fetching announcements:', err)
        setError('Failed to load announcements')
        addNotification({
          type: 'error',
          title: 'Error',
          message: 'Failed to load announcements'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [addNotification])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Baru saja'
    if (diffInHours < 24) return `${diffInHours} jam yang lalu`
    if (diffInHours < 48) return 'Kemarin'
    return `${Math.floor(diffInHours / 24)} hari yang lalu`
  }

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
                Informasi Terkini
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight tracking-tight">
                Pengumuman
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed max-w-4xl mx-auto">
                Informasi terkini dari Laboratorium Kimia Dasar tentang praktikum,
                jadwal, dan hal penting lainnya.
              </p>
            </div>
          </div>
        </section>

        {/* Announcements List */}
        <section className="section-padding bg-white" id="announcements">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              {loading && (
                <div className="flex justify-center items-center py-20">
                  <LoadingSpinner />
                </div>
              )}

              {error && !loading && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                  <div className="flex items-center space-x-2 text-red-800">
                    <AlertCircle className="w-5 h-5" />
                    <p className="font-medium">{error}</p>
                  </div>
                </div>
              )}

              {!loading && !error && announcements.length === 0 && (
                <div className="text-center py-20">
                  <AlertCircle className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                  <p className="text-xl text-neutral-600 mb-2">Belum ada pengumuman</p>
                  <p className="text-neutral-500">Pengumuman akan muncul di sini setelah dipublikasikan.</p>
                </div>
              )}

              {!loading && !error && announcements.length > 0 && (
                <div className="space-y-8">
                  {announcements.map((announcement) => (
                  <Card
                    key={announcement.id}
                    className={`p-8 group cursor-pointer border-neutral-100 hover:shadow-xl transition-all duration-300 ${
                      announcement.isImportant ? 'border-l-4 border-primary-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        {announcement.isImportant && (
                          <div className="flex items-center space-x-2 text-primary-600">
                            <AlertCircle className="w-5 h-5" />
                            <Badge variant="error">Penting</Badge>
                          </div>
                        )}
                        <div className="flex items-center text-sm text-neutral-500 space-x-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(announcement.publishedAt)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            {formatRelativeTime(announcement.publishedAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-neutral-900 mb-4 hover:text-primary-600 transition-colors duration-300">
                      <a href={`/pengumuman/${announcement.id}`} className="group">
                        {announcement.title}
                        <span className="block text-sm text-primary-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Baca selengkapnya →
                        </span>
                      </a>
                    </h2>
                    
                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      {announcement.excerpt}
                    </p>
                    
                    
                    <div className="flex items-center justify-between">
                      {/* <div className="text-sm text-neutral-500 font-medium">
                        ID: #{announcement.id.toString().padStart(3, '0')}
                      </div> */}
                    </div>
                  </Card>
                  ))}
                  
                  {/* Pagination would go here in a real app */}
                  <div className="text-center mt-16">
                    <div className="inline-flex items-center space-x-2">
                      <Button variant="ghost" size="sm" disabled>
                        Sebelumnya
                      </Button>
                      <Button variant="primary" size="sm" disabled>
                        1
                      </Button>
                      <Button variant="ghost" size="sm">
                        Selanjutnya
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
