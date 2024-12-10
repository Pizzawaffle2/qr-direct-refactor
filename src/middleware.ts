// middleware.ts
import { NextResponse, NextRequest } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0/edge';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedPaths = [
    '/profile',
    '/settings',
    '/qr-generator',
    '/analytics',
    '/billing'
  ];

  // Check if the current path is protected
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    try {
      const session = await getSession(request, NextResponse.next());
      
      // If no session exists, redirect to login
      if (!session) {
        const loginUrl = new URL('/api/auth/login', request.url);
        loginUrl.searchParams.set('returnTo', pathname);
        return NextResponse.redirect(loginUrl);
      }

    } catch (error) {
      // Handle any errors during session check
      console.error('Auth middleware error:', error);
      return NextResponse.redirect(new URL('/api/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/profile/:path*',
    '/settings/:path*',
    '/analytics/:path*',
    '/billing/:path*'
  ]
};