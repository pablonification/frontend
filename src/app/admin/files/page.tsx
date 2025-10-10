'use client'

import React, { useState } from 'react'
import { Plus, Edit, Trash2, Download, Lock, Unlock } from 'lucide-react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import DataTable from '../../../components/shared/DataTable'
import Badge from '../../../components/ui/Badge'
import FileUpload from '../../../components/shared/FileUpload'

export default function AdminFiles() {
  const [files] = useState([
    {
      id: 1,
      name: 'Modul Praktikum 1.pdf',
      file_size: '2.5 MB',
      file_type: 'PDF',
      has_password: true,
      download_count: 45,
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: 2,
      name: 'Jadwal Praktikum.xlsx',
      file_size: '1.2 MB',
      file_type: 'Excel',
      has_password: false,
      download_count: 23,
      created_at: '2024-01-10T14:30:00Z'
    },
    {
      id: 3,
      name: 'Panduan Praktikum.docx',
      file_size: '3.1 MB',
      file_type: 'Word',
      has_password: true,
      download_count: 67,
      created_at: '2024-01-05T09:15:00Z'
    }
  ])

  const columns = [
    {
      key: 'name' as const,
      label: 'Nama File',
      render: (value: string, item: any) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-neutral-100 rounded flex items-center justify-center">
            <span className="text-xs font-medium text-neutral-600">
              {item.file_type}
            </span>
          </div>
          <div>
            <p className="font-medium text-neutral-900">{value}</p>
            <p className="text-sm text-neutral-500">{item.file_size}</p>
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
    </div>
  )
}
