'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Download, Award, Lock, AlertCircle, Eye } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import DataTable from '../../../components/shared/DataTable'
import Badge from '../../../components/ui/Badge'
import LoadingSpinner from '../../../components/ui/LoadingSpinner'
import Modal from '../../../components/ui/Modal'
import FilePreview from '../../../components/shared/FilePreview'
import NilaiForm, { NilaiFormData } from '../../../components/forms/NilaiForm'
import { useApp } from '../../../contexts/AppContext'
import { api, endpoints, NilaiFile } from '../../../lib/api'

export default function AdminNilai() {
  const { addNotification } = useApp()
  const [nilaiFiles, setNilaiFiles] = useState<NilaiFile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNilaiFile, setEditingNilaiFile] = useState<NilaiFile | null>(null)
  const [formLoading, setFormLoading] = useState(false)
  const [previewFile, setPreviewFile] = useState<NilaiFile | null>(null)

  useEffect(() => {
    const fetchNilaiFiles = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await api.get<NilaiFile[]>(endpoints.nilai.list)
        setNilaiFiles(response.data || [])
        
      } catch (err) {
        console.error('Error fetching nilai files:', err)
        setError('Failed to load nilai files')
        addNotification({
          type: 'error',
          title: 'Error',
          message: 'Failed to load nilai files'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchNilaiFiles()
  }, [addNotification])

  const handleCreate = () => {
    setEditingNilaiFile(null)
    setIsModalOpen(true)
  }

  const handleEdit = (nilaiFile: NilaiFile) => {
    setEditingNilaiFile(nilaiFile)
    setIsModalOpen(true)
  }

  const handlePreview = (nilaiFile: NilaiFile) => {
    setPreviewFile(nilaiFile)
  }

  const handleDownload = async (id: string | number) => {
    try {
      const response = await api.get(endpoints.nilai.download(id))
      // Create download link
      const url = (response.data as any).download_url || `/api/nilai/${id}/download`
      const link = document.createElement('a')
      link.href = url
      link.download = ''
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      addNotification({
        type: 'success',
        title: 'Berhasil',
        message: 'File nilai berhasil diunduh'
      })
    } catch (err) {
      console.error('Error downloading nilai file:', err)
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Gagal mengunduh file nilai'
      })
    }
  }

  const handleFormSubmit = async (data: NilaiFormData) => {
    setFormLoading(true)
    
    try {
      if (editingNilaiFile) {
        // Update existing nilai file
        const response = await api.put(endpoints.nilai.update(editingNilaiFile.id), {
          class: data.class,
          cohort: data.cohort,
          has_password: data.has_password,
          password: data.has_password ? data.password : null
        })
        
        setNilaiFiles(prev =>
          prev.map(file =>
            file.id === editingNilaiFile.id
              ? { ...file, ...(response.data as any) }
              : file
          )
        )
        
        addNotification({
          type: 'success',
          title: 'Berhasil',
          message: 'File nilai berhasil diperbarui'
        })
      } else {
        // Create new nilai file
        const formData = new FormData()
        formData.append('file', data.file as File)
        formData.append('class', data.class)
        formData.append('cohort', data.cohort)
        if (data.has_password) {
          formData.append('password', data.password)
        }
        
        const response = await api.uploadFile(endpoints.nilai.create, data.file as any, {
          class: data.class,
          cohort: data.cohort,
          has_password: data.has_password,
          password: data.has_password ? data.password : undefined
        })
        
        setNilaiFiles(prev => [(response.data as any), ...prev])
        
        addNotification({
          type: 'success',
          title: 'Berhasil',
          message: 'File nilai berhasil diupload'
        })
      }
      
      setIsModalOpen(false)
      setEditingNilaiFile(null)
    } catch (err) {
      console.error('Error saving nilai file:', err)
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Gagal menyimpan file nilai'
      })
    } finally {
      setFormLoading(false)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingNilaiFile(null)
  }

  const handleDelete = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this nilai file?')) {
      return
    }

    try {
      await api.delete(endpoints.nilai.delete(id))
      setNilaiFiles(prev => prev.filter(file => file.id !== id))
      addNotification({
        type: 'success',
        title: 'Berhasil',
        message: 'Nilai file deleted successfully'
      })
    } catch (err) {
      console.error('Error deleting nilai file:', err)
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to delete nilai file'
      })
    }
  }

  const columns = [
    {
      key: 'class' as const,
      label: 'Kelas',
      render: (value: string, item: NilaiFile) => (
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="font-medium text-neutral-900">{value}</p>
            <p className="text-sm text-neutral-500">{item.cohort}</p>
          </div>
        </div>
      )
    },
    {
      key: 'has_password' as const,
      label: 'Keamanan',
      render: (value: boolean) => (
        <div className="flex items-center space-x-2">
          {value ? (
            <Badge variant="warning" className="flex items-center space-x-1">
              <Lock className="w-3 h-3" />
              <span>Dilindungi</span>
            </Badge>
          ) : (
            <Badge variant="success">
              Publik
            </Badge>
          )}
        </div>
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
      render: (value: any, item: NilaiFile) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlePreview(item)}
          >
            <Eye className="w-4 h-4" />
          </Button>
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
    return <LoadingSpinner.Page message="Memuat file nilai..." />
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Error Loading Nilai Files</h2>
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
              Kelola File Nilai
            </h1>
            <p className="text-neutral-600">
              Upload dan kelola file nilai praktikum mahasiswa
            </p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Upload File Nilai
          </Button>
        </div>

        <Card className="p-6">
          <DataTable
            data={nilaiFiles}
            columns={columns}
            page={1}
            totalPages={1}
          />
        </Card>

        {/* Nilai Form Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          title={editingNilaiFile ? 'Edit File Nilai' : 'Upload File Nilai'}
          size="lg"
        >
          <NilaiForm
            nilaiFile={editingNilaiFile}
            onSubmit={handleFormSubmit}
            onCancel={handleModalClose}
            loading={formLoading}
          />
        </Modal>

        {/* File Preview Modal */}
        <FilePreview
          isOpen={!!previewFile}
          onClose={() => setPreviewFile(null)}
          file={previewFile as any}
          onDownload={handleDownload}
        />
    </div>
  )
}
