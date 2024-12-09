import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value; 

  const protectedRoutes = [
    '/dashboard',          
    '/dashboard/property', 
    '/dashboard/property/', 
    '/dashboard/property/*' 
  ];

  const publicRoutes = ['/login'];

  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname === route || 
    request.nextUrl.pathname.startsWith(route.replace('*', ''))
  );

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  const uniquePublicRoutes = [...new Set(publicRoutes)];

  if (uniquePublicRoutes.includes(request.nextUrl.pathname)) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login'
  ]
}