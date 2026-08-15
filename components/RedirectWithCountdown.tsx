'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectWithCountdown({ targetUrl }: { targetUrl: string }) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const redirectTimer = setTimeout(() => {
      router.push(targetUrl);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [router, targetUrl]);

  return (
    <div className="space-y-4">
      <div className="text-blue-400 font-semibold text-sm">
        {countdown} saniye içinde yönlendirileceksiniz...
      </div>
      <a
        href={targetUrl}
        className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition text-sm"
      >
        Hemen Giriş Yap
      </a>
    </div>
  );
}