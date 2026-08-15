// app/ozet/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function SummaryPage() {
  const [fits, setFits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setLoading(false);
      return;
    }

    fetch(`/api/fit-gecmis?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFits(data.fits);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Bike Fit Özetlerim</h1>
        <p className="text-gray-600 mb-8">Geçmişte yaptığınız analiz sonuçlarını ve ölçümlerinizi aşağıda inceleyebilirsiniz.</p>

        {loading ? (
          <p className="text-gray-500">Yükleniyor...</p>
        ) : fits.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
            <p className="text-gray-600 mb-4">Henüz kayıtlı bir analiziniz bulunmuyor.</p>
            <Link href="/bikefit-yap" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
              Hemen Analiz Yap
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {fits.map((fit) => (
              <div key={fit.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="text-xs font-semibold bg-blue-100 text-blue-600 px-3 py-1 rounded-full">{fit.bikeType}</span>
                  <h3 className="text-lg font-bold text-gray-800 mt-2">Tarih: {new Date(fit.date).toLocaleDateString('tr-TR')}</h3>
                  <p className="text-sm text-gray-500">Sele Yüksekliği: {fit.saddleHeight} • Boy: {fit.height} cm • İç Bacak: {fit.inseam} cm</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}