// app/login/page.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        // Oturum verilerini localStorage'a kaydediyoruz
        localStorage.setItem('userId', data.userId);
        const nameToSave = data.name || data.userName || email.split('@')[0];
        localStorage.setItem('user', JSON.stringify({ name: nameToSave, id: data.userId }));

        // Çerezin tarayıcıya işlenmesi ve sunucunun oturumu tanıması için 
        // sayfayı tam yenileme (hard reload) ile yönlendiriyoruz:
        window.location.href = '/bikefit-yap';
      } else {
        setError(data.error || 'Giriş başarısız.');
      }
    } catch (err) {
      setError('Bir bağlantı hatası oluştu.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Giriş Yap</h1>
        
        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-posta Adresi</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900" 
              placeholder="ornek@mail.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900" 
              placeholder="••••••••" 
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
            Giriş Yap
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Hesabın yok mu? <Link href="/register" className="text-blue-600 font-medium hover:underline">Üye Ol</Link>
        </p>
      </div>
    </div>
  );
}