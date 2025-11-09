import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './auth'

// Helper to check Express backend authentication
async function checkExpressAuth(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  
  if (!token) {
    return null
  }

  try {
    // Verify token with Express backend
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    const response = await fetch(`${API_URL}/api/auth/me`, {
      headers: {
        'Cookie': `token=${token}`,
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(5000), // 5 second timeout
    })

    if (!response.ok) {
      // Only return null for auth errors (401, 403)
      // For server errors (500, 503), allow access (don't force logout)
      if (response.status === 401 || response.status === 403) {
        return null
      }
      // For other errors, assume token is still valid (graceful degradation)
      console.warn('Auth check returned non-auth error:', response.status)
      return { role: null } // Allow access but without role info
    }

    const data = await response.json()
    return data.data // Returns user object with role
  } catch (error) {
    // If server is down or network error, don't force logout
    // Just log and allow access (graceful degradation)
    console.warn('Express auth check failed (allowing access):', error)
    return { role: null } // Allow access but without role check
  }
}

// Tracking middleware for affiliate links
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle affiliate link tracking
  if (pathname.startsWith('/r/')) {
    const slug = pathname.split('/r/')[1]
    
    // Set tracking cookie
    const clickId = crypto.randomUUID()
    const response = NextResponse.next()
    
    response.cookies.set('affiliate_click_id', clickId, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
      sameSite: 'lax',
    })
    
    response.cookies.set('affiliate_slug', slug, {
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
    })
    
    return response
  }

  // Protected routes
  const protectedRoutes = ['/brand', '/creator', '/admin']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute) {
    // Try NextAuth session first
    const session = await auth()
    
    // Try Express backend auth if no NextAuth session
    const expressUser = !session ? await checkExpressAuth(request) : null
    
    // If neither auth method works, redirect to login
    if (!session && !expressUser) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Get user role from either auth system
    const userRole = session?.user?.role || expressUser?.role
    
    if (!userRole) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Role-based access control
    if (pathname.startsWith('/admin') && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
    
    if (pathname.startsWith('/brand') && userRole !== 'BRAND' && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
    
    if (pathname.startsWith('/creator') && userRole !== 'CREATOR' && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/r/:path*',
    '/brand/:path*',
    '/creator/:path*',
    '/admin/:path*',
  ],
}

