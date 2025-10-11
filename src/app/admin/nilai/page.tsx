'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Download, Award, Lock, AlertCircle } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import DataTable from '../../../components/shared/DataTable'
import Badge from '../../../components/ui/Badge'
import LoadingSpinner from '../../../components/ui/LoadingSpinner'
import { useApp } from '../../../contexts/AppContext'
import { api, endpoints, NilaiFile } from '../../../lib/api'

export default function AdminNilai() {
  const { addNotification } = useApp()
  const [nilaiFiles, setNilaiFiles] = useState<NilaiFile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
          message: 'Failed to load nilai files'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchNilaiFiles()
  }, [addNotification])

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this nilai file?')) {
      return
    }

    try {
      await api.delete(endpoints.nilai.delete(id))
      setNilaiFiles(prev => prev.filter(file => file.id !== id))
      addNotification({
        type: 'success',
        message: 'Nilai file deleted successfully'
      })
    } catch (err) {
      console.error('Error deleting nilai file:', err)
      addNotification({
        type: 'error',
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
          <Button>
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
    </div>
  )
}
