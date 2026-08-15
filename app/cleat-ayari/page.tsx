// app/cleat-ayari/page.tsx
import Navbar from '@/components/Navbar';

export default function CleatAyariPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Cleat (Kal) Ayarı Nasıl Yapılır?</h1>
        <p className="text-gray-600 mb-8">
          Doğru kal ayarı; diz ağrılarını önlemek, verimliliği artırmak ve ayağın pedal üzerindeki stabilitesini sağlamak için kritik öneme sahiptir.
        </p>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-3">1. Öne ve Arkaya Konumlandırma (Fore-Aft)</h2>
            <p className="text-gray-600 leading-relaxed">
              Ayakkabının tabanındaki kal, genellikle ayağın birinci tarak kemiği başı (metatarsal başı) ile beşinci tarak kemiği başının tam ortasına (veya baş parmak ekleminin hizasına) denk gelecek şekilde ayarlanmalıdır. Bu, kuvvet aktarımını optimize eder.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-3">2. Açı ve Rotasyon Ayarı</h2>
            <p className="text-gray-600 leading-relaxed">
              Ayakların doğal basış açısı (topukların içe veya dışa dönüklüğü) göz önünde bulundurulmalıdır. Kalı ayağın doğal açısına paralel sabitlemek, diz eklemine binen dönme stresi yükünü (torsion) ortadan kaldırır.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-3">3. Genişlik (Stance Width)</h2>
            <p className="text-gray-600 leading-relaxed">
              Pedal miline olan mesafe, kalçanın doğal genişliğine uyumlu olmalıdır. Çok dar ya da çok geniş duruşlar kalça ve diz bağlarında zorlanmalara yol açabilir.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}