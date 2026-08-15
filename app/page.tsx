// app/page.tsx
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-4xl mx-auto px-4 py-12 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Bisikletinizle <span className="text-blue-600">Bütünleşin</span>
        </h1>
        
        <div className="w-72 h-72 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-full flex items-center justify-center mb-10 shadow-inner">
           <span className="text-6xl">🚴‍♂️</span>
        </div>

        <div className="w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Bike Fit Nedir & Amacımız Nedir?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            **Bike fit**, bisikletinizi anatomik ve biyomekanik özelliklerinize göre kusursuz bir şekilde optimize etme sürecidir.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Amacımız; sürüş esnasındaki konforunuzu en üst düzeye çıkarmak, yanlış duruştan kaynaklanan sakatlıkları önlemek ve pedallara uyguladığınız gücü kayıpsız bir şekilde yola aktarmanızı sağlamaktır.
          </p>
        </div>

        <Link href="/bikefit-yap" className="w-full max-w-md bg-blue-600 text-white font-semibold py-4 rounded-xl shadow-md hover:bg-blue-700 transition text-center">
          Hemen Bike Fit Analizine Başla
        </Link>
      </div>
    </main>
  );
}