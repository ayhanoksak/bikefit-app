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
        // Hata durumunda sonuçları kesinlikle null yapıyoruz ki hesaplama gösterilmesin
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