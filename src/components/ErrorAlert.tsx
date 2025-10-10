'use client'

import React from 'react'
import { AlertCircle, X } from 'lucide-react'

interface ErrorAlertProps {
  message: string
  onDismiss: () => void
}

export default function ErrorAlert({ message, onDismiss }: ErrorAlertProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="w-5 h-5 text-red-600" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-red-800">{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <button
            onClick={onDismiss}
            className="text-red-400 hover:text-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
