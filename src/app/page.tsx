'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  Award, 
  ChevronRight,
  Play,
  Users,
  Clock,
  TrendingUp
} from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ErrorAlert from '../components/ErrorAlert'
import { useApp } from '../contexts/AppContext'

export default function HomePage() {
  const { addNotification } = useApp()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const quickAccessItems = [
    {
      title: 'Modul Praktikum',
      description: 'Download modul praktikum terbaru',
      icon: BookOpen,
      href: '/praktikum',
      color: 'bg-blue-500'
    },
    {
      title: 'Jadwal Praktikum',
      description: 'Lihat jadwal praktikum Anda',
      icon: Calendar,
      href: '/praktikum',
      color: 'bg-green-500'
    },
    {
      title: 'Pengumuman',
      description: 'Informasi terbaru dari lab',
      icon: FileText,
      href: '/pengumuman',
      color: 'bg-orange-500'
    },
    {
      title: 'Nilai Praktikum',
      description: 'Cek nilai praktikum Anda',
      icon: Award,
      href: '/praktikum',
      color: 'bg-purple-500'
    }
  ]

  const announcements = [
    {
      id: 1,
      title: 'Jadwal Praktikum Semester Ganjil 2024/2025',
      excerpt: 'Jadwal praktikum untuk semester ganjil telah tersedia. Silakan cek jadwal kelompok Anda.',
      publishedAt: '2024-01-15T10:00:00Z',
      category: 'academic'
    },
    {
      id: 2,
      title: 'Pembaruan Modul Praktikum',
      excerpt: 'Modul praktikum telah diperbarui dengan materi terbaru. Silakan download versi terbaru.',
      publishedAt: '2024-01-10T14:30:00Z',
      category: 'info'
    },
    {
      id: 3,
      title: 'Panduan Praktikum Online',
      excerpt: 'Panduan lengkap untuk mengikuti praktikum online dapat diakses di halaman praktikum.',
      publishedAt: '2024-01-05T09:15:00Z',
      category: 'info'
    }
  ]

  const stats = {
    totalStudents: 1200,
    totalModules: 24,
    totalAnnouncements: 15,
    totalDownloads: 3500
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic':
        return 'badge-primary'
      case 'urgent':
        return 'badge-error'
      case 'info':
        return 'badge-secondary'
      default:
        return 'badge-primary'
    }
  }

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'academic':
        return 'Akademik'
      case 'urgent':
        return 'Penting'
      case 'info':
        return 'Informasi'
      default:
        return 'Informasi'
    }
  }

  if (loading) {
    return <LoadingSpinner.Page message="Memuat halaman utama..." />
  }
  return (
    <div className="min-h-screen">
      {error && (
        <div className="container-custom py-4">
          <ErrorAlert 
            message={error}
            onDismiss={() => setError(null)}
          />
        </div>
      )}
      
      {/* Hero Section */}
      <section className="hero-gradient">
        <div className="container-custom section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
                  Laboratorium{' '}
                  <span className="gradient-text">Kimia Dasar</span>
                </h1>
                <p className="text-xl text-neutral-600 leading-relaxed">
                  Fasilitas terbaik untuk pembelajaran praktikum kimia dasar 
                  dengan teknologi modern dan pengajar berpengalaman.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/praktikum">
                  <Button size="lg" className="w-full sm:w-auto">
                    Mulai Praktikum
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  <Play className="mr-2 h-5 w-5" />
                  Lihat Demo
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center mx-auto">
                    <BookOpen className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-700">
                    Praktikum Online
                  </h3>
                  <p className="text-primary-600">
                    Akses mudah dan terintegrasi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Akses Cepat
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Semua yang Anda butuhkan untuk praktikum kimia dasar dalam satu tempat
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickAccessItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-200 group cursor-pointer">
                  <div className={`w-16 h-16 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {item.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-neutral-900 mb-2">
                {stats.totalStudents?.toLocaleString() || '1,200'}
              </div>
              <p className="text-neutral-600">Mahasiswa Aktif</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-neutral-900 mb-2">
                {stats.totalModules || '24'}
              </div>
              <p className="text-neutral-600">Modul Praktikum</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-neutral-900 mb-2">
                {stats.totalAnnouncements || '15'}
              </div>
              <p className="text-neutral-600">Pengumuman</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-neutral-900 mb-2">
                {stats.totalDownloads?.toLocaleString() || '3,500'}
              </div>
              <p className="text-neutral-600">Total Download</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Announcements */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Pengumuman Terbaru
              </h2>
              <p className="text-xl text-neutral-600">
                Informasi terkini dari Laboratorium Kimia Dasar
              </p>
            </div>
            <Link href="/pengumuman">
              <Button variant="secondary">
                Lihat Semua
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <span className={`badge ${getCategoryColor(announcement.category)}`}>
                    {getCategoryText(announcement.category)}
                  </span>
                  <span className="text-sm text-neutral-500 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(announcement.publishedAt).toLocaleDateString('id-ID')}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-neutral-900 mb-3 line-clamp-2">
                  {announcement.title}
                </h3>
                
                <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                  {announcement.excerpt}
                </p>
                
                <Link 
                  href={`/pengumuman/${announcement.id}`}
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center group"
                >
                  Baca selengkapnya
                  <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-500">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap Memulai Praktikum?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan mahasiswa yang telah merasakan pengalaman 
            praktikum terbaik di Laboratorium Kimia Dasar ITB.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/praktikum">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Mulai Sekarang
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/kontak">
              <Button size="lg" variant="ghost" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-primary-600">
                Hubungi Kami
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}