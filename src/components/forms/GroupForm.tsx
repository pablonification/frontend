'use client'

import React, { useState, useEffect } from 'react'
import { AlertCircle, Users } from 'lucide-react'
import Button from '../ui/Button'
import FileUpload from '../shared/FileUpload'
import { Group } from '../../lib/api'

interface GroupFormProps {
  group?: Group | null
  onSubmit: (data: GroupFormData) => void
  onCancel: () => void
  loading?: boolean
}

export interface GroupFormData {
  name: string
  description: string
  cohort: string
  visibility: 'public' | 'private'
  file?: File
}

export default function GroupForm({
  group,
  onSubmit,
  onCancel,
  loading = false
}: GroupFormProps) {
  const [formData, setFormData] = useState<GroupFormData>({
    name: '',
    description: '',
    cohort: '',
    visibility: 'public',
    file: undefined
  })
  const [errors, setErrors] = useState<Partial<GroupFormData>>({})
  const [touched, setTouched] = useState<Partial<GroupFormData>>({})

  useEffect(() => {
    if (group) {
      setFormData({
        name: group.name,
        description: group.description,
        cohort: group.cohort,
        visibility: group.visibility,
        file: undefined
      })
    }
  }, [group])

  const validateForm = (): boolean => {
    const newErrors: Partial<GroupFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Nama kelompok wajib diisi'
    } else if (formData.name.length > 100) {
      newErrors.name = 'Nama kelompok maksimal 100 karakter'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi kelompok wajib diisi'
    } else if (formData.description.length > 500) {
      newErrors.description = 'Deskripsi kelompok maksimal 500 karakter'
    }

    if (!formData.cohort.trim()) {
      newErrors.cohort = 'Angkatan wajib diisi'
    } else if (formData.cohort.length > 50) {
      newErrors.cohort = 'Angkatan maksimal 50 karakter'
    }

    if (!group && !formData.file) {
      (newErrors as any).file = 'File pembagian kelompok wajib diupload'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof GroupFormData, value: any) => {
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

  const getFieldError = (field: keyof GroupFormData) => {
    return touched[field] ? errors[field] : undefined
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* File Upload (only for create) */}
      {!group && (
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            File Pembagian Kelompok <span className="text-red-500">*</span>
          </label>
          <FileUpload
            onFileSelect={(selectedFile) => handleInputChange('file', selectedFile)}
            acceptedTypes={['.pdf', '.doc', '.docx', '.xlsx', '.xls']}
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

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
          Nama Kelompok <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
            getFieldError('name') ? 'border-red-500' : 'border-neutral-300'
          }`}
          placeholder="Masukkan nama kelompok"
          disabled={loading}
        />
        <div className="mt-1 text-xs text-neutral-500 text-right">
          {formData.name.length}/100 karakter
        </div>
        {getFieldError('name') && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {getFieldError('name') as string}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
          Deskripsi Kelompok <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={3}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical ${
            getFieldError('description') ? 'border-red-500' : 'border-neutral-300'
          }`}
          placeholder="Masukkan deskripsi kelompok"
          disabled={loading}
        />
        <div className="mt-1 text-xs text-neutral-500 text-right">
          {formData.description.length}/500 karakter
        </div>
        {getFieldError('description') && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {getFieldError('description') as string}
          </p>
        )}
      </div>

      {/* Cohort */}
      <div>
        <label htmlFor="cohort" className="block text-sm font-medium text-neutral-700 mb-1">
          Angkatan <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="cohort"
          value={formData.cohort}
          onChange={(e) => handleInputChange('cohort', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
            getFieldError('cohort') ? 'border-red-500' : 'border-neutral-300'
          }`}
          placeholder="Contoh: 2023/2024"
          disabled={loading}
        />
        <div className="mt-1 text-xs text-neutral-500 text-right">
          {formData.cohort.length}/50 karakter
        </div>
        {getFieldError('cohort') && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {getFieldError('cohort') as string}
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
          {loading ? 'Menyimpan...' : (group ? 'Update' : 'Upload')}
        </Button>
      </div>
    </form>
  )
}