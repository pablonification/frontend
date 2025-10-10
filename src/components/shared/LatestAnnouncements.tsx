'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

interface Announcement {
  id: number
  title: string
  excerpt: string
  publishedAt: string
  isImportant: boolean
}

// Mock data - in real app, this would come from API
const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    title: 'Jadwal Praktikum Semester Genap 2024',
    excerpt: 'Jadwal praktikum untuk semester genap 2024 telah tersedia. Silakan cek jadwal masing-masing kelompok.',
    publishedAt: '2024-01-15',
    isImportant: true
  },
  {
    id: 2,
    title: 'Pembagian Kelompok Praktikum',
    excerpt: 'Daftar pembagian kelompok praktikum kimia dasar telah diumumkan. Cek kelompok Anda di halaman praktikum.',
    publishedAt: '2024-01-12',
    isImportant: false
  },
  {
    id: 3,
    title: 'Modul Praktikum Terbaru',
    excerpt: 'Modul praktikum untuk percobaan 1-5 telah diperbarui. Silakan download modul terbaru.',
    publishedAt: '2024-01-10',
    isImportant: false
  }
]

export default function LatestAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])

  useEffect(() => {
    // Simulate API call
    setAnnouncements(mockAnnouncements)
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (announcements.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500">Belum ada pengumuman terbaru.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {announcements.map((announcement) => (
        <div
          key={announcement.id}
          className={`card p-6 hover:shadow-lg transition-all duration-200 ${
            announcement.isImportant ? 'border-l-4 border-primary-500' : ''
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                {announcement.isImportant && (
                  <span className="badge-error">Penting</span>
                )}
                <div className="flex items-center text-sm text-neutral-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(announcement.publishedAt)}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-neutral-900 mb-2 hover:text-primary-600 transition-colors duration-200">
                <Link href={`/pengumuman/${announcement.id}`}>
                  {announcement.title}
                </Link>
              </h3>
              
              <p className="text-neutral-600 mb-4 leading-relaxed">
                {announcement.excerpt}
              </p>
              
              <Link
                href={`/pengumuman/${announcement.id}`}
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
              >
                Baca selengkapnya
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      ))}
      
      <div className="text-center pt-6">
        <Link
          href="/pengumuman"
          className="btn-primary"
        >
          Lihat Semua Pengumuman
        </Link>
      </div>
    </div>
  )
}
