'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Edit, Trash2, Eye, AlertCircle } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import DataTable from '../../../components/shared/DataTable'
import Badge from '../../../components/ui/Badge'
import LoadingSpinner from '../../../components/ui/LoadingSpinner'
import Modal from '../../../components/ui/Modal'
import AnnouncementForm, { AnnouncementFormData } from '../../../components/forms/AnnouncementForm'
import { useApp } from '../../../contexts/AppContext'
import { api, endpoints, Announcement } from '../../../lib/api'

export default function AdminAnnouncements() {
  const router = useRouter()
  const { addNotification } = useApp()
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null)
  const [formLoading, setFormLoading] = useState(false)

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await api.get<Announcement[]>(endpoints.announcements.list)
        setAnnouncements(response.data || [])
        
      } catch (err: any) {
        console.error('Error fetching announcements:', err)
        
        // Handle authentication errors
        if (err.isAuthError) {
          addNotification({
            type: 'error',
            title: 'Session Expired',
            message: 'Please login again to continue'
          })
          router.push('/admin/login')
          return
        }
        
        setError('Failed to load announcements')
        addNotification({
          type: 'error',
          title: 'Error',
          message: err.message || 'Failed to load announcements'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [addNotification, router])

  const handleDelete = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this announcement?')) {
      return
    }

    try {
      await api.delete(endpoints.announcements.delete(id))
      setAnnouncements(prev => prev.filter(ann => ann.id !== id))
      addNotification({
        type: 'success',
        title: 'Berhasil',
        message: 'Announcement deleted successfully'
      })
    } catch (err: any) {
      console.error('Error deleting announcement:', err)
      
      // Handle authentication errors
      if (err.isAuthError) {
        addNotification({
          type: 'error',
          title: 'Session Expired',
          message: 'Token tidak valid. Silakan login kembali.'
        })
        router.push('/admin/login')
        return
      }
      
      addNotification({
        type: 'error',
        title: 'Error',
        message: err.message || 'Failed to delete announcement'
      })
    }
  }

  const handleCreate = () => {
    setEditingAnnouncement(null)
    setIsModalOpen(true)
  }

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement)
    setIsModalOpen(true)
  }

  const handleFormSubmit = async (data: AnnouncementFormData) => {
    setFormLoading(true)
    
    try {
      if (editingAnnouncement) {
        // Update existing announcement
        const response = await api.put(endpoints.announcements.update(editingAnnouncement.id), {
          title: data.title,
          content: data.content,
          is_important: data.is_important,
          attachments: data.attachments.map(file => file.name)
        })
        
        setAnnouncements(prev =>
          prev.map(ann =>
            ann.id === editingAnnouncement.id
              ? { ...ann, ...(response.data as any) }
              : ann
          )
        )
        
        addNotification({
          type: 'success',
          title: 'Berhasil',
          message: 'Pengumuman berhasil diperbarui'
        })
      } else {
        // Create new announcement
        const response = await api.post(endpoints.announcements.create, {
          title: data.title,
          content: data.content,
          is_important: data.is_important,
          attachments: data.attachments.map(file => file.name)
        })
        
        setAnnouncements(prev => [(response.data as any), ...prev])
        
        addNotification({
          type: 'success',
          title: 'Berhasil',
          message: 'Pengumuman berhasil dibuat'
        })
      }
      
      setIsModalOpen(false)
      setEditingAnnouncement(null)
    } catch (err: any) {
      console.error('Error saving announcement:', err)
      console.error('Error details:', {
        message: err.message,
        status: err.status,
        isAuthError: err.isAuthError,
        token: localStorage.getItem('auth_token') ? localStorage.getItem('auth_token')?.substring(0, 20) + '...' : 'none'
      })
      
      // Handle authentication errors
      if (err.isAuthError) {
        addNotification({
          type: 'error',
          title: 'Session Expired',
          message: err.message || 'Token tidak valid. Silakan login kembali.'
        })
        // Wait a bit before redirecting to show the notification
        setTimeout(() => {
          router.push('/admin/login')
        }, 2000)
        return
      }
      
      addNotification({
        type: 'error',
        title: 'Error',
        message: err.message || 'Gagal menyimpan pengumuman'
      })
    } finally {
      setFormLoading(false)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingAnnouncement(null)
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
      key: 'published_at' as const,
      label: 'Status',
      render: (value: string, item: Announcement) => (
        <div className="flex items-center space-x-2">
          <Badge variant="success">
            Dipublikasi
          </Badge>
          {(item as any).is_important && (
            <Badge variant="error">Penting</Badge>
          )}
        </div>
      )
    },
    {
      key: 'actions' as any,
      label: 'Aksi',
      render: (value: any, item: Announcement) => (
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(item)}
          >
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
          <Button onClick={handleCreate}>
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

        {/* Announcement Form Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          title={editingAnnouncement ? 'Edit Pengumuman' : 'Tambah Pengumuman'}
          size="lg"
        >
          <AnnouncementForm
            announcement={editingAnnouncement}
            onSubmit={handleFormSubmit}
            onCancel={handleModalClose}
            loading={formLoading}
          />
        </Modal>
    </div>
  )
}
