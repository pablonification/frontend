'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, AlertCircle } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import DataTable from '../../../components/shared/DataTable'
import Badge from '../../../components/ui/Badge'
import LoadingSpinner from '../../../components/ui/LoadingSpinner'
import { useApp } from '../../../contexts/AppContext'
import { api, endpoints, Announcement } from '../../../lib/api'

export default function AdminAnnouncements() {
  const { addNotification } = useApp()
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await api.get<Announcement[]>(endpoints.announcements.list)
        setAnnouncements(response.data || [])
        
      } catch (err) {
        console.error('Error fetching announcements:', err)
        setError('Failed to load announcements')
        addNotification({
          type: 'error',
          message: 'Failed to load announcements'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [addNotification])

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this announcement?')) {
      return
    }

    try {
      await api.delete(endpoints.announcements.delete(id))
      setAnnouncements(prev => prev.filter(ann => ann.id !== id))
      addNotification({
        type: 'success',
        message: 'Announcement deleted successfully'
      })
    } catch (err) {
      console.error('Error deleting announcement:', err)
      addNotification({
        type: 'error',
        message: 'Failed to delete announcement'
      })
    }
  }

  const columns = [
    {
      key: 'title' as const,
      label: 'Judul',
      render: (value: string, item: Announcement) => (
        <div>
          <p className="font-medium text-neutral-900">{value}</p>
          <p className="text-sm text-neutral-500">
            {new Date(item.published_at).toLocaleDateString('id-ID')}
          </p>
        </div>
      )
    },
    {
      key: 'is_important' as const,
      label: 'Status',
      render: (value: boolean, item: Announcement) => (
        <div className="flex items-center space-x-2">
          <Badge variant="success">
            Dipublikasi
          </Badge>
          {value && (
            <Badge variant="error">Penting</Badge>
          )}
        </div>
      )
    },
    {
      key: 'actions' as const,
      label: 'Aksi',
      render: (value: any, item: Announcement) => (
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-600 hover:text-red-700"
            onClick={() => handleDelete(item.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ]

  if (loading) {
    return <LoadingSpinner.Page message="Memuat pengumuman..." />
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Error Loading Announcements</h2>
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              Kelola Pengumuman
            </h1>
            <p className="text-neutral-600">
              Buat, edit, dan kelola pengumuman website
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Pengumuman
          </Button>
        </div>

        <Card className="p-6">
          <DataTable
            data={announcements}
            columns={columns}
            page={1}
            totalPages={1}
          />
        </Card>
    </div>
  )
}
