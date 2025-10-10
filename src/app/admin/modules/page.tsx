'use client'

import React, { useState } from 'react'
import { Plus, Edit, Trash2, Download, BookOpen } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import DataTable from '../../../components/shared/DataTable'
import Badge from '../../../components/ui/Badge'

export default function AdminModules() {
  const [modules] = useState([
    {
      id: 1,
      title: 'Modul Praktikum Kimia Organik I',
      description: 'Modul praktikum untuk mata kuliah Kimia Organik I',
      file_path: '/files/modul-kimia-organik-1.pdf',
      visibility: 'public',
      download_count: 156,
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: 2,
      title: 'Modul Praktikum Kimia Fisik',
      description: 'Modul praktikum untuk mata kuliah Kimia Fisik',
      file_path: '/files/modul-kimia-fisik.pdf',
      visibility: 'public',
      download_count: 89,
      created_at: '2024-01-10T14:30:00Z'
    },
    {
      id: 3,
      title: 'Modul Praktikum Kimia Anorganik',
      description: 'Modul praktikum untuk mata kuliah Kimia Anorganik',
      file_path: '/files/modul-kimia-anorganik.pdf',
      visibility: 'private',
      download_count: 45,
      created_at: '2024-01-05T09:15:00Z'
    }
  ])

  const columns = [
    {
      key: 'title' as const,
      label: 'Modul',
      render: (value: string, item: any) => (
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
      key: 'download_count' as const,
      label: 'Download',
      render: (value: number) => (
        <span className="text-sm text-neutral-600">{value} kali</span>
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
      render: (value: any, item: any) => (
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4" />
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
    </div>
  )
}
