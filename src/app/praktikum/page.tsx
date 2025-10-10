import { Metadata } from 'next'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { BookOpen, Calendar, Users, Download, FileText } from 'lucide-react'

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
    <div className="min-h-screen bg-neutral-50">
      
      <main>
        {/* Hero Section */}
        <section className="hero-gradient section-padding">
          <div className="container-custom">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
                Pusat Informasi Praktikum
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed">
                Akses modul praktikum, jadwal, dan pembagian kelompok untuk praktikum kimia dasar.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">5 Modul</h3>
                <p className="text-neutral-600">Praktikum tersedia</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">8 Sesi</h3>
                <p className="text-neutral-600">Per minggu</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">16 Kelompok</h3>
                <p className="text-neutral-600">Mahasiswa aktif</p>
              </div>
            </div>
          </div>
        </section>

        {/* Modules Section */}
        <section className="section-padding bg-neutral-50" id="modules">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Modul Praktikum
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Download modul praktikum untuk setiap percobaan. Pastikan Anda memiliki 
                modul terbaru sebelum praktikum dimulai.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => (
                <div key={module.id} className="card p-6 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-primary-600" />
                      <span className="text-sm text-neutral-500">{module.fileSize}</span>
                    </div>
                    <span className="badge-primary">{module.downloadCount} downloads</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                    {module.title}
                  </h3>
                  
                  <p className="text-neutral-600 mb-4 text-sm leading-relaxed">
                    {module.description}
                  </p>
                  
                  <button className="btn-primary w-full flex items-center justify-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Download Modul</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section className="section-padding bg-white" id="jadwal">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Jadwal Praktikum
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Jadwal praktikum untuk semester genap 2024. Pastikan Anda hadir tepat waktu.
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary-50">
                    <th className="border border-neutral-200 px-4 py-3 text-left font-semibold text-neutral-900">
                      Hari
                    </th>
                    <th className="border border-neutral-200 px-4 py-3 text-left font-semibold text-neutral-900">
                      Waktu
                    </th>
                    <th className="border border-neutral-200 px-4 py-3 text-left font-semibold text-neutral-900">
                      Kelas
                    </th>
                    <th className="border border-neutral-200 px-4 py-3 text-left font-semibold text-neutral-900">
                      Ruang
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((item, index) => (
                    <tr key={index} className="hover:bg-neutral-50">
                      <td className="border border-neutral-200 px-4 py-3 text-neutral-700">
                        {item.day}
                      </td>
                      <td className="border border-neutral-200 px-4 py-3 text-neutral-700">
                        {item.time}
                      </td>
                      <td className="border border-neutral-200 px-4 py-3 text-neutral-700">
                        {item.class}
                      </td>
                      <td className="border border-neutral-200 px-4 py-3 text-neutral-700">
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
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Pembagian Kelompok
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Lihat pembagian kelompok praktikum. Pastikan Anda mengetahui kelompok Anda.
              </p>
            </div>
            
            <div className="card p-8 text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                File Pembagian Kelompok
              </h3>
              <p className="text-neutral-600 mb-6">
                Download file pembagian kelompok untuk melihat kelompok praktikum Anda.
              </p>
              <button className="btn-primary flex items-center space-x-2 mx-auto">
                <Download className="w-4 h-4" />
                <span>Download Pembagian Kelompok</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
