// app/api/fit-hesapla/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  console.log("--- BIKETIT API ÇAĞRILDI ---");
  console.log("Okunan userId değeri:", userId);

  if (!userId) {
    console.log("HATA: userId bulunamadı, 401 dönülüyor.");
    return NextResponse.json({ success: false, error: 'Yetkisiz erişim: Lütfen giriş yapın.' }, { status: 401 });
  }

  // BURADAKİ HATA DÜZELTİLDİ: await eklendi
  const user = await prisma.user.findUnique({ where: { id: userId } });
  
  if (!user || !user.isVerified) {
    console.log("HATA: Kullanıcı bulunamadı veya doğrulanmamış, 403 dönülüyor.");
    return NextResponse.json({ success: false, error: 'Hesabınız henüz doğrulanmamış.' }, { status: 403 });
  }

  console.log("BAŞARILI: Kullanıcı doğrulandı, hesaplama yapılıyor.");

  try {
    const body = await request.json();
    const { 
      height, inseam, armLength, torsoLength, shoulderWidth,
      currentSaddleHeight, currentBarWidth, currentStemLength, currentCrankLength 
    } = body;

    const h = parseFloat(height) || 0;
    const i = parseFloat(inseam) || 0;
    const a = parseFloat(armLength) || 0;
    const t = parseFloat(torsoLength) || 0;
    const s = parseFloat(shoulderWidth) || 0;

    const currSaddle = parseFloat(currentSaddleHeight) || 0;
    const currBar = parseFloat(currentBarWidth) || 0;
    const currStem = parseFloat(currentStemLength) || 0;
    const currCrank = parseFloat(currentCrankLength) || 0;

    const idealSaddleHeight = parseFloat((i * 0.883).toFixed(1));
    const idealReach = parseFloat(((t + a) * 0.52).toFixed(1));
    const idealSetback = parseFloat((i * 0.105).toFixed(1));
    const idealBarWidth = parseFloat(s.toFixed(0));

    let idealStem = 100;
    if (h < 170) idealStem = 90;
    else if (h > 185) idealStem = 110;

    let idealCrank = 170;
    if (i < 78) idealCrank = 165;
    else if (i > 86) idealCrank = 172.5;

    const comparisonTable = [
      {
        parameter: "Sele Yüksekliği",
        current: currSaddle ? `${currSaddle} cm` : "Girilmedi",
        ideal: `${idealSaddleHeight} cm`,
        status: currSaddle ? (Math.abs(currSaddle - idealSaddleHeight) <= 0.3 ? "optimal" : "warning") : "optimal",
        action: currSaddle ? (currSaddle > idealSaddleHeight ? `${(currSaddle - idealSaddleHeight).toFixed(1)} cm Alçalt` : `${(idealSaddleHeight - currSaddle).toFixed(1)} cm Yükselt`) : "Ölçü Girilmedi"
      },
      {
        parameter: "Gidon Boğazı",
        current: currStem ? `${currStem} mm` : "Girilmedi",
        ideal: `${idealStem} mm`,
        status: currStem ? (currStem === idealStem ? "optimal" : "warning") : "optimal",
        action: currStem ? (currStem > idealStem ? `${currStem - idealStem} mm Kısalt` : `${idealStem - currStem} mm Uzat`) : "Ölçü Girilmedi"
      },
      {
        parameter: "Gidon Genişliği",
        current: currBar ? `${currBar} cm` : "Girilmedi",
        ideal: `${idealBarWidth} cm`,
        status: currBar ? (currBar === idealBarWidth ? "optimal" : "warning") : "optimal",
        action: currBar ? (currBar > idealBarWidth ? `${currBar - idealBarWidth} cm Daralt` : `${idealBarWidth - currBar} cm Genişlet`) : "Ölçü Girilmedi"
      },
      {
        parameter: "Krank Kolu",
        current: currCrank ? `${currCrank} mm` : "Girilmedi",
        ideal: `${idealCrank} mm`,
        status: "optimal",
        action: currCrank && currCrank !== idealCrank ? "Değişim Değerlendirilebilir" : "Uyumlu"
      }
    ];

    return NextResponse.json({
      success: true,
      results: {
        saddleHeight: `${idealSaddleHeight} cm`,
        recommendedReach: `${idealReach} cm`,
        saddleSetback: `${idealSetback} cm`,
        recommendedBarWidth: `${idealBarWidth} cm`,
        recommendedStem: `${idealStem} mm`,
        recommendedCrank: `${idealCrank} mm`,
        comparisonTable
      }
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Sunucu hatası' }, { status: 500 });
  }
}