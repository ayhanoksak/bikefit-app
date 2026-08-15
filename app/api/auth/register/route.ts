// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendVerificationEmail } from '@/lib/mail';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'E-posta ve şifre zorunludur.' }, { status: 400 });
    }

    // Daha önce bu e-posta ile kayıt olunmuş mu kontrol edelim
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ success: false, error: 'Bu e-posta adresi zaten kullanımda.' }, { status: 400 });
    }

    // Şifreyi güvenli bir şekilde hash'liyoruz
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Doğrulama için benzersiz bir token üretiyoruz
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Kullanıcıyı isVerified: false ve token ile oluşturuyoruz
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        isVerified: false,
        verificationToken,
      },
    });

    // Doğrulama e-postasını gönderiyoruz
    try {
      await sendVerificationEmail(email, verificationToken);
    } catch (mailError) {
      console.error("E-posta gönderilemedi:", mailError);
      // İsteğe bağlı: mail gitmese bile kayıt başarılı denebilir veya hata döndürülebilir
    }

    return NextResponse.json({
      success: true,
      message: 'Kayıt başarıyla oluşturuldu. Lütfen e-postanızı kontrol ederek hesabınızı doğrulayın.',
      userId: user.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Sunucu hatası oluştu.' }, { status: 500 });
  }
}