'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Search, CheckSquare, Square } from 'lucide-react'
import Button from '../ui/Button'
import SearchBar from './SearchBar'

interface Column<T> {
  key: keyof T | string
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
  searchable?: boolean
  onSearch?: (query: string) => void
  selectable?: boolean
  onSelectAll?: (selected: boolean) => void
  onSelectionChange?: (selected: number[]) => void
  bulkActions?: React.ReactNode
}

export default function DataTable<T>({
  data,
  columns,
  page = 1,
  totalPages = 1,
  onPageChange,
  loading = false,
  searchable = false,
  onSearch,
  selectable = false,
  onSelectAll,
  onSelectionChange,
  bulkActions
}: DataTableProps<T>) {
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState(false)
  useEffect(() => {
    if (selectAll) {
      setSelectedItems(data.map((_, index) => index))
    } else {
      setSelectedItems([])
    }
  }, [selectAll, data])

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked)
    if (onSelectAll) {
      onSelectAll(checked)
    }
  }

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, id])
    } else {
      setSelectedItems(prev => prev.filter(item => item !== id))
    }
  }

  const handleBulkAction = () => {
    if (selectedItems.length > 0) {
      onSelectionChange?.(selectedItems)
    }
  }

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
        <div className="space-y-4">
          {/* Search Bar */}
          {searchable && onSearch && (
            <div className="mb-4">
              <SearchBar onSearch={onSearch} placeholder="Cari..." />
            </div>
          )}

          {/* Bulk Actions */}
          {selectable && (
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                  <label className="text-sm text-neutral-700 ml-2">
                    Pilih Semua
                  </label>
                </div>
                <span className="text-sm text-neutral-500">
                  {selectedItems.length} dipilih
                </span>
              </div>
              
              {bulkActions && selectedItems.length > 0 && (
                <div className="flex space-x-2 mt-2">
                  {bulkActions}
                </div>
              )}
            </div>
          )}

          <table className="w-full">
          <thead className="bg-neutral-50">
            <tr>
              {selectable && (
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                </th>
              )}
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
              <tr key={rowIndex} className={`hover:bg-neutral-50 ${selectedItems.includes((item as any).id) ? 'bg-primary-50' : ''}`}>
                {selectable && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes((item as any).id)}
                      onChange={(e) => handleSelectItem((item as any).id, e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                    />
                  </td>
                )}
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
