'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, ArrowUp, ArrowDown, AlertCircle } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import DataTable from '../../../components/shared/DataTable'
import Badge from '../../../components/ui/Badge'
import LoadingSpinner from '../../../components/ui/LoadingSpinner'
import { useApp } from '../../../contexts/AppContext'
import { api, endpoints, Slider } from '../../../lib/api'

export default function AdminSliders() {
  const { addNotification } = useApp()
  const [sliders, setSliders] = useState<Slider[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await api.get<Slider[]>(endpoints.sliders.list)
        setSliders(response.data || [])
        
      } catch (err) {
        console.error('Error fetching sliders:', err)
        setError('Failed to load sliders')
        addNotification({
          type: 'error',
          message: 'Failed to load sliders'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSliders()
  }, [addNotification])

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this slider?')) {
      return
    }

    try {
      await api.delete(endpoints.sliders.delete(id))
      setSliders(prev => prev.filter(slider => slider.id !== id))
      addNotification({
        type: 'success',
        message: 'Slider deleted successfully'
      })
    } catch (err) {
      console.error('Error deleting slider:', err)
      addNotification({
        type: 'error',
        message: 'Failed to delete slider'
      })
    }
  }

  const columns = [
    {
      key: 'order_index' as const,
      label: 'Urutan',
      render: (value: number, item: Slider) => (
        <div className="flex items-center space-x-2">
          <span className="font-medium text-neutral-900">{value}</span>
          <div className="flex flex-col space-y-1">
            <button className="text-neutral-400 hover:text-neutral-600">
              <ArrowUp className="w-3 h-3" />
            </button>
            <button className="text-neutral-400 hover:text-neutral-600">
              <ArrowDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      )
    },
    {
      key: 'title' as const,
      label: 'Judul',
      render: (value: string, item: Slider) => (
        <div>
          <p className="font-medium text-neutral-900">{value}</p>
          <p className="text-sm text-neutral-500">{item.alt_text}</p>
        </div>
      )
    },
    {
      key: 'image_path' as const,
      label: 'Gambar',
      render: (value: string) => (
        <div className="w-16 h-10 bg-neutral-200 rounded overflow-hidden">
          <img 
            src={value} 
            alt="Slider preview" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      )
    },
    {
      key: 'created_at' as const,
      label: 'Status',
      render: (value: string) => (
        <Badge variant="success">
          Aktif
        </Badge>
      )
    },
    {
      key: 'actions' as const,
      label: 'Aksi',
      render: (value: any, item: Slider) => (
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
    return <LoadingSpinner.Page message="Memuat slider..." />
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Error Loading Sliders</h2>
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
              Kelola Slider
            </h1>
            <p className="text-neutral-600">
              Atur slider yang ditampilkan di homepage
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Slider
          </Button>
        </div>

        <Card className="p-6">
          <DataTable
            data={sliders}
            columns={columns}
            page={1}
            totalPages={1}
          />
        </Card>
    </div>
  )
}
