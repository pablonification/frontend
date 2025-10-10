'use client'

import React, { useState } from 'react'
import { Plus, Edit, Trash2, Eye, ArrowUp, ArrowDown } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import DataTable from '../../../components/shared/DataTable'
import Badge from '../../../components/ui/Badge'

export default function AdminSliders() {
  const [sliders] = useState([
    {
      id: 1,
      title: 'Selamat Datang di Lab Kimia Dasar',
      image_path: '/images/hero-1.jpg',
      alt_text: 'Laboratorium Kimia Dasar',
      order_index: 1,
      is_active: true
    },
    {
      id: 2,
      title: 'Praktikum Kimia Dasar',
      image_path: '/images/hero-2.jpg',
      alt_text: 'Praktikum Kimia',
      order_index: 2,
      is_active: true
    },
    {
      id: 3,
      title: 'Pengumuman Terbaru',
      image_path: '/images/hero-3.jpg',
      alt_text: 'Pengumuman Lab',
      order_index: 3,
      is_active: false
    }
  ])

  const columns = [
    {
      key: 'order_index' as const,
      label: 'Urutan',
      render: (value: number, item: any) => (
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
      render: (value: string, item: any) => (
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
      key: 'is_active' as const,
      label: 'Status',
      render: (value: boolean) => (
        <Badge variant={value ? 'success' : 'secondary'}>
          {value ? 'Aktif' : 'Nonaktif'}
        </Badge>
      )
    },
    {
      key: 'actions' as const,
      label: 'Aksi',
      render: (value: any, item: any) => (
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container-custom py-8">
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
    </div>
  )
}
