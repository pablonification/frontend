'use client'

import React, { useState, useRef } from 'react'
import { Upload, X, File, AlertCircle } from 'lucide-react'
import Button from '../../components/ui/Button'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  onFileRemove?: () => void
  acceptedTypes?: string[]
  maxSize?: number // in MB
  disabled?: boolean
  className?: string
}

export default function FileUpload({
  onFileSelect,
  onFileRemove,
  acceptedTypes = ['*'],
  maxSize = 10,
  disabled = false,
  className = ''
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `File terlalu besar. Maksimal ${maxSize}MB`
    }

    // Check file type
    if (acceptedTypes[0] !== '*') {
      const fileExtension = file.name.split('.').pop()?.toLowerCase()
      const isValidType = acceptedTypes.some(type => {
        const normalizedType = type.toLowerCase()
        return normalizedType === `.${fileExtension}` ||
               normalizedType === fileExtension ||
               normalizedType === `*.${fileExtension}`
      })
      
      if (!isValidType) {
        return `Tipe file tidak didukung. Gunakan: ${acceptedTypes.join(', ')}`
      }
    }

    return null
  }

  const handleFile = (file: File) => {
    setError(null)
    
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setSelectedFile(file)
    onFileSelect(file)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (disabled) return

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (disabled) return

    const files = e.target.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const handleRemove = () => {
    setSelectedFile(null)
    setError(null)
    onFileRemove?.()
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const openFileDialog = () => {
    if (disabled) return
    fileInputRef.current?.click()
  }

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-neutral-300 hover:border-neutral-400'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          accept={acceptedTypes.join(',')}
          disabled={disabled}
        />

        {selectedFile ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <File className="w-8 h-8 text-primary-500" />
              <div className="text-left">
                <p className="text-sm font-medium text-neutral-900">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-neutral-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                handleRemove()
              }}
            >
              <X className="w-4 h-4 mr-1" />
              Hapus
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="w-12 h-12 text-neutral-400 mx-auto" />
            <div>
              <p className="text-sm font-medium text-neutral-900">
                Klik untuk upload atau drag & drop
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Maksimal {maxSize}MB • {acceptedTypes.join(', ')}
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-2 flex items-center text-sm text-red-600">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  )
}
