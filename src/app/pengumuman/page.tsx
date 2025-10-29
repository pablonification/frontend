import { Metadata } from 'next'
import { Calendar, Clock, AlertCircle } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'

export const metadata: Metadata = {
  title: 'Pengumuman - Lab Kimia Dasar',
  description: 'Informasi terkini dari Laboratorium Kimia Dasar tentang praktikum, jadwal, dan hal penting lainnya.',
}

export default function PengumumanPage() {
  const announcements = [
    {
      id: 1,
      title: 'Jadwal Praktikum Semester Genap 2024',
      excerpt: 'Jadwal praktikum untuk semester genap 2024 telah tersedia. Silakan cek jadwal masing-masing kelompok dan pastikan kehadiran tepat waktu.',
      content: 'Jadwal praktikum untuk semester genap 2024 telah tersedia. Silakan cek jadwal masing-masing kelompok dan pastikan kehadiran tepat waktu. Praktikum akan dimulai pada minggu kedua semester. Pastikan Anda telah menyiapkan modul praktikum dan alat tulis yang diperlukan.',
      publishedAt: '2024-01-15T10:00:00Z',
      isImportant: true,
      attachments: ['jadwal-praktikum-2024.pdf']
    },
    {
      id: 2,
      title: 'Pembagian Kelompok Praktikum',
      excerpt: 'Daftar pembagian kelompok praktikum kimia dasar telah diumumkan. Cek kelompok Anda di halaman praktikum.',
      content: 'Daftar pembagian kelompok praktikum kimia dasar telah diumumkan. Setiap kelompok terdiri dari 4-5 mahasiswa. Silakan cek kelompok Anda di halaman praktikum dan pastikan Anda mengetahui jadwal praktikum kelompok Anda.',
      publishedAt: '2024-01-12T14:30:00Z',
      isImportant: false,
      attachments: ['pembagian-kelompok-2024.pdf']
    },
    {
      id: 3,
      title: 'Modul Praktikum Terbaru',
      excerpt: 'Modul praktikum untuk percobaan 1-5 telah diperbarui. Silakan download modul terbaru sebelum praktikum dimulai.',
      content: 'Modul praktikum untuk percobaan 1-5 telah diperbarui dengan beberapa perbaikan dan penambahan materi. Silakan download modul terbaru sebelum praktikum dimulai. Pastikan Anda membawa modul yang sudah dicetak saat praktikum.',
      publishedAt: '2024-01-10T09:15:00Z',
      isImportant: false,
      attachments: ['modul-praktikum-2024.pdf']
    },
    {
      id: 4,
      title: 'Perubahan Jadwal Praktikum Kelas A1',
      excerpt: 'Ada perubahan jadwal praktikum untuk kelas A1. Praktikum yang seharusnya dilaksanakan pada hari Senin dipindahkan ke hari Selasa.',
      content: 'Ada perubahan jadwal praktikum untuk kelas A1. Praktikum yang seharusnya dilaksanakan pada hari Senin, 15 Januari 2024 dipindahkan ke hari Selasa, 16 Januari 2024 pada waktu yang sama. Mohon maaf atas ketidaknyamanan ini.',
      publishedAt: '2024-01-08T16:45:00Z',
      isImportant: true,
      attachments: []
    },
    {
      id: 5,
      title: 'Pembukaan Pendaftaran Asisten Laboratorium',
      excerpt: 'Pembukaan pendaftaran untuk menjadi asisten laboratorium kimia dasar. Pendaftaran dibuka hingga 25 Januari 2024.',
      content: 'Pembukaan pendaftaran untuk menjadi asisten laboratorium kimia dasar. Syarat: mahasiswa semester 3 ke atas, IPK minimal 3.0, dan memiliki pengalaman praktikum yang baik. Pendaftaran dibuka hingga 25 Januari 2024. Kirim CV dan surat lamaran ke email labkimia@university.ac.id',
      publishedAt: '2024-01-05T11:20:00Z',
      isImportant: false,
      attachments: ['syarat-asisten-lab.pdf']
    }
  ]

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
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
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
                    
                    {announcement.attachments.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-neutral-700 mb-3">Lampiran:</h4>
                        <div className="flex flex-wrap gap-2">
                          {announcement.attachments.map((attachment, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {attachment}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-neutral-500 font-medium">
                        ID: #{announcement.id.toString().padStart(3, '0')}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
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
          </div>
        </section>
      </main>
    </div>
  )
}
