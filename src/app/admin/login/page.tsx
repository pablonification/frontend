'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import { useApp } from '../../../contexts/AppContext'
import { api, endpoints, LoginResponse, API_BASE_URL } from '../../../lib/api'

export default function AdminLogin() {
  const router = useRouter()
  const { addNotification } = useApp()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Try to login using the real API
      try {
        const response = await api.post<LoginResponse>(endpoints.auth.login, {
          email: formData.email,
          password: formData.password
        })
        
        console.log('Login API response:', response)
        
        // Handle different response structures
        let token: string | null = null
        let user: any = null
        
        // Check if token is in response.data.token (expected structure)
        if (response.data && (response.data as any).token) {
          token = (response.data as any).token
          user = (response.data as any).user
        } 
        // Check if token is directly in response.data (alternative structure)
        else if (response.data && typeof response.data === 'object' && 'token' in response.data) {
          token = (response.data as any).token
          user = (response.data as any).user
        }
        // Check if response itself has token (rare case)
        else if ((response as any).token) {
          token = (response as any).token
          user = (response as any).user
        }
        
        if (token) {
          localStorage.setItem('auth_token', token)
          console.log('Token saved to localStorage:', token.substring(0, 20) + '...')
          
          // Store user data
          if (user) {
            localStorage.setItem('user_data', JSON.stringify(user))
          }
          
          addNotification({
            type: 'success',
            title: 'Login Berhasil',
            message: 'Selamat datang di dashboard admin'
          })
          router.push('/admin')
        } else {
          console.error('No token found in response:', response)
          console.error('Response structure:', JSON.stringify(response, null, 2))
          setError('Token tidak diterima dari server. Periksa console untuk detail.')
        }
      } catch (apiError: any) {
        console.error('API login error:', apiError)
        console.error('Error message:', apiError.message)
        
        // Check if it's a CORS error
        if (apiError.message && apiError.message.includes('CORS')) {
          const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'unknown'
          setError(`CORS Error: Backend di ${API_BASE_URL} tidak mengizinkan request dari origin: ${currentOrigin}

Backend saat ini hanya mengizinkan: https://labkidasitb.vercel.app
Origin Anda saat ini: ${currentOrigin}

Solusi: Tambahkan "${currentOrigin}" ke daftar allowed origins di backend CORS configuration.`)
          return
        }
        
        // Check if it's a network error (backend not running or CORS issue)
        if (apiError.message && (
          apiError.message.includes('Unable to connect') || 
          apiError.message.includes('Network error') ||
          apiError.message.includes('Failed to fetch')
        )) {
          // This could be a CORS issue or backend not running
          console.warn('Backend tidak dapat diakses')
          
          // Check browser console for CORS errors
          const errorMsg = `Tidak dapat terhubung ke backend di ${API_BASE_URL}. 
          
Kemungkinan penyebab:
1. CORS Error - Backend tidak mengizinkan request dari origin frontend
2. Backend tidak berjalan atau tidak dapat diakses

Solusi:
- Buka Developer Tools (F12) > Console untuk melihat error detail
- Pastikan backend dikonfigurasi untuk mengizinkan CORS dari origin frontend Anda
- Cek apakah backend berjalan di ${API_BASE_URL}`
          
          setError(errorMsg)
          return
        } else {
          // API error lainnya (invalid credentials, dll)
          setError(apiError.message || 'Email atau password salah')
        }
      }
    } catch (err: any) {
      setError(err.message || 'Email atau password salah')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-neutral-900">
            Admin Login
          </h2>
          <p className="mt-2 text-neutral-600">
            Masuk ke dashboard admin Lab Kimia Dasar
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="admin@labkimia.ac.id"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Masukkan password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
