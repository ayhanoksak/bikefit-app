// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'E-posta ve şifre zorunludur.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return NextResponse.json({ success: false, error: 'Geçersiz e-posta veya şifre.' }, { status: 401 });
    }

    // Önce başarılı yanıtı oluşturuyoruz
    const response = NextResponse.json({
      success: true,
      message: 'Giriş başarılı.',
      userId: user.id,
      email: user.email,
    });

    // Çerezi doğrudan yanıtın içine ekliyoruz (En garantili yöntem)
    response.cookies.set({
      name: 'userId',
      value: user.id,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 hafta
    });

    return response;
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ success: false, error: 'Sunucu hatası oluştu.' }, { status: 500 });
  }
}