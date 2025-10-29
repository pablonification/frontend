import React from 'react'
import { cn } from '../../lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-neutral-100 border-t-primary-500 shadow-sm',
        sizeClasses[size],
        className
      )}
      style={{
        animation: 'spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite'
      }}
    />
  )
}

LoadingSpinner.Page = function PageSpinner({ message = 'Memuat...' }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-neutral-50">
      <div className="text-center space-y-6">
        <div className="relative">
          <LoadingSpinner size="lg" className="mx-auto" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-neutral-900 font-medium text-lg">{message}</p>
          <p className="text-neutral-500 text-sm">Mohon tunggu sebentar...</p>
        </div>
      </div>
    </div>
  )
}
