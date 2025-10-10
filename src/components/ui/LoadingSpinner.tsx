import React from 'react'
import { cn } from '../../lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-neutral-200 border-t-primary-500',
        sizeClasses[size],
        className
      )}
    />
  )
}

LoadingSpinner.Page = function PageSpinner({ message = 'Memuat...' }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-neutral-600">{message}</p>
      </div>
    </div>
  )
}
