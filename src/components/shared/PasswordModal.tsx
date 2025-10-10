'use client'

import React, { useState } from 'react'
import { X, Lock, Eye, EyeOff } from 'lucide-react'
import Button from '../ui/Button'

interface PasswordModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (password: string) => void
  title?: string
  description?: string
  loading?: boolean
}

export default function PasswordModal({
  isOpen,
  onClose,
  onSubmit,
  title = 'Masukkan Password',
  description = 'File ini dilindungi dengan password. Masukkan password untuk mengakses file.',
  loading = false
}: PasswordModalProps) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!password.trim()) {
      setError('Password tidak boleh kosong')
      return
    }

    setError(null)
    onSubmit(password)
  }

  const handleClose = () => {
    setPassword('')
    setError(null)
    setShowPassword(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleClose} />
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-primary-500" />
              <h3 className="text-lg font-semibold text-neutral-900">
                {title}
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="text-neutral-400 hover:text-neutral-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-neutral-600 mb-6">
            {description}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
              {error && (
                <p className="text-sm text-red-600 mt-1">{error}</p>
              )}
            </div>

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="secondary"
                onClick={handleClose}
                className="flex-1"
                disabled={loading}
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={loading}
              >
                {loading ? 'Memverifikasi...' : 'Buka File'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
