import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protected routes
  const protectedPaths = ['/dashboard', '/checkout']
  const isProtectedPath = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path))
  
  // Admin routes
  const isAdminPath = req.nextUrl.pathname.startsWith('/admin')
  
  if (isProtectedPath && !session) {
    const redirectUrl = new URL('/login', req.url)
    redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Check admin role for admin routes
  if (isAdminPath && session) {
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('auth_id', session.user.id)
      .single()
    
    if (userData?.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  // Rate limiting headers
  res.headers.set('X-RateLimit-Limit', '100')
  res.headers.set('X-RateLimit-Remaining', '99')
  res.headers.set('X-RateLimit-Reset', new Date(Date.now() + 60 * 1000).toISOString())

  return res
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/checkout/:path*',
    '/api/:path*',
  ],
}
