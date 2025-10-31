export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://128.199.70.237'

interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

interface ApiError {
  message: string
  status: number
  details?: any
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token')
    }
    return null
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    
    const token = this.getAuthToken()
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    // Add authorization header if token exists
    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`
      console.log(`[API] Request to ${endpoint} with token: ${token.substring(0, 20)}...`)
    } else {
      console.log(`[API] Request to ${endpoint} without token`)
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)
      
      // Handle response parsing
      let data: any
      const contentType = response.headers.get('content-type')
      
      if (contentType && contentType.includes('application/json')) {
        try {
          const text = await response.text()
          if (text) {
            data = JSON.parse(text)
          } else {
            data = {}
          }
        } catch (e) {
          // If JSON parsing fails, create a generic error
          throw new Error(`Invalid JSON response from server: ${response.status} ${response.statusText}`)
        }
      } else {
        // If response is not JSON, read as text
        const text = await response.text()
        data = { message: text || `HTTP error! status: ${response.status}` }
      }

      if (!response.ok) {
        console.error(`[API] Request failed: ${response.status}`, data)
        
        // Handle authentication errors
        if (response.status === 401 || response.status === 403) {
          console.warn(`[API] Authentication error (${response.status}). Token: ${token ? token.substring(0, 20) + '...' : 'none'}`)
          
          // Only clear token if it's not a mock token (to avoid clearing valid tokens)
          if (typeof window !== 'undefined' && token && token !== 'mock-jwt-token-for-demo') {
            console.warn('[API] Clearing invalid token from localStorage')
            localStorage.removeItem('auth_token')
            localStorage.removeItem('user_data')
          }
          
          // Create a more specific error
          const errorMessage = data.message || 'Authentication failed. Please login again.'
          const error = new Error(errorMessage) as any
          error.status = response.status
          error.isAuthError = true
          throw error
        }
        
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }
      
      console.log(`[API] Request successful: ${endpoint}`)

      return data
    } catch (error: any) {
      console.error('API request failed:', error)
      console.error('Request URL was:', url)
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      })
      
      // If it's already an Error with isAuthError, rethrow it
      if (error.isAuthError) {
        throw error
      }
      
      // Provide more specific error messages for common issues
      if (error instanceof TypeError && error.message.includes('fetch failed')) {
        throw new Error(`Unable to connect to the backend server at ${url}. This might be a CORS issue. Please check if the backend is running and allows requests from this origin.`)
      }
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        // This is often a CORS error when accessing cross-origin resources
        if (error.message.includes('CORS') || !error.message.includes('Network')) {
          throw new Error(`CORS error: The backend at ${url} is not allowing requests from this origin. Please configure CORS on the backend to allow requests from ${typeof window !== 'undefined' ? window.location.origin : 'your frontend origin'}.`)
        }
        throw new Error('Network error. Please check your internet connection.')
      }
      
      throw error
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }

  // PATCH request
  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  // File upload
  async uploadFile<T>(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<ApiResponse<T>> {
    const formData = new FormData()
    formData.append('file', file as unknown as Blob, file.name)
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value))
      })
    }

    const url = `${this.baseURL}${endpoint}`
    const token = this.getAuthToken()
    const headers: Record<string, string> = {}
    
    // Add authorization header if token exists
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    
    // Don't set Content-Type for FormData, let browser set it with boundary

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers,
      })
      
      // Handle response parsing (same as request method)
      let data: any
      const contentType = response.headers.get('content-type')
      
      if (contentType && contentType.includes('application/json')) {
        try {
          const text = await response.text()
          if (text) {
            data = JSON.parse(text)
          } else {
            data = {}
          }
        } catch (e) {
          throw new Error(`Invalid JSON response from server: ${response.status} ${response.statusText}`)
        }
      } else {
        const text = await response.text()
        data = { message: text || `HTTP error! status: ${response.status}` }
      }

      if (!response.ok) {
        // Handle authentication errors
        if (response.status === 401 || response.status === 403) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('user_data')
          }
          
          const errorMessage = data.message || 'Authentication failed. Please login again.'
          const error = new Error(errorMessage) as any
          error.status = response.status
          error.isAuthError = true
          throw error
        }
        
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error: any) {
      console.error('File upload failed:', error)
      
      if (error.isAuthError) {
        throw error
      }
      
      if (error instanceof TypeError && error.message.includes('fetch failed')) {
        throw new Error('Unable to connect to the backend server. Please check if the backend is running and accessible.')
      }
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('Network error. Please check your internet connection.')
      }
      
      throw error
    }
  }

  // File download
  async downloadFile(endpoint: string, filename?: string): Promise<void> {
    const url = `${this.baseURL}${endpoint}`
    const token = this.getAuthToken()
    const headers: Record<string, string> = {}
    
    // Add authorization header if token exists
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers,
      })
      
      if (!response.ok) {
        throw new Error(`Download failed: ${response.status} ${response.statusText}`)
      }
      
      const contentType = response.headers.get('content-type')
      
      // Check if response is JSON (signed URL) or direct file
      if (contentType && contentType.includes('application/json')) {
        // Parse JSON response to get signed URL
        const jsonResponse = await response.json()
        
        if (jsonResponse.success && jsonResponse.data && jsonResponse.data.download_url) {
          // Use the signed URL to download the actual file
          await this.downloadFromUrl(jsonResponse.data.download_url, filename)
        } else {
          throw new Error('Invalid response format: missing download URL')
        }
      } else {
        // Direct file download
        // Get filename from Content-Disposition header or use provided/default
        const contentDisposition = response.headers.get('content-disposition')
        let downloadFilename = filename || 'download'
        
        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="(.+)"/)
          if (filenameMatch) {
            downloadFilename = filenameMatch[1]
          }
        }
        
        // Convert response to blob and create download link
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = downloadFilename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(downloadUrl)
      }
      
    } catch (error: any) {
      console.error('File download failed:', error)
      
      if (error instanceof TypeError && error.message.includes('fetch failed')) {
        throw new Error('Unable to connect to the backend server. Please check if the backend is running and accessible.')
      }
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('Network error. Please check your internet connection.')
      }
      
      throw error
    }
  }

  // Download file from URL
  private async downloadFromUrl(url: string, filename?: string): Promise<void> {
    try {
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`Download failed: ${response.status} ${response.statusText}`)
      }
      
      // Get filename from Content-Disposition header or use provided/default
      const contentDisposition = response.headers.get('content-disposition')
      let downloadFilename = filename || 'download'
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/)
        if (filenameMatch) {
          downloadFilename = filenameMatch[1]
        }
      }
      
      // Convert response to blob and create download link
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = downloadFilename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
      
    } catch (error: any) {
      console.error('Download from URL failed:', error)
      throw error
    }
  }

  // GET request with query parameters
  async getWithQuery<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseURL}${endpoint}`)
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value)
      })
    }

    const token = this.getAuthToken()
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    // Add authorization header if token exists
    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`
    }

    const config: RequestInit = {
      method: 'GET',
      headers: {
        ...defaultHeaders,
      },
    }

    try {
      const response = await fetch(url.toString(), config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
      
      // Provide more specific error messages for common issues
      if (error instanceof TypeError && error.message.includes('fetch failed')) {
        throw new Error('Unable to connect to the backend server. Please check if the backend is running and accessible.')
      }
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('Network error. Please check your internet connection.')
      }
      
      throw error
    }
  }
}

// Create API client instance
export const api = new ApiClient(API_BASE_URL)

// API endpoints
export const endpoints = {
  // Auth
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    me: '/api/auth/me',
  },
  
  // Sliders
  sliders: {
    list: '/api/sliders',
    create: '/api/sliders',
    update: (id: string | number) => `/api/sliders/${id}`,
    delete: (id: string | number) => `/api/sliders/${id}`,
  },
  
  // Announcements
  announcements: {
    list: '/api/announcements',
    create: '/api/announcements',
    get: (id: string | number) => `/api/announcements/${id}`,
    update: (id: string | number) => `/api/announcements/${id}`,
    delete: (id: string | number) => `/api/announcements/${id}`,
  },
  
  // Files
  files: {
    list: '/api/files',
    create: '/api/files',
    get: (id: string | number) => `/api/files/${id}`,
    update: (id: string | number) => `/api/files/${id}`,
    delete: (id: string | number) => `/api/files/${id}`,
    verifyPassword: (id: string | number) => `/api/files/${id}/verify-password`,
    download: (id: string | number) => `/api/files/${id}/download`,
  },
  
  // Modules
  modules: {
    list: '/api/modules',
    create: '/api/modules',
    get: (id: string | number) => `/api/modules/${id}`,
    update: (id: string | number) => `/api/modules/${id}`,
    delete: (id: string | number) => `/api/modules/${id}`,
    download: (id: string | number) => `/api/modules/${id}/download`,
  },
  
  // Grade files
  nilai: {
    list: '/api/nilai',
    create: '/api/nilai',
    get: (id: string | number) => `/api/nilai/${id}`,
    update: (id: string | number) => `/api/nilai/${id}`,
    delete: (id: string | number) => `/api/nilai/${id}`,
    verifyPassword: (id: string | number) => `/api/nilai/${id}/verify-password`,
    download: (id: string | number) => `/api/nilai/${id}/download`,
  },
  
  // Search
  search: {
    global: '/api/search',
  },
  
  // Groups
  groups: {
    list: '/api/groups',
    create: '/api/groups',
    get: (id: string | number) => `/api/groups/${id}`,
    update: (id: string | number) => `/api/groups/${id}`,
    delete: (id: string | number) => `/api/groups/${id}`,
    download: (id: string | number) => `/api/groups/${id}/download`,
  },
} as const

// Type definitions
export interface Slider {
  id: string | number
  title: string
  image_path: string
  alt_text: string
  order_index: number
  created_at: string
  updated_at: string
}

export interface Announcement {
  id: string | number
  title: string
  content: string
  attachments: string[]
  is_important?: boolean
  published_at: string
  created_at: string
  updated_at: string
}

export interface File {
  id: string | number
  name: string
  storage_path: string
  description: string
  visibility: 'public' | 'private'
  has_password: boolean
  created_by: string | number
  created_at: string
  updated_at: string
  file_type?: string
  file_size?: number
}

export interface Module {
  id: string | number
  title: string
  file_path: string
  description: string
  visibility: 'public' | 'private'
  file_size?: number
  file_type?: string
  download_count?: number
  created_at: string
  updated_at: string
}

export interface NilaiFile {
  id: string | number
  class: string
  storage_path: string
  cohort: string
  has_password: boolean
  created_at: string
  updated_at: string
  file_type?: string
  file_size?: number
  name?: string
}

export interface SearchResult {
  id: string | number
  type: 'announcement' | 'module' | 'file'
  title: string
  excerpt: string
  url: string
  created_at: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: {
    id: string | number
    email: string
    full_name: string
    role: string
  }
  token: string
}

export interface PasswordVerificationRequest {
  password: string
}

export interface PasswordVerificationResponse {
  download_url: string
  expires_at: string
}

export interface Group {
  id: string | number
  name: string
  description: string
  storage_path: string
  cohort: string
  visibility: 'public' | 'private'
  has_password: boolean
  file_size?: number
  file_type?: string
  download_count?: number
  created_at: string
  updated_at: string
}

export default api
