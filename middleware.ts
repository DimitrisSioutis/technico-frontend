import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value; 

  const protectedRoutes = ['/dashboard'];
  const publicRoutes = ['/login','/login2'];

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (publicRoutes.includes(request.nextUrl.pathname)) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}
