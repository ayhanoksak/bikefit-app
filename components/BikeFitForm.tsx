'use client';

import React, { useState } from 'react'; // useState import edildiğinden emin ol

export default function BikeFitForm() {
  // Eksik olan state tanımlamalarını buraya ekliyoruz:
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [data, setData] = useState({
    // Form girdilerinin tutulduğu alan (boy, iç bacak boyu vb. burada yer almalı)
    boy: '',
    icBacak: '',
    govde: '',
    kol: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Geriye dönük eski sonuçların ekranda kalmasını engellemek için önce sıfırlıyoruz
    setResult(null);
    
    console.log("-> [FRONTEND] İSTEK BAŞLATILDI. Gönderilen Veri:", data);

    try {
      const res = await fetch('/api/fit-hesapla', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      console.log("-> [FRONTEND] SUNUCU YANIT KODU (STATUS):", res.status);

      const resData = await res.json();
      console.log("-> [FRONTEND] SUNUCUDAN GELEN VERİ:", resData);
      
      if (res.ok && resData.success) {
        setResult(resData.results);
      } else {
        setResult(null);
        alert(`Hata (${res.status}): ` + (resData.error || 'İşlem başarısız. Lütfen giriş yapın.'));
      }
    } catch (err: any) {
      console.error("-> [FRONTEND] BAGLANTI HATASI:", err);
      setResult(null);
      alert("Bağlantı hatası oluştu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form inputları ve arayüz elemanları burada yer alacak */}
    </form>
  );
}