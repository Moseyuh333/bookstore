import { NextRequest, NextResponse } from 'next/server';

// Subdomain routing middleware
// Supported env vars (optional): BASE_DOMAIN, ADMIN_SUBDOMAIN, ORDER_SUBDOMAIN, AUTH_SUBDOMAIN
// Defaults: admin., order., auth.

export function middleware(req: NextRequest) {
  if (process.env.DISABLE_MIDDLEWARE === '1') {
    return NextResponse.next();
  }
  const url = req.nextUrl.clone();
  const host = req.headers.get('host') || '';

  const BASE_DOMAIN = process.env.BASE_DOMAIN || '';
  const ADMIN = process.env.ADMIN_SUBDOMAIN || 'admin';
  const ORDER = process.env.ORDER_SUBDOMAIN || 'order';
  const AUTH = process.env.AUTH_SUBDOMAIN || 'auth';

  // Extract first label (subdomain) if base domain is provided
  let sub = '';
  if (BASE_DOMAIN && host.endsWith(BASE_DOMAIN)) {
    const rest = host.slice(0, -BASE_DOMAIN.length).replace(/\.$/, '');
    sub = rest.split('.').filter(Boolean).pop() || '';
  } else {
    // Fallback: take the first label, e.g. admin.localhost:3000 or admin-foo.herokuapp.com
    sub = host.split(':')[0].split('.').shift() || '';
  }

  // Avoid rewriting Next internals and static assets
  const pathname = url.pathname;
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/public')
  ) {
    return NextResponse.next();
  }

  if (sub === ADMIN) {
    url.pathname = `/admin${pathname === '/' ? '' : pathname}`;
    return NextResponse.rewrite(url);
  }
  if (sub === ORDER) {
    url.pathname = `/order${pathname === '/' ? '' : pathname}`;
    return NextResponse.rewrite(url);
  }
  if (sub === AUTH) {
    url.pathname = `/auth${pathname === '/' ? '' : pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
