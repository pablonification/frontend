'use client'

import React, { useState } from 'react'
import { Plus, Edit, Trash2, Download, Award, Lock } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import DataTable from '../../../components/shared/DataTable'
import Badge from '../../../components/ui/Badge'

export default function AdminNilai() {
  const [nilaiFiles] = useState([
    {
      id: 1,
      class: 'Kimia Organik I - A',
      cohort: '2024/2025 Ganjil',
      file_path: '/files/nilai-kimia-organik-1-a.xlsx',
      has_password: true,
      download_count: 23,
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: 2,
      class: 'Kimia Fisik - B',
      cohort: '2024/2025 Ganjil',
      file_path: '/files/nilai-kimia-fisik-b.xlsx',
      has_password: true,
      download_count: 18,
      created_at: '2024-01-10T14:30:00Z'
    },
    {
      id: 3,
      class: 'Kimia Anorganik - C',
      cohort: '2024/2025 Ganjil',
      file_path: '/files/nilai-kimia-anorganik-c.xlsx',
      has_password: true,
      download_count: 25,
      created_at: '2024-01-05T09:15:00Z'
    }
  ])

  const columns = [
    {
      key: 'class' as const,
      label: 'Kelas',
      render: (value: string, item: any) => (
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
    </div>
  )
}
