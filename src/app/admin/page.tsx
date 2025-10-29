'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Users, 
  FileText, 
  Image, 
  BookOpen, 
  Award,
  TrendingUp,
  Clock,
  AlertCircle
} from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { useApp } from '../../contexts/AppContext'
import { api, endpoints } from '../../lib/api'

export default function AdminDashboard() {
  const router = useRouter()
  const { addNotification } = useApp()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState({
    totalAnnouncements: 0,
    totalFiles: 0,
    totalSliders: 0,
    totalModules: 0,
    totalNilai: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch all data in parallel
        const [announcementsRes, filesRes, slidersRes, modulesRes, nilaiRes] = await Promise.all([
          api.get(endpoints.announcements.list),
          api.get(endpoints.files.list),
          api.get(endpoints.sliders.list),
          api.get(endpoints.modules.list),
          api.get(endpoints.nilai.list)
        ])

        setStats({
          totalAnnouncements: announcementsRes.data?.length || 0,
          totalFiles: filesRes.data?.length || 0,
          totalSliders: slidersRes.data?.length || 0,
          totalModules: modulesRes.data?.length || 0,
          totalNilai: nilaiRes.data?.length || 0
        })

      } catch (err) {
        console.error('Error fetching dashboard stats:', err)
        const errorMessage = err instanceof Error ? err.message : 'Failed to load dashboard statistics'
        setError(errorMessage)
        addNotification({
          type: 'error',
          message: errorMessage
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [addNotification])

  const quickActions = [
    {
      title: 'Kelola Pengumuman',
      description: 'Buat dan edit pengumuman',
      icon: FileText,
      href: '/admin/announcements',
      color: 'bg-primary-500'
    },
    {
      title: 'Kelola Slider',
      description: 'Atur slider homepage',
      icon: Image,
      href: '/admin/sliders',
      color: 'bg-emerald-500'
    },
    {
      title: 'Kelola File',
      description: 'Upload dan kelola file',
      icon: FileText,
      href: '/admin/files',
      color: 'bg-amber-500'
    },
    {
      title: 'Kelola Modul',
      description: 'Kelola modul praktikum',
      icon: BookOpen,
      href: '/admin/modules',
      color: 'bg-violet-500'
    },
    {
      title: 'Kelola Nilai',
      description: 'Upload file nilai',
      icon: Award,
      href: '/admin/nilai',
      color: 'bg-rose-500'
    }
  ]

  if (loading) {
    return <LoadingSpinner.Page message="Memuat dashboard admin..." />
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-neutral-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Dashboard Admin
          </h1>
          <p className="text-xl text-neutral-600">
            Kelola konten dan file website Lab Kimia Dasar
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <Card className="p-8 border-neutral-100">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center">
                <FileText className="w-8 h-8 text-primary-600" />
              </div>
              <div className="ml-6">
                <p className="text-3xl font-bold text-neutral-900">
                  {stats.totalAnnouncements}
                </p>
                <p className="text-sm text-neutral-600 font-medium">Pengumuman</p>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-neutral-100">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center">
                <Image className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="ml-6">
                <p className="text-3xl font-bold text-neutral-900">
                  {stats.totalSliders}
                </p>
                <p className="text-sm text-neutral-600 font-medium">Slider</p>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-neutral-100">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center">
                <FileText className="w-8 h-8 text-amber-600" />
              </div>
              <div className="ml-6">
                <p className="text-3xl font-bold text-neutral-900">
                  {stats.totalFiles}
                </p>
                <p className="text-sm text-neutral-600 font-medium">File</p>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-neutral-100">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-violet-600" />
              </div>
              <div className="ml-6">
                <p className="text-3xl font-bold text-neutral-900">
                  {stats.totalModules}
                </p>
                <p className="text-sm text-neutral-600 font-medium">Modul</p>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-neutral-100">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center">
                <Award className="w-8 h-8 text-rose-600" />
              </div>
              <div className="ml-6">
                <p className="text-3xl font-bold text-neutral-900">
                  {stats.totalNilai}
                </p>
                <p className="text-sm text-neutral-600 font-medium">File Nilai</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
            Aksi Cepat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickActions.map((action, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 group cursor-pointer border-neutral-100">
                <div className="flex items-start space-x-6">
                  <div className={`w-16 h-16 ${action.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg`}>
                    <action.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                      {action.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed mb-6">
                      {action.description}
                    </p>
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={() => router.push(action.href)}
                      className="shadow-md hover:shadow-lg"
                    >
                      Kelola
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="p-8 border-neutral-100">
          <h3 className="text-2xl font-semibold text-neutral-900 mb-8">
            Aktivitas Terbaru
          </h3>
          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-neutral-50 transition-colors duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex-1">
                <p className="text-base text-neutral-900 font-medium">
                  Pengumuman baru "Jadwal Praktikum Semester Ganjil" telah dibuat
                </p>
                <p className="text-sm text-neutral-500">2 jam yang lalu</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-neutral-50 transition-colors duration-300">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                <Image className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="text-base text-neutral-900 font-medium">
                  Slider "Praktikum Online" telah diperbarui
                </p>
                <p className="text-sm text-neutral-500">4 jam yang lalu</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-neutral-50 transition-colors duration-300">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="text-base text-neutral-900 font-medium">
                  File "Modul Praktikum 1.pdf" telah diupload
                </p>
                <p className="text-sm text-neutral-500">1 hari yang lalu</p>
              </div>
            </div>
          </div>
        </Card>
    </div>
  )
}
