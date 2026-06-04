import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parseAdminSessionValue } from '@/lib/admin-session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get('host') || '';
  
  const isAdminSubdomain = host.startsWith('admin.');
  const isChefSubdomain = host.startsWith('chef.');
  const isWaiterSubdomain = host.startsWith('waiter.');

  // Parse session for admin checks
  const session = parseAdminSessionValue(request.cookies.get('dte_admin_session')?.value);
  const isAuthenticated = Boolean(session);

  // Common assets/API bypass
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Get base host (e.g. drive-thrueats.online or localhost:3000)
  const baseHost = host.replace(/^(admin\.|chef\.|waiter\.)/, '');
  const protocol = request.nextUrl.protocol || 'https:';

  // 1. Chef Subdomain Logic
  if (isChefSubdomain) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/chef', request.url));
    }
    if (!pathname.startsWith('/chef')) {
      return NextResponse.redirect(`${protocol}//chef.${baseHost}/`);
    }
    return NextResponse.next();
  }

  // 2. Waiter Subdomain Logic
  if (isWaiterSubdomain) {
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/waiter', request.url));
    }
    if (!pathname.startsWith('/waiter')) {
      return NextResponse.redirect(`${protocol}//waiter.${baseHost}/`);
    }
    return NextResponse.next();
  }

  // 3. Admin Subdomain Logic
  if (isAdminSubdomain) {
    if (pathname === '/') {
      if (isAuthenticated) {
        return NextResponse.rewrite(new URL('/admin', request.url));
      } else {
        return NextResponse.rewrite(new URL('/admin/login', request.url));
      }
    }
    if (!pathname.startsWith('/admin')) {
      return NextResponse.redirect(`${protocol}//admin.${baseHost}/`);
    }
  }

  // 4. Main Domain Redirects (if accessing /chef, /waiter, or /admin on main site)
  if (!isAdminSubdomain && !isChefSubdomain && !isWaiterSubdomain) {
    if (pathname.startsWith('/chef')) {
      return NextResponse.redirect(`${protocol}//chef.${baseHost}/`);
    }
    if (pathname.startsWith('/waiter')) {
      return NextResponse.redirect(`${protocol}//waiter.${baseHost}/`);
    }
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(`${protocol}//admin.${baseHost}/`);
    }
  }

  // Standard authentication checks for /admin paths
  if (pathname.startsWith('/admin')) {
    const isAdminLoginPage = pathname === '/admin/login';

    if (isAdminLoginPage && isAuthenticated) {
      return NextResponse.redirect(new URL(isAdminSubdomain ? '/' : '/admin', request.url));
    }

    if (!isAdminLoginPage && !isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};


