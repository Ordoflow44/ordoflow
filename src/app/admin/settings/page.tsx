'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  return (
    // ZMIANA: Usunąłem "min-h-screen" i tło, teraz dopasuje się do layoutu panelu
    <div className="text-white max-w-5xl">
      
      {/* Nagłówek */}
      <div className="flex justify-between items-end mb-8 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold">Ustawienia</h1>
          <p className="text-gray-400 mt-1">Integracje, Social Media i Bezpieczeństwo</p>
        </div>
      </div>
      
      {/* Kontener pionowy (Wszystko w jednej kolumnie) */}
      <div className="space-y-10 pb-20">
        
        {/* SEKCJA 1: Integracje i Social Media */}
        <section className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6 text-purple-400 flex items-center gap-2">
             1. Integracje i Social Media
          </h2>
          <IntegrationsForm />
        </section>

        {/* SEKCJA 2: Polityka Prywatności */}
        <section className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6 text-purple-400 flex items-center gap-2">
             2. Polityka Prywatności
          </h2>
          <PrivacyEditor />
        </section>

        {/* SEKCJA 3: Bezpieczeństwo (Dwa kafelki obok siebie) */}
        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4 text-green-400">
              Dodaj Administratora
            </h2>
            <AddUserForm />
          </section>

          <section className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4 text-blue-400">
              Zmień Hasło
            </h2>
            <ChangePasswordForm />
          </section>
        </div>

      </div>
    </div>
  );
}

// --- FORMULARZ 1: INTEGRACJE + SOCIAL MEDIA ---
function IntegrationsForm() {
    return (
        <div className="grid md:grid-cols-2 gap-8">
            {/* Lewa kolumna: Analityka */}
            <div className="space-y-4">
                <h3 className="font-bold text-white mb-4 border-b border-gray-700 pb-2">Analityka i SEO</h3>
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Google Analytics 4 (ID)</label>
                    <input type="text" placeholder="G-XXXXXXXXXX" className="w-full bg-black/40 border border-gray-700 rounded p-2.5 text-white focus:border-purple-500 outline-none" />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Google Search Console (Kod HTML)</label>
                    <input type="text" placeholder='content="..."' className="w-full bg-black/40 border border-gray-700 rounded p-2.5 text-white focus:border-purple-500 outline-none" />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Pixel / Hotjar (ID)</label>
                    <input type="text" placeholder="ID..." className="w-full bg-black/40 border border-gray-700 rounded p-2.5 text-white focus:border-purple-500 outline-none" />
                </div>
            </div>

            {/* Prawa kolumna: Social Media (NOWE) */}
            <div className="space-y-4">
                <h3 className="font-bold text-white mb-4 border-b border-gray-700 pb-2">Social Media & Kontakt</h3>
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Facebook (Link)</label>
                    <input type="text" placeholder="https://facebook.com/twoja-strona" className="w-full bg-black/40 border border-gray-700 rounded p-2.5 text-white focus:border-blue-500 outline-none" />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Instagram (Link)</label>
                    <input type="text" placeholder="https://instagram.com/twoj-profil" className="w-full bg-black/40 border border-gray-700 rounded p-2.5 text-white focus:border-pink-500 outline-none" />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-1">WhatsApp / Bot (Link)</label>
                    <input type="text" placeholder="https://wa.me/48XXXXXXXXX" className="w-full bg-black/40 border border-gray-700 rounded p-2.5 text-white focus:border-green-500 outline-none" />
                </div>
            </div>

            <div className="md:col-span-2 mt-4">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition-colors font-medium">
                    Zapisz Integracje
                </button>
            </div>
        </div>
    );
}

// --- FORMULARZ 2: POLITYKA ---
function PrivacyEditor() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/privacy').then(res => res.json()).then(data => {
      setContent(data.content || '');
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    await fetch('/api/admin/privacy', {
      method: 'PUT',
      body: JSON.stringify({ content }),
    });
    alert('Zapisano zmiany!');
  };

  if (loading) return <p className="text-gray-400">Ładowanie treści...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-400">Wklej kod HTML:</p>
          <a href="/polityka-prywatnosci" target="_blank" className="text-purple-400 text-sm hover:underline">Podgląd na żywo ↗</a>
      </div>
      <textarea 
        className="w-full h-80 p-4 border border-gray-700 rounded-xl bg-black/40 font-mono text-sm text-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSave} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors font-medium">
        Aktualizuj Politykę
      </button>
    </div>
  );
}

// --- FORMULARZ 3: DODAWANIE USERA ---
function AddUserForm() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert('Użytkownik dodany!');
      setFormData({ name: '', email: '', password: '' });
    } else {
      alert('Błąd dodawania użytkownika');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Imię" required className="w-full bg-black/40 border border-gray-700 rounded p-2.5 text-white focus:border-green-500 outline-none"
        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
      <input type="email" placeholder="Email" required className="w-full bg-black/40 border border-gray-700 rounded p-2.5 text-white focus:border-green-500 outline-none"
        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
      <input type="password" placeholder="Hasło" required className="w-full bg-black/40 border border-gray-700 rounded p-2.5 text-white focus:border-green-500 outline-none"
        value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
      <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">Dodaj</button>
    </form>
  );
}

// --- FORMULARZ 4: ZMIANA HASŁA ---
function ChangePasswordForm() {
  const [data, setData] = useState({ email: '', newPassword: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      body: JSON.stringify({ email: data.email, newPassword: data.newPassword, currentPassword: 'dummy' }),
    });
    if (res.ok) {
      alert('Hasło zmienione!');
      setData({ email: '', newPassword: '' });
    } else {
      alert('Błąd zmiany hasła');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="email" placeholder="Email użytkownika" required className="w-full bg-black/40 border border-gray-700 rounded p-2.5 text-white focus:border-blue-500 outline-none"
        value={data.email} onChange={e => setData({...data, email: e.target.value})} />
      <input type="password" placeholder="Nowe Hasło" required className="w-full bg-black/40 border border-gray-700 rounded p-2.5 text-white focus:border-blue-500 outline-none"
        value={data.newPassword} onChange={e => setData({...data, newPassword: e.target.value})} />
      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">Zmień</button>
    </form>
  );
}
