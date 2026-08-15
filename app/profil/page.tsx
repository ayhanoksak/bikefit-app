// app/profil/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilPage() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Tarayıcıdaki kayıtlı bilgileri alalım
    const userObj = localStorage.getItem('user');
    const userId = localStorage.getItem('userId');

    if (!userId && !userObj) {
      router.push('/login');
      return;
    }

    if (userObj) {
      try {
        const parsed = JSON.parse(userObj);
        if (parsed.name) setName(parsed.name);
        if (parsed.surname) setSurname(parsed.surname);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.phone) setPhone(parsed.phone);
      } catch (e) {
        // Hata durumunda yoksay
      }
    }
  }, [router]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Bilgileri güncelle ve localStorage'a kaydet
    const existingUser = localStorage.getItem('user');
    let userData = existingUser ? JSON.parse(existingUser) : {};
    
    userData.name = name;
    userData.surname = surname;
    userData.email = email;
    userData.phone = phone;

    localStorage.setItem('user', JSON.stringify(userData));
    // Navbar'ın ismi anında güncellemesi için olay tetikle
    window.dispatchEvent(new Event('storage'));

    setMessage('Profiliniz başarıyla güncellendi!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Ana Sayfaya Dön Butonu */}
        <div className="mb-4">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition"
          >
            ← Ana Sayfaya Dön
          </Link>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Profili Kişiselleştir</h1>

          {message && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-xl">
              {message}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adınız</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                placeholder="Adınızı girin"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Soyadınız</label>
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                placeholder="Soyadınızı girin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-posta Adresi</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                placeholder="ornek@mail.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon Numarası</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                placeholder="0532 XXX XX XX"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition mt-2"
            >
              Değişiklikleri Kaydet
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}