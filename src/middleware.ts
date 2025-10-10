import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip middleware for login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    // In a real app, you would check for authentication token here
    // For demo purposes, we'll allow access to admin routes
    // You can implement proper JWT verification here
    
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*'
  ]
}
