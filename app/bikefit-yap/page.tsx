import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import BikeFitForm from '@/components/BikeFitForm';

export default async function BikeFitYapPage() {
  // 1. Çerezlerden kullanıcı ID'sini alıyoruz
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  if (!userId) {
    redirect('/login');
  }

  // 2. Veritabanından kullanıcının e-posta doğrulama durumunu kontrol ediyoruz
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || !user.isVerified) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 max-w-md w-full text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              ⚠️
            </div>
            <h1 className="text-xl font-bold text-white">E-posta Doğrulaması Gerekiyor</h1>
            <p className="text-sm text-slate-400">
              Fit ayarı araçlarını kullanabilmek ve hesap güvenliğiniz için lütfen e-postanıza gönderilen doğrulama bağlantısına tıklayın.
            </p>
            <a 
              href="/login" 
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition text-sm"
            >
              Giriş Sayfasına Dön
            </a>
          </div>
        </div>
      </main>
    );
  }

  // 3. Her şey onaylıysa sayfa yüklenir
  return (
    <main className="min-h-screen bg-slate-950 pb-12 text-slate-100">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">3. Ölçüm ve Geometri Raporu</h1>
          <button onClick={() => {}} className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition shadow-sm">
            <span>📄 PDF / Yazdır</span>
          </button>
        </div>

        <BikeFitForm />
      </div>
    </main>
  );
}