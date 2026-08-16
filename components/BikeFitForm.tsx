// components/BikeFitForm.tsx
'use client';

import React, { useState } from 'react';

export default function BikeFitForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  // API route'unun (fit-hesapla) beklediği değişken isimleriyle birebir uyumlu hale getirildi
  const [data, setData] = useState({
    height: '',
    inseam: '',
    torsoLength: '',
    armLength: '',
    shoulderWidth: '',
    currentSaddleHeight: '',
    currentBarWidth: '',
    currentStemLength: '',
    currentCrankLength: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    
    console.log("-> [FRONTEND] İSTEK BAŞLATILDI. Gönderilen Veri:", data);

    try {
      const res = await fetch('/api/fit-hesapla', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include', // <--- Çerezin sunucuya gitmesini sağlayan kritik parametre!
      });

      console.log("-> [FRONTEND] SUNUCU YANIT KODU (STATUS):", res.status);

      const resData = await res.json();
      console.log("-> [FRONTEND] SUNUCUDAN GELEN VERİ:", resData);
      
      if (res.ok && resData.success) {
        setResult(resData.results);
      } else {
        setResult(null);
        alert(`Hata (${res.status}): ` + (resData.error || 'İşlem başarısız. Lütfen tekrar giriş yapın.'));
      }
    } catch (err: any) {
      console.error("-> [FRONTEND] BAĞLANTI HATASI:", err);
      setResult(null);
      alert("Bağlantı hatası oluştu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Boy (cm)</label>
            <input 
              type="number" 
              name="height" 
              value={data.height} 
              onChange={handleChange} 
              required 
              placeholder="Örn: 178"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">İç Bacak Boyu (cm)</label>
            <input 
              type="number" 
              name="inseam" 
              value={data.inseam} 
              onChange={handleChange} 
              required 
              placeholder="Örn: 82"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Gövde Boyu (cm)</label>
            <input 
              type="number" 
              name="torsoLength" 
              value={data.torsoLength} 
              onChange={handleChange} 
              placeholder="Örn: 60"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Kol Boyu (cm)</label>
            <input 
              type="number" 
              name="armLength" 
              value={data.armLength} 
              onChange={handleChange} 
              placeholder="Örn: 65"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Omuz Genişliği (cm)</label>
            <input 
              type="number" 
              name="shoulderWidth" 
              value={data.shoulderWidth} 
              onChange={handleChange} 
              placeholder="Örn: 42"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Mevcut Sele Yüksekliği (cm)</label>
            <input 
              type="number" 
              step="0.1" 
              name="currentSaddleHeight" 
              value={data.currentSaddleHeight} 
              onChange={handleChange} 
              placeholder="Opsiyonel"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition shadow-lg disabled:opacity-50"
        >
          {loading ? 'Hesaplanıyor...' : 'Bike Fit Hesapla'}
        </button>
      </form>

      {/* Hesaplama Sonuç Alanı */}
        {result && (
        <div className="mt-8 border-t border-slate-800 pt-6 space-y-4">
          <h2 className="text-lg font-bold text-white">Ölçüm Sonuçlarınız</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-xs">İdeal Sele Yüksekliği</span>
              <span className="text-xl font-bold text-blue-400">{result.saddleHeight}</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-xs">Tavsiye Edilen Reach</span>
              <span className="text-xl font-bold text-blue-400">{result.recommendedReach}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}