'use client'

import { BookOpen, Calendar, Users, Download, FileText, AlertCircle } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { useApp } from '../../contexts/AppContext'
import { api, endpoints, Module, Group } from '../../lib/api'
import { useState, useEffect } from 'react'

// Utility function to format file size
const formatFileSize = (bytes?: number): string => {
  if (!bytes) return 'N/A'
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  if (bytes === 0) return '0 Bytes'
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}

export default function PraktikumPage() {
  const { addNotification } = useApp()
  const [modules, setModules] = useState<Module[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)
  const [groupsLoading, setGroupsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [groupsError, setGroupsError] = useState<string | null>(null)

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await api.get<Module[]>(endpoints.modules.list)
        setModules(response.data || [])
        
      } catch (err) {
        console.error('Error fetching modules:', err)
        setError('Failed to load modules')
        addNotification({
          type: 'error',
          title: 'Error',
          message: 'Failed to load modules'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchModules()
    fetchGroups()
  }, [addNotification])

  const fetchGroups = async () => {
    try {
      setGroupsLoading(true)
      setGroupsError(null)
      
      const response = await api.get<Group[]>(endpoints.groups.list)
      setGroups(response.data || [])
      
    } catch (err) {
      console.error('Error fetching groups:', err)
      setGroupsError('Failed to load groups')
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to load groups'
      })
    } finally {
      setGroupsLoading(false)
    }
  }

  const handleDownload = async (module: Module) => {
    try {
      // Create a filename from the module title, ensuring it's safe for filesystem
      const safeFilename = `${module.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`
      await api.downloadFile(endpoints.modules.download(module.id), safeFilename)
      addNotification({
        type: 'success',
        title: 'Download Berhasil',
        message: `Modul "${module.title}" berhasil diunduh`
      })
    } catch (error: any) {
      console.error('Download failed:', error)
      addNotification({
        type: 'error',
        title: 'Download Gagal',
        message: error.message || 'Gagal mengunduh modul. Silakan coba lagi.'
      })
    }
  }

  const handleGroupDownload = async (group: Group) => {
    try {
      // Create a filename from group name, ensuring it's safe for filesystem
      const safeFilename = `${group.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`
      await api.downloadFile(endpoints.groups.download(group.id), safeFilename)
      addNotification({
        type: 'success',
        title: 'Download Berhasil',
        message: `File pembagian kelompok "${group.name}" berhasil diunduh`
      })
    } catch (error: any) {
      console.error('Group download failed:', error)
      addNotification({
        type: 'error',
        title: 'Download Gagal',
        message: error.message || 'Gagal mengunduh file pembagian kelompok. Silakan coba lagi.'
      })
    }
  }

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

            {!loading && !error && modules.length === 0 && (
              <div className="text-center py-20">
                <FileText className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <p className="text-xl text-neutral-600 mb-2">Belum ada modul tersedia</p>
                <p className="text-neutral-500">Modul praktikum akan muncul di sini setelah dipublikasikan.</p>
              </div>
            )}
            
            {!loading && !error && modules.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {modules.map((module) => (
                <Card key={module.id} className="p-8 group border-neutral-100">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary-600" />
                      </div>
                      <span className="text-sm text-neutral-500 font-medium">{formatFileSize(module.file_size)}</span>
                    </div>
                    <span className="badge-primary">{module.download_count || 0} downloads</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                    {module.title}
                  </h3>
                  
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {module.description}
                  </p>
                  
                  <Button
                    className="w-full shadow-md hover:shadow-lg"
                    onClick={() => handleDownload(module)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Modul
                  </Button>
                </Card>
              ))}
              </div>
            )}
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
            
            {groupsLoading && (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner />
              </div>
            )}

            {groupsError && !groupsLoading && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                <div className="flex items-center space-x-2 text-red-800">
                  <AlertCircle className="w-5 h-5" />
                  <p className="font-medium">{groupsError}</p>
                </div>
              </div>
            )}

            {!groupsLoading && !groupsError && groups.length === 0 && (
              <Card className="p-10 text-center border-neutral-100">
                <div className="bg-primary-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="text-2xl font-semibold text-neutral-900 mb-6">
                  Belum Ada Pembagian Kelompok
                </h3>
                <p className="text-neutral-600 leading-relaxed max-w-md mx-auto">
                  File pembagian kelompok akan muncul di sini setelah dipublikasikan.
                </p>
              </Card>
            )}
            
            {!groupsLoading && !groupsError && groups.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {groups.map((group) => (
                  <Card key={group.id} className="p-8 group border-neutral-100">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary-600" />
                        </div>
                        <span className="text-sm text-neutral-500 font-medium">{formatFileSize(group.file_size)}</span>
                      </div>
                      <span className="badge-primary">{group.download_count || 0} downloads</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                      {group.name}
                    </h3>
                    
                    <p className="text-neutral-600 mb-2 leading-relaxed">
                      {group.description}
                    </p>
                    
                    <p className="text-sm text-neutral-500 mb-6">
                      Angkatan: {group.cohort}
                    </p>
                    
                    <Button
                      className="w-full shadow-md hover:shadow-lg"
                      onClick={() => handleGroupDownload(group)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Pembagian Kelompok
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
