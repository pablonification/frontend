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
        setError('Failed to load dashboard statistics')
        addNotification({
          type: 'error',
          message: 'Failed to load dashboard statistics'
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
      color: 'bg-blue-500'
    },
    {
      title: 'Kelola Slider',
      description: 'Atur slider homepage',
      icon: Image,
      href: '/admin/sliders',
      color: 'bg-green-500'
    },
    {
      title: 'Kelola File',
      description: 'Upload dan kelola file',
      icon: FileText,
      href: '/admin/files',
      color: 'bg-orange-500'
    },
    {
      title: 'Kelola Modul',
      description: 'Kelola modul praktikum',
      icon: BookOpen,
      href: '/admin/modules',
      color: 'bg-purple-500'
    },
    {
      title: 'Kelola Nilai',
      description: 'Upload file nilai',
      icon: Award,
      href: '/admin/nilai',
      color: 'bg-red-500'
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Dashboard Admin
          </h1>
          <p className="text-neutral-600">
            Kelola konten dan file website Lab Kimia Dasar
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-neutral-900">
                  {stats.totalAnnouncements}
                </p>
                <p className="text-sm text-neutral-600">Pengumuman</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Image className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-neutral-900">
                  {stats.totalSliders}
                </p>
                <p className="text-sm text-neutral-600">Slider</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-neutral-900">
                  {stats.totalFiles}
                </p>
                <p className="text-sm text-neutral-600">File</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-neutral-900">
                  {stats.totalModules}
                </p>
                <p className="text-sm text-neutral-600">Modul</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-neutral-900">
                  {stats.totalNilai}
                </p>
                <p className="text-sm text-neutral-600">File Nilai</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            Aksi Cepat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-200 group cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      {action.title}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-4">
                      {action.description}
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => router.push(action.href)}
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
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
            Aktivitas Terbaru
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-neutral-900">
                  Pengumuman baru "Jadwal Praktikum Semester Ganjil" telah dibuat
                </p>
                <p className="text-xs text-neutral-500">2 jam yang lalu</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Image className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-neutral-900">
                  Slider "Praktikum Online" telah diperbarui
                </p>
                <p className="text-xs text-neutral-500">4 jam yang lalu</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-neutral-900">
                  File "Modul Praktikum 1.pdf" telah diupload
                </p>
                <p className="text-xs text-neutral-500">1 hari yang lalu</p>
              </div>
            </div>
          </div>
        </Card>
    </div>
  )
}
