'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Download, Users, AlertCircle } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import DataTable from '../../../components/shared/DataTable'
import Badge from '../../../components/ui/Badge'
import LoadingSpinner from '../../../components/ui/LoadingSpinner'
import Modal from '../../../components/ui/Modal'
import GroupForm, { GroupFormData } from '../../../components/forms/GroupForm'
import { useApp } from '../../../contexts/AppContext'
import { api, endpoints, Group } from '../../../lib/api'

export default function AdminGroups() {
  const { addNotification } = useApp()
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingGroup, setEditingGroup] = useState<Group | null>(null)
  const [formLoading, setFormLoading] = useState(false)

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await api.get<Group[]>(endpoints.groups.list)
        setGroups(response.data || [])
        
      } catch (err) {
        console.error('Error fetching groups:', err)
        setError('Failed to load groups')
        addNotification({
          type: 'error',
          title: 'Error',
          message: 'Failed to load groups'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchGroups()
  }, [addNotification])

  const handleCreate = () => {
    setEditingGroup(null)
    setIsModalOpen(true)
  }

  const handleEdit = (group: Group) => {
    setEditingGroup(group)
    setIsModalOpen(true)
  }

  const handleDownload = async (id: string | number) => {
    try {
      const response = await api.get(endpoints.groups.get(id))
      // Create download link
      const url = (response.data as any).storage_path
      const link = document.createElement('a')
      link.href = url
      link.download = ''
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      addNotification({
        type: 'success',
        title: 'Berhasil',
        message: 'File pembagian kelompok berhasil diunduh'
      })
    } catch (err) {
      console.error('Error downloading group:', err)
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Gagal mengunduh file pembagian kelompok'
      })
    }
  }

  const handleFormSubmit = async (data: GroupFormData) => {
    setFormLoading(true)
    
    try {
      if (editingGroup) {
        // Update existing group
        const formData = new FormData()
        if (data.file) {
          formData.append('file', data.file)
        }
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('cohort', data.cohort)
        formData.append('visibility', data.visibility)
        
        const response = await api.put(endpoints.groups.update(editingGroup.id), formData)
        
        setGroups(prev =>
          prev.map(group =>
            group.id === editingGroup.id
              ? { ...group, ...(response.data as any) }
              : group
          )
        )
        
        addNotification({
          type: 'success',
          title: 'Berhasil',
          message: 'Pembagian kelompok berhasil diperbarui'
        })
      } else {
        // Create new group
        const formData = new FormData()
        formData.append('file', data.file as File)
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('cohort', data.cohort)
        formData.append('visibility', data.visibility)
        
        const response = await api.uploadFile(endpoints.groups.create, data.file as any, {
          name: data.name,
          description: data.description,
          cohort: data.cohort,
          visibility: data.visibility
        })
        
        setGroups(prev => [(response.data as any), ...prev])
        
        addNotification({
          type: 'success',
          title: 'Berhasil',
          message: 'Pembagian kelompok berhasil dibuat'
        })
      }
      
      setIsModalOpen(false)
      setEditingGroup(null)
    } catch (err) {
      console.error('Error saving group:', err)
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Gagal menyimpan pembagian kelompok'
      })
    } finally {
      setFormLoading(false)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingGroup(null)
  }

  const handleDelete = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this group file?')) {
      return
    }

    try {
      await api.delete(endpoints.groups.delete(id))
      setGroups(prev => prev.filter(group => group.id !== id))
      addNotification({
        type: 'success',
        title: 'Berhasil',
        message: 'Group file deleted successfully'
      })
    } catch (err) {
      console.error('Error deleting group:', err)
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to delete group file'
      })
    }
  }

  const columns = [
    {
      key: 'name' as const,
      label: 'Nama Kelompok',
      render: (value: string, item: Group) => (
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <p className="font-medium text-neutral-900">{value}</p>
            <p className="text-sm text-neutral-500 mt-1">{item.description}</p>
            <p className="text-xs text-neutral-400 mt-1">Angkatan: {item.cohort}</p>
          </div>
        </div>
      )
    },
    {
      key: 'visibility' as const,
      label: 'Visibilitas',
      render: (value: string) => (
        <Badge variant={value === 'public' ? 'success' : 'warning'}>
          {value === 'public' ? 'Publik' : 'Privat'}
        </Badge>
      )
    },
    {
      key: 'created_at' as const,
      label: 'Dibuat',
      render: (value: string) => (
        <span className="text-sm text-neutral-600">
          {new Date(value).toLocaleDateString('id-ID')}
        </span>
      )
    },
    {
      key: 'actions' as const,
      label: 'Aksi',
      render: (value: any, item: Group) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDownload(item.id)}
          >
            <Download className="w-4 h-4" />
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
    return <LoadingSpinner.Page message="Memuat pembagian kelompok..." />
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Error Loading Groups</h2>
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
              Kelola Pembagian Kelompok
            </h1>
            <p className="text-neutral-600">
              Upload dan kelola file pembagian kelompok untuk mahasiswa
            </p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Pembagian Kelompok
          </Button>
        </div>

        <Card className="p-6">
          <DataTable
            data={groups}
            columns={columns}
            page={1}
            totalPages={1}
          />
        </Card>

        {/* Group Form Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          title={editingGroup ? 'Edit Pembagian Kelompok' : 'Tambah Pembagian Kelompok'}
          size="lg"
        >
          <GroupForm
            group={editingGroup}
            onSubmit={handleFormSubmit}
            onCancel={handleModalClose}
            loading={formLoading}
          />
        </Modal>
    </div>
  )
}