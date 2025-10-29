'use client'

import React, { useState, useEffect } from 'react'
import { AlertCircle, Award, Lock, Unlock, Eye, EyeOff } from 'lucide-react'
import Button from '../ui/Button'
import FileUpload from '../shared/FileUpload'
import { NilaiFile } from '../../lib/api'

interface NilaiFormProps {
  nilaiFile?: NilaiFile | null
  onSubmit: (data: NilaiFormData) => void
  onCancel: () => void
  loading?: boolean
}

export interface NilaiFormData {
  class: string
  cohort: string
  has_password: boolean
  password: string
  file?: File
}

export default function NilaiForm({
  nilaiFile,
  onSubmit,
  onCancel,
  loading = false
}: NilaiFormProps) {
  const [formData, setFormData] = useState<NilaiFormData>({
    class: '',
    cohort: '',
    has_password: false,
    password: '',
    file: undefined
  })
  const [errors, setErrors] = useState<Partial<NilaiFormData>>({})
  const [touched, setTouched] = useState<Partial<NilaiFormData>>({})
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (nilaiFile) {
      setFormData({
        class: nilaiFile.class,
        cohort: nilaiFile.cohort,
        has_password: nilaiFile.has_password,
        password: '',
        file: undefined
      })
    }
  }, [nilaiFile])

  const validateForm = (): boolean => {
    const newErrors: Partial<NilaiFormData> = {}

    if (!formData.class.trim()) {
      newErrors.class = 'Nama kelas wajib diisi'
    } else if (formData.class.length > 50) {
      newErrors.class = 'Nama kelas maksimal 50 karakter'
    }

    if (!formData.cohort.trim()) {
      newErrors.cohort = 'Angkatan/tahun wajib diisi'
    } else if (formData.cohort.length > 50) {
      newErrors.cohort = 'Angkatan/tahun maksimal 50 karakter'
    }

    if (!nilaiFile && !formData.file) {
      (newErrors as any).file = 'File nilai wajib diupload'
    }

    if (formData.has_password && !formData.password.trim()) {
      newErrors.password = 'Password wajib diisi jika proteksi password diaktifkan'
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof NilaiFormData, value: any) => {
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

  const getFieldError = (field: keyof NilaiFormData) => {
    return touched[field] ? errors[field] : undefined
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* File Upload (only for create) */}
      {!nilaiFile && (
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            File Nilai <span className="text-red-500">*</span>
          </label>
          <FileUpload
            onFileSelect={(selectedFile) => handleInputChange('file', selectedFile)}
            acceptedTypes={['.pdf', '.xls', '.xlsx', '.doc', '.docx']}
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

      {/* Class */}
      <div>
        <label htmlFor="class" className="block text-sm font-medium text-neutral-700 mb-1">
          Kelas <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="class"
          value={formData.class}
          onChange={(e) => handleInputChange('class', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
            getFieldError('class') ? 'border-red-500' : 'border-neutral-300'
          }`}
          placeholder="Contoh: Kelas A, Kelas B"
          disabled={loading}
        />
        <div className="mt-1 text-xs text-neutral-500 text-right">
          {formData.class.length}/50 karakter
        </div>
        {getFieldError('class') && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {getFieldError('class') as string}
          </p>
        )}
      </div>

      {/* Cohort */}
      <div>
        <label htmlFor="cohort" className="block text-sm font-medium text-neutral-700 mb-1">
          Angkatan/Tahun <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="cohort"
          value={formData.cohort}
          onChange={(e) => handleInputChange('cohort', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
            getFieldError('cohort') ? 'border-red-500' : 'border-neutral-300'
          }`}
          placeholder="Contoh: 2023/2024, Ganjil 2023"
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
                placeholder="Masukkan password untuk proteksi file"
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
          {loading ? 'Menyimpan...' : (nilaiFile ? 'Update' : 'Upload')}
        </Button>
      </div>
    </form>
  )
}