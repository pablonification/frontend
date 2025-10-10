import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// Date formatting utilities
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions) {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  }
  
  return dateObj.toLocaleDateString('id-ID', defaultOptions)
}

export function formatDateTime(date: string | Date) {
  return formatDate(date, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function formatRelativeTime(date: string | Date) {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInMs = now.getTime() - dateObj.getTime()
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInHours / 24)
  
  if (diffInHours < 1) return 'Baru saja'
  if (diffInHours < 24) return `${diffInHours} jam yang lalu`
  if (diffInDays < 7) return `${diffInDays} hari yang lalu`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} minggu yang lalu`
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} bulan yang lalu`
  return `${Math.floor(diffInDays / 365)} tahun yang lalu`
}

// File utilities
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || ''
}

export function getFileIcon(filename: string): string {
  const extension = getFileExtension(filename)
  
  const iconMap: Record<string, string> = {
    pdf: '📄',
    doc: '📝',
    docx: '📝',
    xls: '📊',
    xlsx: '📊',
    ppt: '📽️',
    pptx: '📽️',
    txt: '📄',
    zip: '📦',
    rar: '📦',
    jpg: '🖼️',
    jpeg: '🖼️',
    png: '🖼️',
    gif: '🖼️',
    mp4: '🎥',
    avi: '🎥',
    mov: '🎥'
  }
  
  return iconMap[extension] || '📄'
}

// String utilities
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export function capitalizeWords(text: string): string {
  return text.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  )
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Array utilities
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const group = String(item[key])
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

export function sortBy<T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1
    if (aVal > bVal) return direction === 'asc' ? 1 : -1
    return 0
  })
}

export function unique<T>(array: T[]): T[] {
  return [...new Set(array)]
}

// Object utilities
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj }
  keys.forEach(key => delete result[key])
  return result
}

export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })
  return result
}

// Local storage utilities
export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue
  
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

export function setToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Failed to save to localStorage:', error)
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Failed to remove from localStorage:', error)
  }
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle utility
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}
