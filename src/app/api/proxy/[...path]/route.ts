import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://128.199.70.237'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params
  return proxyRequest(request, resolvedParams, 'GET')
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params
  return proxyRequest(request, resolvedParams, 'POST')
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params
  return proxyRequest(request, resolvedParams, 'PUT')
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params
  return proxyRequest(request, resolvedParams, 'DELETE')
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params
  return proxyRequest(request, resolvedParams, 'PATCH')
}

export async function OPTIONS(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params
  return proxyRequest(request, resolvedParams, 'OPTIONS')
}

async function proxyRequest(
  request: NextRequest,
  params: { path: string[] },
  method: string
) {
  try {
    const path = params.path.join('/')
    const url = new URL(request.url)
    const searchParams = url.searchParams.toString()
    
    // Construct backend URL
    const backendUrl = `${BACKEND_URL}/${path}${searchParams ? `?${searchParams}` : ''}`
    
    // Get request body if exists
    let body: BodyInit | undefined
    const contentType = request.headers.get('content-type')
    
    if (method !== 'GET' && method !== 'OPTIONS' && request.body) {
      if (contentType?.includes('application/json')) {
        body = await request.text()
      } else if (contentType?.includes('multipart/form-data')) {
        // For file uploads, pass through the body as-is
        body = request.body
      } else {
        body = await request.text()
      }
    }
    
    // Prepare headers (exclude host and other proxy-specific headers)
    const headers: HeadersInit = {}
    request.headers.forEach((value, key) => {
      // Skip headers that shouldn't be forwarded
      const skipHeaders = [
        'host',
        'connection',
        'content-length',
        'transfer-encoding',
        'x-forwarded-for',
        'x-forwarded-proto',
        'x-forwarded-host',
      ]
      
      if (!skipHeaders.includes(key.toLowerCase())) {
        headers[key] = value
      }
    })
    
    // Make request to backend
    const response = await fetch(backendUrl, {
      method,
      headers,
      body,
      // @ts-ignore - signal might not be available in all environments
      signal: request.signal,
    })
    
    // Get response data
    const responseHeaders = new Headers()
    response.headers.forEach((value, key) => {
      // Forward all headers from backend
      responseHeaders.set(key, value)
    })
    
    // Add CORS headers for the frontend
    const origin = request.headers.get('origin')
    if (origin) {
      responseHeaders.set('Access-Control-Allow-Origin', origin)
      responseHeaders.set('Access-Control-Allow-Credentials', 'true')
    }
    
    let responseBody: BodyInit
    const responseContentType = response.headers.get('content-type')
    
    if (responseContentType?.includes('application/json')) {
      responseBody = await response.text()
    } else if (responseContentType?.includes('multipart/form-data') || responseContentType?.includes('application/octet-stream')) {
      responseBody = await response.blob()
    } else {
      responseBody = await response.text()
    }
    
    return new NextResponse(responseBody, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    })
  } catch (error: any) {
    console.error('Proxy error:', error)
    return NextResponse.json(
      {
        success: false,
        message: `Proxy error: ${error.message}`,
      },
      { status: 500 }
    )
  }
}

