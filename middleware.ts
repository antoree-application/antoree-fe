import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/home',
  '/teachers',
  '/teachers/:path*',
  '/login',
  '/register',
  '/register/student',
  '/register/teacher',
  '/forgot-password',
  '/contact-us',
  '/faqs',
  '/terms',
  '/privacy',
  '/refund',
  '/commitment',
  '/community',
  '/review/:path*',
  '/api/auth/login',
  '/api/auth/register',
  '/api/teachers',
  '/api/teachers/:path*',
  '/api/reviews',
  '/api/reviews/:path*',
  '/api/contact',
  '/api/payment/methods',
]

// Define protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/teacher/dashboard',
  '/teacher/bookings',
  '/teacher/schedule',
  '/teacher/students',
  '/payment/step1',
  '/payment/success',
  '/api/auth/logout',
  '/api/auth/profile',
  '/api/bookings',
  '/api/bookings/:path*',
  '/api/payment/process',
  '/api/payment/simple/:path*',
]

// Helper function to check if a path matches a pattern
function matchesPath(path: string, pattern: string): boolean {
  // Convert pattern to regex (replace :path* with .*)
  const regexPattern = pattern
    .replace(/:\w+\*/g, '.*')
    .replace(/:\w+/g, '[^/]+')
    .replace(/\//g, '\\/')
  
  const regex = new RegExp(`^${regexPattern}$`)
  return regex.test(path)
}

// Check if route is public
function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(route => matchesPath(pathname, route))
}

// Check if route is protected
function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some(route => matchesPath(pathname, route))
}

// Check if user is authenticated
function isAuthenticated(request: NextRequest): boolean {
  // Check for authentication token in cookies or headers
  const authToken = request.cookies.get('auth-token')?.value
  const authHeader = request.headers.get('authorization')
  
  return !!(authToken || authHeader?.startsWith('Bearer '))
}

// Main middleware function
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip middleware for Next.js internal paths and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/_next') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next()
  }

  console.log(`[Middleware] Processing request: ${pathname}`)

  // Handle protected routes
  if (isProtectedRoute(pathname)) {
    if (!isAuthenticated(request)) {
      console.log(`[Middleware] Redirecting unauthenticated user to login: ${pathname}`)
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  // Handle authentication pages (redirect if already authenticated)
  if (pathname === '/login' || pathname === '/register' || pathname.startsWith('/register/')) {
    if (isAuthenticated(request)) {
      console.log(`[Middleware] Redirecting authenticated user to dashboard: ${pathname}`)
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Handle root route redirect
  if (pathname === '/') {
    console.log(`[Middleware] Redirecting root to home`)
    return NextResponse.redirect(new URL('/home', request.url))
  }

  // Add security headers
  const response = NextResponse.next()
  
  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  
  // Add CORS headers for API routes
  if (pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  }

  console.log(`[Middleware] Request processed successfully: ${pathname}`)
  return response
}

// Configure which paths should trigger the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}