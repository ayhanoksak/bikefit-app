// app/indir/page.tsx
import Navbar from '@/components/Navbar';

export default function IndirPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Mobil Uygulamamızı İndirin</h1>
        <p className="text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed">
          Telefonunuzun kamerasını kullanarak anlık dinamik bike fit analizi yapmak, açılarınızı takip etmek ve verilerinizi cebinizde taşımak için uygulamamızı indirin.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#appstore" className="bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition shadow-md flex items-center justify-center gap-3">
            <span>🍏 App Store'dan İndir</span>
          </a>
          <a href="#googleplay" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md flex items-center justify-center gap-3">
            <span>🤖 Google Play'den İndir</span>
          </a>
        </div>
      </div>
    </main>
  );
}