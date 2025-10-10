'use client'

import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '../ui/Button'

interface Column<T> {
  key: keyof T
  label: string
  render?: (value: any, item: T) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  page?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  loading?: boolean
}

export default function DataTable<T>({
  data,
  columns,
  page = 1,
  totalPages = 1,
  onPageChange,
  loading = false
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-neutral-200">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-2 text-neutral-600">Memuat data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {data.map((item, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-neutral-50">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    {column.render 
                      ? column.render((item as any)[column.key], item)
                      : (item as any)[column.key]
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {data.length === 0 && (
        <div className="p-8 text-center text-neutral-500">
          Tidak ada data
        </div>
      )}
      
      {totalPages > 1 && (
        <div className="px-6 py-3 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
          <div className="text-sm text-neutral-700">
            Halaman {page} dari {totalPages}
          </div>
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onPageChange?.(page - 1)}
              disabled={page <= 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onPageChange?.(page + 1)}
              disabled={page >= totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
