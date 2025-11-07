import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Calendar, Clock, AlertCircle, Download, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { api, endpoints, Announcement } from '../../../lib/api'

interface TransformedAnnouncement extends Omit<Announcement, 'is_important' | 'published_at'> {
  isImportant: boolean
  publishedAt: string
}

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  
  try {
    const response = await api.get<Announcement>(`/api/announcements/${id}`)
    const announcement = response.data
    
    if (!announcement) {
      return {
        title: 'Pengumuman Tidak Ditemukan - Lab Kimia Dasar',
      }
    }

    return {
      title: `${announcement.title} - Lab Kimia Dasar`,
      description: announcement.content.substring(0, 160) + '...',
    }
  } catch (error) {
    console.error('Error fetching announcement for metadata:', error)
    return {
      title: 'Pengumuman Tidak Ditemukan - Lab Kimia Dasar',
    }
  }
}

async function getAnnouncement(id: string): Promise<TransformedAnnouncement | null> {
  try {
    const response = await api.get<Announcement>(`/api/announcements/${id}`)
    const announcement = response.data
    
    if (!announcement) {
      return null
    }
    
    // Transform API response to match component structure
    return {
      ...announcement,
      isImportant: announcement.is_important || false,
      publishedAt: announcement.published_at
    }
  } catch (error) {
    console.error('Error fetching announcement:', error)
    return null
  }
}

export default async function AnnouncementDetailPage({ params }: PageProps) {
  const { id } = await params
  const announcement = await getAnnouncement(id)
  
  if (!announcement) {
    notFound()
  }

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
    <div className="min-h-screen bg-neutral-50">

      
      <main>
        {/* Breadcrumb */}
        <section className="bg-white border-b border-neutral-200">
          <div className="container-custom py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-neutral-500 hover:text-neutral-700">
                Beranda
              </Link>
              <span className="text-neutral-400">/</span>
              <Link href="/pengumuman" className="text-neutral-500 hover:text-neutral-700">
                Pengumuman
              </Link>
              <span className="text-neutral-400">/</span>
              <span className="text-neutral-900 font-medium">
                #{announcement.id.toString().padStart(3, '0')}
              </span>
            </nav>
          </div>
        </section>

        {/* Announcement Detail */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <div className="mb-8">
                <Link
                  href="/pengumuman"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke Pengumuman
                </Link>
              </div>

              {/* Announcement Header */}
              <article className="card p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    {announcement.isImportant && (
                      <div className="flex items-center space-x-2 text-primary-600">
                        <AlertCircle className="w-5 h-5" />
                        <span className="font-medium">Penting</span>
                      </div>
                    )}
                    <div className="flex items-center text-sm text-neutral-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(announcement.publishedAt)}
                    </div>
                    <div className="flex items-center text-sm text-neutral-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatRelativeTime(announcement.publishedAt)}
                    </div>
                  </div>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                  {announcement.title}
                </h1>
                
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-line text-neutral-700 leading-relaxed">
                    {announcement.content}
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
