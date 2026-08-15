// app/api/fit-gecmis/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ success: false, error: 'Kullanıcı kimliği gerekli.' }, { status: 400 });
    }

    const fits = await prisma.fitResult.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });

    return NextResponse.json({ success: true, fits });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Veriler alınamadı.' }, { status: 500 });
  }
}