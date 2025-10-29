'use client'

import React, { useState, useEffect } from 'react'
import { AlertCircle, BookOpen } from 'lucide-react'
import Button from '../ui/Button'
import FileUpload from '../shared/FileUpload'
import { Module } from '../../lib/api'

interface ModuleFormProps {
  module?: Module | null
  onSubmit: (data: ModuleFormData) => void
  onCancel: () => void
  loading?: boolean
}

export interface ModuleFormData {
  title: string
  description: string
  visibility: 'public' | 'private'
  file?: File
}

export default function ModuleForm({
  module,
  onSubmit,
  onCancel,
  loading = false
}: ModuleFormProps) {
  const [formData, setFormData] = useState<ModuleFormData>({
    title: '',
    description: '',
    visibility: 'public',
    file: undefined
  })
  const [errors, setErrors] = useState<Partial<ModuleFormData>>({})
  const [touched, setTouched] = useState<Partial<ModuleFormData>>({})

  useEffect(() => {
    if (module) {
      setFormData({
        title: module.title,
        description: module.description,
        visibility: module.visibility,
        file: undefined
      })
    }
  }, [module])

  const validateForm = (): boolean => {
    const newErrors: Partial<ModuleFormData> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Judul modul wajib diisi'
    } else if (formData.title.length > 200) {
      newErrors.title = 'Judul modul maksimal 200 karakter'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi modul wajib diisi'
    } else if (formData.description.length > 1000) {
      newErrors.description = 'Deskripsi modul maksimal 1000 karakter'
    }

    if (!module && !formData.file) {
      (newErrors as any).file = 'File modul wajib diupload'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof ModuleFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setTouched(prev => ({ ...prev, [field]: true }))
    
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    onSubmit(formData)
  }

  const getFieldError = (field: keyof ModuleFormData) => {
    return touched[field] ? errors[field] : undefined
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* File Upload (only for create) */}
      {!module && (
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            File Modul <span className="text-red-500">*</span>
          </label>
          <FileUpload
            onFileSelect={(selectedFile) => handleInputChange('file', selectedFile)}
            acceptedTypes={['.pdf', '.doc', '.docx', '.ppt', '.pptx']}
            maxSize={10}
            disabled={loading}
          />
          {getFieldError('file') && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {getFieldError('file') as string}
            </p>
          )}
        </div>
      )}

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">
          Judul Modul <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
            getFieldError('title') ? 'border-red-500' : 'border-neutral-300'
          }`}
          placeholder="Masukkan judul modul"
          disabled={loading}
        />
        <div className="mt-1 text-xs text-neutral-500 text-right">
          {formData.title.length}/200 karakter
        </div>
        {getFieldError('title') && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {getFieldError('title') as string}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
          Deskripsi Modul <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical ${
            getFieldError('description') ? 'border-red-500' : 'border-neutral-300'
          }`}
          placeholder="Masukkan deskripsi modul"
          disabled={loading}
        />
        <div className="mt-1 text-xs text-neutral-500 text-right">
          {formData.description.length}/1000 karakter
        </div>
        {getFieldError('description') && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {getFieldError('description') as string}
          </p>
        )}
      </div>

      {/* Visibility */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          Visibilitas
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="visibility"
              value="public"
              checked={formData.visibility === 'public'}
              onChange={(e) => handleInputChange('visibility', e.target.value)}
              className="w-4 h-4 text-primary-600 border-neutral-300 focus:ring-primary-500"
              disabled={loading}
            />
            <span className="ml-2 text-sm text-neutral-700">Publik</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="visibility"
              value="private"
              checked={formData.visibility === 'private'}
              onChange={(e) => handleInputChange('visibility', e.target.value)}
              className="w-4 h-4 text-primary-600 border-neutral-300 focus:ring-primary-500"
              disabled={loading}
            />
            <span className="ml-2 text-sm text-neutral-700">Privat</span>
          </label>
        </div>
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
          {loading ? 'Menyimpan...' : (module ? 'Update' : 'Upload')}
        </Button>
      </div>
    </form>
  )
}