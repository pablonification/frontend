'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Download, BookOpen, AlertCircle } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import DataTable from '../../../components/shared/DataTable'
import Badge from '../../../components/ui/Badge'
import LoadingSpinner from '../../../components/ui/LoadingSpinner'
import { useApp } from '../../../contexts/AppContext'
import { api, endpoints, Module } from '../../../lib/api'

export default function AdminModules() {
  const { addNotification } = useApp()
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
          message: 'Failed to load modules'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchModules()
  }, [addNotification])

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this module?')) {
      return
    }

    try {
      await api.delete(endpoints.modules.delete(id))
      setModules(prev => prev.filter(module => module.id !== id))
      addNotification({
        type: 'success',
        message: 'Module deleted successfully'
      })
    } catch (err) {
      console.error('Error deleting module:', err)
      addNotification({
        type: 'error',
        message: 'Failed to delete module'
      })
    }
  }

  const columns = [
    {
      key: 'title' as const,
      label: 'Modul',
      render: (value: string, item: Module) => (
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <p className="font-medium text-neutral-900">{value}</p>
            <p className="text-sm text-neutral-500 mt-1">{item.description}</p>
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
      render: (value: any, item: Module) => (
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
    return <LoadingSpinner.Page message="Memuat modul..." />
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Error Loading Modules</h2>
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
              Kelola Modul Praktikum
            </h1>
            <p className="text-neutral-600">
              Upload dan kelola modul praktikum untuk mahasiswa
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Modul
          </Button>
        </div>

        <Card className="p-6">
          <DataTable
            data={modules}
            columns={columns}
            page={1}
            totalPages={1}
          />
        </Card>
    </div>
  )
}
