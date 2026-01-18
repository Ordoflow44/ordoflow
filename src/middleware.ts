import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Paths that require authentication
const protectedPaths = [
  '/admin/dashboard',
  '/admin/articles',
  '/admin/seo',
  '/admin/settings',
]

// Paths that should redirect to dashboard if already logged in
const authPaths = ['/admin']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionCookie = request.cookies.get('admin_session')

  // Check if session is valid
  let isValidSession = false
  if (sessionCookie?.value) {
    try {
      const decoded = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString())
      isValidSession = decoded.exp > Date.now()
    } catch {
      isValidSession = false
    }
  }

  // Check if accessing protected path without valid session
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
  if (isProtectedPath && !isValidSession) {
    const loginUrl = new URL('/admin', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Check if accessing auth path (login) with valid session - redirect to dashboard
  const isAuthPath = pathname === '/admin' || pathname === '/admin/'
  if (isAuthPath && isValidSession) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  // Allow reset-password page without authentication
  if (pathname.startsWith('/admin/reset-password')) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
