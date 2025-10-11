'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Download, Lock, Unlock, AlertCircle } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import DataTable from '../../../components/shared/DataTable'
import Badge from '../../../components/ui/Badge'
import FileUpload from '../../../components/shared/FileUpload'
import LoadingSpinner from '../../../components/ui/LoadingSpinner'
import { useApp } from '../../../contexts/AppContext'
import { api, endpoints, File } from '../../../lib/api'

export default function AdminFiles() {
  const { addNotification } = useApp()
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await api.get<File[]>(endpoints.files.list)
        setFiles(response.data || [])
        
      } catch (err) {
        console.error('Error fetching files:', err)
        setError('Failed to load files')
        addNotification({
          type: 'error',
          message: 'Failed to load files'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchFiles()
  }, [addNotification])

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this file?')) {
      return
    }

    try {
      await api.delete(endpoints.files.delete(id))
      setFiles(prev => prev.filter(file => file.id !== id))
      addNotification({
        type: 'success',
        message: 'File deleted successfully'
      })
    } catch (err) {
      console.error('Error deleting file:', err)
      addNotification({
        type: 'error',
        message: 'Failed to delete file'
      })
    }
  }

  const getFileExtension = (filename: string) => {
    return filename.split('.').pop()?.toUpperCase() || 'FILE'
  }

  const columns = [
    {
      key: 'name' as const,
      label: 'Nama File',
      render: (value: string, item: File) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-neutral-100 rounded flex items-center justify-center">
            <span className="text-xs font-medium text-neutral-600">
              {getFileExtension(value)}
            </span>
          </div>
          <div>
            <p className="font-medium text-neutral-900">{value}</p>
            <p className="text-sm text-neutral-500">{item.description || 'No description'}</p>
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
            <Badge variant="success" className="flex items-center space-x-1">
              <Unlock className="w-3 h-3" />
              <span>Publik</span>
            </Badge>
          )}
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
      render: (value: any, item: File) => (
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4" />
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
    return <LoadingSpinner.Page message="Memuat file..." />
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Error Loading Files</h2>
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
              Kelola File
            </h1>
            <p className="text-neutral-600">
              Upload dan kelola file yang dapat diakses pengguna
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Upload File
          </Button>
        </div>

        {/* Upload Area */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
            Upload File Baru
          </h3>
          <FileUpload
            onFileSelect={(file) => console.log('File selected:', file)}
            acceptedTypes={['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx']}
            maxSize={10}
          />
        </Card>

        <Card className="p-6">
          <DataTable
            data={files}
            columns={columns}
            page={1}
            totalPages={1}
          />
        </Card>
    </div>
  )
}
