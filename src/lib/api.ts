const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'

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

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
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
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
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
    formData.append('file', file as unknown as Blob)
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value)
      })
    }

    return this.request<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData, let browser set it
      },
    })
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
    update: (id: number) => `/api/sliders/${id}`,
    delete: (id: number) => `/api/sliders/${id}`,
  },
  
  // Announcements
  announcements: {
    list: '/api/announcements',
    create: '/api/announcements',
    get: (id: number) => `/api/announcements/${id}`,
    update: (id: number) => `/api/announcements/${id}`,
    delete: (id: number) => `/api/announcements/${id}`,
  },
  
  // Files
  files: {
    list: '/api/files',
    create: '/api/files',
    get: (id: number) => `/api/files/${id}`,
    update: (id: number) => `/api/files/${id}`,
    delete: (id: number) => `/api/files/${id}`,
    verifyPassword: (id: number) => `/api/files/${id}/verify-password`,
    download: (id: number) => `/api/files/${id}/download`,
  },
  
  // Modules
  modules: {
    list: '/api/modules',
    create: '/api/modules',
    get: (id: number) => `/api/modules/${id}`,
    update: (id: number) => `/api/modules/${id}`,
    delete: (id: number) => `/api/modules/${id}`,
  },
  
  // Grade files
  nilai: {
    list: '/api/nilai',
    create: '/api/nilai',
    get: (id: number) => `/api/nilai/${id}`,
    update: (id: number) => `/api/nilai/${id}`,
    delete: (id: number) => `/api/nilai/${id}`,
    verifyPassword: (id: number) => `/api/nilai/${id}/verify-password`,
    download: (id: number) => `/api/nilai/${id}/download`,
  },
  
  // Search
  search: {
    global: '/api/search',
  },
} as const

// Type definitions
export interface Slider {
  id: number
  title: string
  image_path: string
  alt_text: string
  order: number
  created_at: string
  updated_at: string
}

export interface Announcement {
  id: number
  title: string
  content: string
  attachments: string[]
  published_at: string
  created_at: string
  updated_at: string
}

export interface File {
  id: number
  name: string
  storage_path: string
  description: string
  visibility: 'public' | 'private'
  has_password: boolean
  created_by: number
  created_at: string
  updated_at: string
}

export interface Module {
  id: number
  title: string
  file_path: string
  description: string
  visibility: 'public' | 'private'
  created_at: string
  updated_at: string
}

export interface NilaiFile {
  id: number
  class: string
  storage_path: string
  cohort: string
  has_password: boolean
  created_at: string
  updated_at: string
}

export interface SearchResult {
  id: number
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
    id: number
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

export default api
