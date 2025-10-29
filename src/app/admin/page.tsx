'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  FileText, 
  Image, 
  BookOpen, 
  Award,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertCircle,
  CheckCircle,
  Download,
  Eye,
  HardDrive,
  Zap,
  ArrowUpRight
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

  // New state for enhanced features
  const [insights, setInsights] = useState({
    pendingApprovals: 0,
    weeklyDownloads: 0,
    activeUsers: 0,
    storageUsed: 0,
    popularContent: []
  })

  const [recentActivities, setRecentActivities] = useState([])

  useEffect(() => {
    const fetchDashboardData = async () => {
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

        // Mock insights - replace with real API calls
        setInsights({
          pendingApprovals: 3,
          weeklyDownloads: 1247,
          activeUsers: 342,
          storageUsed: 67.5,
          popularContent: [
            { name: 'Modul Praktikum 3', downloads: 156 },
            { name: 'Jadwal Semester Ganjil', views: 892 },
            { name: 'Panduan Lab Safety', downloads: 134 }
          ]
        })

        // Mock activities - replace with real API
        setRecentActivities([
          {
            id: 1,
            type: 'upload',
            title: 'File "Modul 5.pdf" telah diupload',
            user: 'Admin User',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            icon: FileText,
            color: 'primary'
          },
          {
            id: 2,
            type: 'update',
            title: 'Pengumuman "Jadwal Praktikum" diperbarui',
            user: 'Admin User',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
            icon: AlertCircle,
            color: 'amber'
          },
          {
            id: 3,
            type: 'delete',
            title: 'Slider lama telah dihapus',
            user: 'Admin User',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
            icon: Image,
            color: 'rose'
          }
        ])

      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        const errorMessage = err instanceof Error ? err.message : 'Failed to load dashboard'
        setError(errorMessage)
        addNotification({
          type: 'error',
          message: errorMessage
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [addNotification])

  const formatTimeAgo = (date: Date) => {
    const hours = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60))
    if (hours < 1) return 'Baru saja'
    if (hours < 24) return `${hours} jam yang lalu`
    const days = Math.floor(hours / 24)
    return `${days} hari yang lalu`
  }

  const getActivityColor = (type: string) => {
    const colors = {
      primary: 'bg-primary-100 text-primary-600',
      amber: 'bg-amber-100 text-amber-600',
      rose: 'bg-rose-100 text-rose-600',
      emerald: 'bg-emerald-100 text-emerald-600'
    }
    return colors[type] || colors.primary
  }

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
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
          Dashboard Admin
        </h1>
        <p className="text-xl text-neutral-600">
          Kelola konten dan file website Lab Kimia Dasar
        </p>
      </div>

      {/* Stats Overview - Enhanced with trend indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="p-6 border-neutral-100 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary-600" />
            </div>
            <span className="text-xs text-emerald-600 flex items-center font-semibold">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12%
            </span>
          </div>
          <p className="text-3xl font-bold text-neutral-900 mb-1">
            {stats.totalAnnouncements}
          </p>
          <p className="text-sm text-neutral-600 font-medium">Pengumuman</p>
        </Card>

        <Card className="p-6 border-neutral-100 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Image className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-xs text-emerald-600 flex items-center font-semibold">
              <TrendingUp className="w-3 h-3 mr-1" />
              +5%
            </span>
          </div>
          <p className="text-3xl font-bold text-neutral-900 mb-1">
            {stats.totalSliders}
          </p>
          <p className="text-sm text-neutral-600 font-medium">Slider</p>
        </Card>

        <Card className="p-6 border-neutral-100 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-amber-600" />
            </div>
            <span className="text-xs text-emerald-600 flex items-center font-semibold">
              <TrendingUp className="w-3 h-3 mr-1" />
              +23%
            </span>
          </div>
          <p className="text-3xl font-bold text-neutral-900 mb-1">
            {stats.totalFiles}
          </p>
          <p className="text-sm text-neutral-600 font-medium">File</p>
        </Card>

        <Card className="p-6 border-neutral-100 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-violet-600" />
            </div>
            <span className="text-xs text-emerald-600 flex items-center font-semibold">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8%
            </span>
          </div>
          <p className="text-3xl font-bold text-neutral-900 mb-1">
            {stats.totalModules}
          </p>
          <p className="text-sm text-neutral-600 font-medium">Modul</p>
        </Card>

        <Card className="p-6 border-neutral-100 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-rose-600" />
            </div>
            <span className="text-xs text-rose-600 flex items-center font-semibold">
              <TrendingDown className="w-3 h-3 mr-1" />
              -3%
            </span>
          </div>
          <p className="text-3xl font-bold text-neutral-900 mb-1">
            {stats.totalNilai}
          </p>
          <p className="text-sm text-neutral-600 font-medium">File Nilai</p>
        </Card>
      </div>

      {/* Quick Insights - NEW SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-l-4 border-l-emerald-500 bg-gradient-to-br from-emerald-50 to-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-neutral-700">Download Minggu Ini</h3>
            <Download className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-bold text-neutral-900 mb-1">
            {insights.weeklyDownloads.toLocaleString()}
          </p>
          <p className="text-xs text-emerald-600 font-semibold">↑ 18% dari minggu lalu</p>
        </Card>

        <Card className="p-6 border-l-4 border-l-rose-500 bg-gradient-to-br from-rose-50 to-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-neutral-700">Storage Usage</h3>
            <HardDrive className="w-5 h-5 text-rose-500" />
          </div>
          <p className="text-3xl font-bold text-neutral-900 mb-1">{insights.storageUsed}%</p>
          <div className="w-full bg-neutral-200 rounded-full h-2 mt-2">
            <div 
              className="bg-rose-500 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${insights.storageUsed}%` }}
            />
          </div>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Timeline - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card className="p-8 border-neutral-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-neutral-900">
                Aktivitas Terbaru
              </h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.push('/admin/activities')}
              >
                Lihat semua →
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div 
                  key={activity.id}
                  className="flex items-start space-x-4 p-4 rounded-xl hover:bg-neutral-50 transition-all duration-200 group"
                >
                  {/* Timeline dot and line */}
                  <div className="relative">
                    <div className={`w-10 h-10 ${getActivityColor(activity.color)} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <activity.icon className="w-5 h-5" />
                    </div>
                    {index !== recentActivities.length - 1 && (
                      <div className="absolute left-5 top-12 w-0.5 h-8 bg-neutral-200" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-base text-neutral-900 font-medium mb-1">
                      {activity.title}
                    </p>
                    <div className="flex items-center space-x-3 text-sm text-neutral-500">
                      <span className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        {formatTimeAgo(activity.timestamp)}
                      </span>
                      <span>•</span>
                      <span>{activity.user}</span>
                    </div>
                  </div>
                  
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Popular Content - Takes 1 column */}
        <div>
          <Card className="p-8 border-neutral-100">
            <h3 className="text-xl font-semibold text-neutral-900 mb-6">
              Konten Populer
            </h3>
            <div className="space-y-4">
              {insights.popularContent.map((content, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary-600">
                        {index + 1}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-neutral-900 truncate">
                        {content.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {content.downloads || content.views} {content.downloads ? 'downloads' : 'views'}
                      </p>
                    </div>
                  </div>
                  <Zap className="w-4 h-4 text-amber-500 flex-shrink-0" />
                </div>
              ))}
            </div>
          </Card>

          {/* System Health */}
          <Card className="p-8 border-neutral-100 mt-6">
            <h3 className="text-xl font-semibold text-neutral-900 mb-6">
              System Health
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">API Status</span>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-semibold text-emerald-600">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Database</span>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-semibold text-emerald-600">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Avg Response Time</span>
                <span className="text-sm font-semibold text-neutral-900">124ms</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
