import React from 'react'
import { cn } from '../../lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export default function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
