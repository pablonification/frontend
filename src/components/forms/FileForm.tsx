'use client'

import React, { useState, useEffect } from 'react'
import { AlertCircle, Lock, Unlock, Eye, EyeOff } from 'lucide-react'
import Button from '../ui/Button'
import FileUpload from '../shared/FileUpload'
import { File as FileType } from '../../lib/api'

interface FileFormProps {
  file?: FileType | null
  preselectedFile?: File | null
  onSubmit: (data: FileFormData) => void
  onCancel: () => void
  loading?: boolean
}

export interface FileFormData {
  name: string
  description: string
  visibility: 'public' | 'private'
  has_password: boolean
  password: string
  file?: File
}

export default function FileForm({
  file,
  preselectedFile,
  onSubmit,
  onCancel,
  loading = false
}: FileFormProps) {
  const [formData, setFormData] = useState<FileFormData>({
    name: '',
    description: '',
    visibility: 'public',
    has_password: false,
    password: '',
    file: undefined
  })
  const [errors, setErrors] = useState<Partial<FileFormData>>({})
  const [touched, setTouched] = useState<Partial<FileFormData>>({})
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (file) {
      setFormData({
        name: file.name,
        description: file.description || '',
        visibility: file.visibility,
        has_password: file.has_password,
        password: '',
        file: undefined
      })
    } else if (preselectedFile) {
      // Pre-fill form with selected file data
      setFormData(prev => ({
        ...prev,
        file: preselectedFile,
        name: prev.name || preselectedFile.name.replace(/\.[^/.]+$/, '') // Remove extension
      }))
    }
  }, [file, preselectedFile])

  const validateForm = (): boolean => {
    const newErrors: Partial<FileFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Nama file wajib diisi'
    } else if (formData.name.length > 100) {
      newErrors.name = 'Nama file maksimal 100 karakter'
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Deskripsi maksimal 500 karakter'
    }

    if (!file && !formData.file) {
      (newErrors as any).file = 'File wajib diupload'
    }

    if (formData.has_password && !formData.password.trim()) {
      newErrors.password = 'Password wajib diisi jika proteksi password diaktifkan'
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FileFormData, value: any) => {
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

  const getFieldError = (field: keyof FileFormData) => {
    return touched[field] ? errors[field] : undefined
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* File Upload (only for create) */}
      {!file && (
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            File <span className="text-red-500">*</span>
          </label>
          <FileUpload
            onFileSelect={(selectedFile) => handleInputChange('file', selectedFile)}
            acceptedTypes={['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.jpg', '.jpeg', '.png', '.gif']}
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
          Nama File <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
            getFieldError('name') ? 'border-red-500' : 'border-neutral-300'
          }`}
          placeholder="Masukkan nama file"
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
          Deskripsi
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={3}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical ${
            getFieldError('description') ? 'border-red-500' : 'border-neutral-300'
          }`}
          placeholder="Masukkan deskripsi file"
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

      {/* Password Protection */}
      <div>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="has_password"
            checked={formData.has_password}
            onChange={(e) => handleInputChange('has_password', e.target.checked)}
            className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
            disabled={loading}
          />
          <label htmlFor="has_password" className="ml-2 text-sm text-neutral-700 flex items-center">
            {formData.has_password ? (
              <Lock className="w-4 h-4 ml-1 text-amber-500" />
            ) : (
              <Unlock className="w-4 h-4 ml-1 text-neutral-400" />
            )}
            Proteksi dengan password
          </label>
        </div>

        {formData.has_password && (
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  getFieldError('password') ? 'border-red-500' : 'border-neutral-300'
                }`}
                placeholder="Masukkan password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {getFieldError('password') && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {getFieldError('password') as string}
              </p>
            )}
          </div>
        )}
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
          {loading ? 'Menyimpan...' : (file ? 'Update' : 'Upload')}
        </Button>
      </div>
    </form>
  )
}