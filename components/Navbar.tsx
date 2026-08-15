// components/Navbar.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Profilim');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Kullanıcının oturum açıp açmadığını ve adını kontrol edelim
  const checkAuth = () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token') || localStorage.getItem('user') || localStorage.getItem('bikefit_user');
    
    if (userId || token) {
      setIsLoggedIn(true);
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsed = JSON.parse(userData);
          if (parsed.name) setUserName(parsed.name);
        } else if (userId) {
          setUserName('Kullanıcı');
        }
      } catch (e) {
        setUserName('Profilim');
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
    // Giriş anında veya sekme değişimlerinde navbar'ın anında güncellenmesi için dinleyici
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('bikefit_user');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setDropdownOpen(false);
    window.dispatchEvent(new Event('storage'));
    window.location.href = '/login'; // Çıkış yapınca giriş sayfasına yönlendir
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="space-y-1.5 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition"
          aria-label="Menüyü Aç"
        >
          <div className="w-6 h-0.5 bg-gray-800"></div>
          <div className="w-6 h-0.5 bg-gray-800"></div>
          <div className="w-6 h-0.5 bg-gray-800"></div>
        </button>

        <Link href="/" className="font-bold text-xl text-blue-600 tracking-wide">
          BIKEFIT TR
        </Link>

        {/* Sağ Üst Butonlar ve Profil Menüsü (Dinamik) */}
        <div className="flex gap-3 items-center relative">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-xl transition text-sm font-medium text-gray-800 shadow-xs"
              >
                <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center font-bold text-xs text-white">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline">{userName}</span>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 z-50 text-sm">
                  <div className="px-4 py-2 border-b border-gray-100 mb-1">
                    <span className="text-[10px] text-gray-400 uppercase font-semibold block">OTURUM AÇIK</span>
                    <span className="text-gray-900 font-bold truncate block">{userName}</span>
                  </div>
                  
                  <Link
                    href="/profil"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition"
                  >
                    <span>⚙️</span> Profili Kişiselleştir
                  </Link>
                  
                  <Link
                    href="/ozet"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition"
                  >
                    <span>📊</span> Ölçüm Raporlarım
                  </Link>

                  <div className="border-t border-gray-100 my-1"></div>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 transition font-medium"
                  >
                    <span>🚪</span> Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition">
                Giriş Yap
              </Link>
              <Link href="/register" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
                Üye Ol
              </Link>
            </>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t shadow-lg py-4 px-6 flex flex-col gap-4">
          <Link href="/bikefit-yap" onClick={() => setIsOpen(false)} className="text-gray-900 font-medium hover:text-blue-600 transition"> 🚴 Bike Fit Yap</Link>
          <Link href="/cleat-ayari" onClick={() => setIsOpen(false)} className="text-gray-900 font-medium hover:text-blue-600 transition"> ⚙️ Cleat (Kal) Ayarı Nasıl Yapılır?</Link>
          <Link href="/ozet" onClick={() => setIsOpen(false)} className="text-gray-900 font-medium hover:text-blue-600 transition"> 📊 Bike Fit Özetim (Eski Ölçümler)</Link>
          <Link href="/indir" onClick={() => setIsOpen(false)} className="text-gray-900 font-medium hover:text-blue-600 transition"> 📱 Uygulamayı İndir</Link>
        </div>
      )}
    </nav>
  );
}