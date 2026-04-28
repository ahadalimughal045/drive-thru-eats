import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parseAdminSessionValue } from '@/lib/admin-session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = parseAdminSessionValue(request.cookies.get('dte_admin_session')?.value);
  const isAuthenticated = Boolean(session);
  const isAdminLoginPage = pathname === '/admin/login';

  if (isAdminLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  if (!isAdminLoginPage && !isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
