'use client'

import React, { useState, useEffect } from 'react'
import { AlertCircle, Upload, X, FileText } from 'lucide-react'
import Button from '../ui/Button'
import { Announcement } from '../../lib/api'

interface AnnouncementFormProps {
  announcement?: Announcement | null
  onSubmit: (data: AnnouncementFormData) => void
  onCancel: () => void
  loading?: boolean
}

export interface AnnouncementFormData {
  title: string
  content: string
  is_important: boolean
  attachments: File[]
}

export default function AnnouncementForm({
  announcement,
  onSubmit,
  onCancel,
  loading = false
}: AnnouncementFormProps) {
  const [formData, setFormData] = useState<AnnouncementFormData>({
    title: '',
    content: '',
    is_important: false,
    attachments: []
  })
  const [errors, setErrors] = useState<Partial<AnnouncementFormData>>({})
  const [touched, setTouched] = useState<Partial<AnnouncementFormData>>({})

  useEffect(() => {
    if (announcement) {
      setFormData({
        title: announcement.title,
        content: announcement.content,
        is_important: (announcement as any).is_important || false,
        attachments: []
      })
    }
  }, [announcement])

  const validateForm = (): boolean => {
    const newErrors: Partial<AnnouncementFormData> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Judul wajib diisi'
    } else if (formData.title.length > 200) {
      newErrors.title = 'Judul maksimal 200 karakter'
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Konten wajib diisi'
    } else if (formData.content.length > 5000) {
      newErrors.content = 'Konten maksimal 5000 karakter'
    }

    if (formData.attachments.length > 5) {
      (newErrors as any).attachments = 'Maksimal 5 lampiran'
    }

    const totalSize = formData.attachments.reduce((acc, file) => acc + file.size, 0)
    if (totalSize > 50 * 1024 * 1024) { // 50MB total
      (newErrors as any).attachments = 'Total ukuran lampiran maksimal 50MB'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof AnnouncementFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setTouched(prev => ({ ...prev, [field]: true }))
    
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleFileSelect = (files: File[]) => {
    const validFiles = files.filter(file => {
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'image/jpeg',
        'image/png',
        'image/gif'
      ]
      
      if (!validTypes.includes(file.type)) {
        alert(`Tipe file ${file.type} tidak didukung`)
        return false
      }
      
      if (file.size > 10 * 1024 * 1024) { // 10MB per file
        alert(`File ${file.name} terlalu besar. Maksimal 10MB`)
        return false
      }
      
      return true
    })

    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...validFiles]
    }))
  }

  const handleRemoveFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    onSubmit(formData)
  }

  const getFieldError = (field: keyof AnnouncementFormData) => {
    return touched[field] ? errors[field] : undefined
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">
          Judul Pengumuman <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
            getFieldError('title') ? 'border-red-500' : 'border-neutral-300'
          }`}
          placeholder="Masukkan judul pengumuman"
          disabled={loading}
        />
        {getFieldError('title') && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {getFieldError('title') as string}
          </p>
        )}
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-neutral-700 mb-1">
          Konten <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) => handleInputChange('content', e.target.value)}
          rows={6}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical ${
            getFieldError('content') ? 'border-red-500' : 'border-neutral-300'
          }`}
          placeholder="Masukkan konten pengumuman"
          disabled={loading}
        />
        <div className="mt-1 text-xs text-neutral-500 text-right">
          {formData.content.length}/5000 karakter
        </div>
        {getFieldError('content') && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {getFieldError('content') as string}
          </p>
        )}
      </div>

      {/* Important Flag */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_important"
          checked={formData.is_important}
          onChange={(e) => handleInputChange('is_important', e.target.checked)}
          className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
          disabled={loading}
        />
        <label htmlFor="is_important" className="ml-2 text-sm text-neutral-700">
          Tandai sebagai penting
        </label>
      </div>



      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-neutral-100">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Batal
        </Button>
        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Menyimpan...' : (announcement ? 'Update' : 'Simpan')}
        </Button>
      </div>
    </form>
  )
}