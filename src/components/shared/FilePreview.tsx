'use client'

import React, { useState } from 'react'
import { X, Download, Eye, FileText, Image as ImageIcon, File } from 'lucide-react'
import Button from '../ui/Button'
import Modal from '../ui/Modal'

interface FilePreviewProps {
  isOpen: boolean
  onClose: () => void
  file: {
    id: number
    name: string
    storage_path: string
    file_type?: string
    file_size?: number
  }
  onDownload?: (id: number) => void
}

export default function FilePreview({
  isOpen,
  onClose,
  file,
  onDownload
}: FilePreviewProps) {
  const [imageError, setImageError] = useState(false)

  const getFileIcon = (fileType?: string) => {
    if (!fileType) return File
    
    if (fileType.startsWith('image/')) return ImageIcon
    if (fileType === 'application/pdf') return FileText
    return File
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size'
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`
  }

  // Add null check for file
  if (!file) {
    return null
  }

  const isImage = file.file_type?.startsWith('image/')
  const isPdf = file.file_type === 'application/pdf'

  const FileIcon = getFileIcon(file.file_type)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title="Preview File"
    >
      <div className="space-y-4">
        {/* File Info */}
        <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileIcon className="w-5 h-5 text-primary-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-neutral-900 truncate">{file.name || `File ${file.id}`}</p>
            <p className="text-sm text-neutral-500">{formatFileSize(file.file_size)}</p>
          </div>
          {onDownload && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onDownload(file.id)}
            >
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
          )}
        </div>

        {/* Preview Area */}
        <div className="border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50">
          {isImage && !imageError ? (
            <div className="relative">
              <img
                src={file.storage_path}
                alt={file.name || `File ${file.id}`}
                className="w-full h-auto max-h-96 object-contain"
                onError={() => setImageError(true)}
              />
            </div>
          ) : isPdf ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <FileText className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                <p className="text-neutral-600 mb-4">PDF Preview</p>
                <p className="text-sm text-neutral-500 mb-4">
                  PDF preview is not available. Please download the file to view it.
                </p>
                {onDownload && (
                  <Button onClick={() => onDownload(file.id)}>
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <File className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                <p className="text-neutral-600 mb-4">File Preview</p>
                <p className="text-sm text-neutral-500 mb-4">
                  Preview is not available for this file type. Please download the file to view it.
                </p>
                {onDownload && (
                  <Button onClick={() => onDownload(file.id)}>
                    <Download className="w-4 h-4 mr-2" />
                    Download File
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-neutral-100">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          {onDownload && (
            <Button onClick={() => onDownload(file.id)}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          )}
        </div>
      </div>
    </Modal>
  )
}