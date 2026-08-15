import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Tüm çerezleri kontrol ederek oturum açılıp açılmadığını yakalıyoruz
  const allCookies = request.cookies.getAll();
  const hasSession = allCookies.some(cookie => 
    cookie.name.includes('session-token') || cookie.name.includes('auth') || cookie.name.includes('token')
  );

  const path = request.nextUrl.pathname;
  const isProtected = path.startsWith('/bikefit-yap') || path.startsWith('/cleat-ayari');

  // Giriş yapmamışsa /login sayfasına fırlat
  if (isProtected && !hasSession) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/bikefit-yap/:path*', '/cleat-ayari/:path*'],
};