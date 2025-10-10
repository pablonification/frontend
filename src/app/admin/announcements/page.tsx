'use client'

import React, { useState } from 'react'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import DataTable from '../../../components/shared/DataTable'
import Badge from '../../../components/ui/Badge'

export default function AdminAnnouncements() {
  const [announcements] = useState([
    {
      id: 1,
      title: 'Jadwal Praktikum Semester Ganjil 2024/2025',
      content: 'Jadwal praktikum untuk semester ganjil telah tersedia...',
      publishedAt: '2024-01-15T10:00:00Z',
      isImportant: true,
      status: 'published'
    },
    {
      id: 2,
      title: 'Pembaruan Modul Praktikum',
      content: 'Modul praktikum telah diperbarui dengan materi terbaru...',
      publishedAt: '2024-01-10T14:30:00Z',
      isImportant: false,
      status: 'published'
    },
    {
      id: 3,
      title: 'Panduan Praktikum Online',
      content: 'Panduan lengkap untuk mengikuti praktikum online...',
      publishedAt: '2024-01-05T09:15:00Z',
      isImportant: false,
      status: 'draft'
    }
  ])

  const columns = [
    {
      key: 'title' as const,
      label: 'Judul',
      render: (value: string, item: any) => (
        <div>
          <p className="font-medium text-neutral-900">{value}</p>
          <p className="text-sm text-neutral-500">
            {new Date(item.publishedAt).toLocaleDateString('id-ID')}
          </p>
        </div>
      )
    },
    {
      key: 'status' as const,
      label: 'Status',
      render: (value: string, item: any) => (
        <div className="flex items-center space-x-2">
          <Badge variant={value === 'published' ? 'success' : 'warning'}>
            {value === 'published' ? 'Dipublikasi' : 'Draft'}
          </Badge>
          {item.isImportant && (
            <Badge variant="error">Penting</Badge>
          )}
        </div>
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
    </div>
  )
}
