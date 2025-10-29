import { Metadata } from 'next'
import { BookOpen, Calendar, Users, Download, FileText } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

export const metadata: Metadata = {
  title: 'Praktikum - Lab Kimia Dasar',
  description: 'Akses modul praktikum, jadwal, dan pembagian kelompok untuk praktikum kimia dasar.',
}

export default function PraktikumPage() {
  const modules = [
    {
      id: 1,
      title: 'Percobaan 1: Pengenalan Alat dan Bahan',
      description: 'Mengenal alat-alat laboratorium dan cara penggunaannya yang aman',
      fileSize: '2.5 MB',
      downloadCount: 150
    },
    {
      id: 2,
      title: 'Percobaan 2: Penentuan Massa Jenis',
      description: 'Menentukan massa jenis berbagai zat dengan metode yang tepat',
      fileSize: '3.1 MB',
      downloadCount: 142
    },
    {
      id: 3,
      title: 'Percobaan 3: Titrasi Asam Basa',
      description: 'Melakukan titrasi untuk menentukan konsentrasi larutan',
      fileSize: '2.8 MB',
      downloadCount: 138
    },
    {
      id: 4,
      title: 'Percobaan 4: Reaksi Kimia',
      description: 'Mengamati dan menganalisis berbagai jenis reaksi kimia',
      fileSize: '3.2 MB',
      downloadCount: 135
    },
    {
      id: 5,
      title: 'Percobaan 5: Elektrokimia',
      description: 'Memahami konsep elektrokimia dan aplikasinya',
      fileSize: '2.9 MB',
      downloadCount: 128
    }
  ]

  const schedule = [
    { day: 'Senin', time: '08:00 - 10:00', class: 'A1', room: 'Lab 1' },
    { day: 'Senin', time: '10:00 - 12:00', class: 'A2', room: 'Lab 1' },
    { day: 'Selasa', time: '08:00 - 10:00', class: 'B1', room: 'Lab 2' },
    { day: 'Selasa', time: '10:00 - 12:00', class: 'B2', room: 'Lab 2' },
    { day: 'Rabu', time: '08:00 - 10:00', class: 'C1', room: 'Lab 1' },
    { day: 'Rabu', time: '10:00 - 12:00', class: 'C2', room: 'Lab 1' },
    { day: 'Kamis', time: '08:00 - 10:00', class: 'D1', room: 'Lab 2' },
    { day: 'Kamis', time: '10:00 - 12:00', class: 'D2', room: 'Lab 2' }
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
                Pusat Informasi Praktikum
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight tracking-tight">
                Pusat Informasi{' '}
                <span className="gradient-text">Praktikum</span>
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed max-w-4xl mx-auto">
                Akses modul praktikum, jadwal, dan pembagian kelompok untuk praktikum kimia dasar.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="bg-primary-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="text-3xl font-bold text-neutral-900 mb-2">5 Modul</h3>
                <p className="text-neutral-600 font-medium">Praktikum tersedia</p>
              </div>
              <div className="text-center">
                <div className="bg-emerald-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-3xl font-bold text-neutral-900 mb-2">8 Sesi</h3>
                <p className="text-neutral-600 font-medium">Per minggu</p>
              </div>
              <div className="text-center">
                <div className="bg-amber-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-amber-600" />
                </div>
                <h3 className="text-3xl font-bold text-neutral-900 mb-2">16 Kelompok</h3>
                <p className="text-neutral-600 font-medium">Mahasiswa aktif</p>
              </div>
            </div>
          </div>
        </section>

        {/* Modules Section */}
        <section className="section-padding bg-neutral-50" id="modules">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                Modul Praktikum
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Download modul praktikum untuk setiap percobaan. Pastikan Anda memiliki
                modul terbaru sebelum praktikum dimulai.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {modules.map((module) => (
                <Card key={module.id} className="p-8 group cursor-pointer border-neutral-100">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary-600" />
                      </div>
                      <span className="text-sm text-neutral-500 font-medium">{module.fileSize}</span>
                    </div>
                    <span className="badge-primary">{module.downloadCount} downloads</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                    {module.title}
                  </h3>
                  
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {module.description}
                  </p>
                  
                  <Button className="w-full shadow-md hover:shadow-lg">
                    <Download className="w-4 h-4 mr-2" />
                    Download Modul
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section className="section-padding bg-white" id="jadwal">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                Jadwal Praktikum
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Jadwal praktikum untuk semester genap 2024. Pastikan Anda hadir tepat waktu.
              </p>
            </div>
            
            <div className="overflow-x-auto rounded-2xl border border-neutral-200 shadow-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary-50">
                    <th className="border border-neutral-200 px-6 py-4 text-left font-semibold text-neutral-900">
                      Hari
                    </th>
                    <th className="border border-neutral-200 px-6 py-4 text-left font-semibold text-neutral-900">
                      Waktu
                    </th>
                    <th className="border border-neutral-200 px-6 py-4 text-left font-semibold text-neutral-900">
                      Kelas
                    </th>
                    <th className="border border-neutral-200 px-6 py-4 text-left font-semibold text-neutral-900">
                      Ruang
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((item, index) => (
                    <tr key={index} className="hover:bg-neutral-50 transition-colors duration-200">
                      <td className="border border-neutral-200 px-6 py-4 text-neutral-700 font-medium">
                        {item.day}
                      </td>
                      <td className="border border-neutral-200 px-6 py-4 text-neutral-700">
                        {item.time}
                      </td>
                      <td className="border border-neutral-200 px-6 py-4 text-neutral-700">
                        {item.class}
                      </td>
                      <td className="border border-neutral-200 px-6 py-4 text-neutral-700">
                        {item.room}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Groups Section */}
        <section className="section-padding bg-neutral-50" id="kelompok">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                Pembagian Kelompok
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Lihat pembagian kelompok praktikum. Pastikan Anda mengetahui kelompok Anda.
              </p>
            </div>
            
            <Card className="p-10 text-center border-neutral-100">
              <div className="bg-primary-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-2xl font-semibold text-neutral-900 mb-6">
                File Pembagian Kelompok
              </h3>
              <p className="text-neutral-600 mb-8 leading-relaxed max-w-md mx-auto">
                Download file pembagian kelompok untuk melihat kelompok praktikum Anda.
              </p>
              <Button className="shadow-lg hover:shadow-xl">
                <Download className="w-4 h-4 mr-2" />
                Download Pembagian Kelompok
              </Button>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
