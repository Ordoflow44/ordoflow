'use client';
import { useState, useEffect } from 'react';
import AdminNav from '@/components/admin/AdminNav';

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen">
      {/* 1. Sidebar po lewej */}
      <AdminNav />

      {/* 2. Główna treść przesunięta w prawo */}
      <main className="flex-1 lg:ml-64 pt-20 lg:pt-0">
        <div className="p-6 lg:p-8 text-white max-w-6xl">
          
          {/* Nagłówek */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-white mb-2">Ustawienia</h1>
            <p className="text-zinc-400">Integracje, Social Media i Bezpieczeństwo</p>
          </div>
          
          {/* Kontener pionowy */}
          <div className="space-y-8 pb-20">
            
            {/* SEKCJA 1: Integracje i Social Media */}
            <section className="bg-zinc-900/40 border border-white/5 p-6 rounded-xl">
              <h2 className="text-xl font-medium mb-6 text-purple-400 flex items-center gap-2">
                 1. Integracje i Social Media
              </h2>
              <IntegrationsForm />
            </section>

            {/* SEKCJA 2: Polityka Prywatności */}
            <section className="bg-zinc-900/40 border border-white/5 p-6 rounded-xl">
              <h2 className="text-xl font-medium mb-6 text-purple-400 flex items-center gap-2">
                 2. Polityka Prywatności
              </h2>
              <PrivacyEditor />
            </section>

            {/* SEKCJA 3: Bezpieczeństwo */}
            <div className="grid md:grid-cols-2 gap-6">
              <section className="bg-zinc-900/40 border border-white/5 p-6 rounded-xl">
                <h2 className="text-lg font-medium mb-4 text-green-400">
                  Dodaj Administratora
                </h2>
                <AddUserForm />
              </section>

              <section className="bg-zinc-900/40 border border-white/5 p-6 rounded-xl">
                <h2 className="text-lg font-medium mb-4 text-blue-400">
                  Zmień Hasło
                </h2>
                <ChangePasswordForm />
              </section>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// --- FORMULARZ 1: INTEGRACJE + SOCIAL MEDIA (Z Logiką zapisu) ---
function IntegrationsForm() {
    const [settings, setSettings] = useState({
        google_analytics_id: '',
        google_search_console: '',
        facebook_pixel_id: '',
        social_facebook: '',
        social_instagram: '',
        contact_whatsapp: ''
    });
    const [loading, setLoading] = useState(true);

    // Pobierz zapisane dane przy wejściu na stronę
    useEffect(() => {
        fetch('/api/admin/settings')
            .then(res => res.json())
            .then(data => {
                if(data && !data.error) setSettings(prev => ({...prev, ...data}));
                setLoading(false);
            })
            .catch(err => {
                console.error("Błąd pobierania ustawień:", err);
                setLoading(false);
            });
    }, []);

    // Zapisz dane do bazy
    const handleSave = async () => {
        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });
            if (res.ok) alert('Ustawienia zapisane pomyślnie!');
            else alert('Wystąpił błąd podczas zapisu.');
        } catch (error) {
            alert('Błąd połączenia z serwerem.');
        }
    };

    if (loading) return <p className="text-zinc-500">Ładowanie ustawień...</p>;

    return (
        <div className="grid md:grid-cols-2 gap-8">
            {/* Lewa kolumna: Analityka */}
            <div className="space-y-4">
                <h3 className="font-medium text-white mb-4 border-b border-white/10 pb-2">Analityka i SEO</h3>
                <div>
                    <label className="block text-sm text-zinc-400 mb-1">Google Analytics 4 (ID)</label>
                    <input 
                        type="text" 
                        placeholder="np. G-NRJMBR02NE" 
                        className="w-full bg-black/40 border border-zinc-700 rounded p-2.5 text-white focus:border-purple-500 outline-none placeholder-zinc-600" 
                        value={settings.google_analytics_id}
                        onChange={e => setSettings({...settings, google_analytics_id: e.target.value})}
                    />
                    <p className="text-xs text-zinc-500 mt-1">Wpisz tylko identyfikator (np. G-XXXXXX)</p>
                </div>
                <div>
                    <label className="block text-sm text-zinc-400 mb-1">Google Search Console (Kod HTML)</label>
                    <input 
                        type="text" 
                        placeholder='content="..."' 
                        className="w-full bg-black/40 border border-zinc-700 rounded p-2.5 text-white focus:border-purple-500 outline-none placeholder-zinc-600" 
                        value={settings.google_search_console}
                        onChange={e => setSettings({...settings, google_search_console: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm text-zinc-400 mb-1">Pixel / Hotjar (ID)</label>
                    <input 
                        type="text" 
                        placeholder="ID..." 
                        className="w-full bg-black/40 border border-zinc-700 rounded p-2.5 text-white focus:border-purple-500 outline-none placeholder-zinc-600" 
                        value={settings.facebook_pixel_id} // Używam pola facebook_pixel_id jako ogólnego lub dodaj nowe w bazie
                        onChange={e => setSettings({...settings, facebook_pixel_id: e.target.value})}
                    />
                </div>
            </div>

            {/* Prawa kolumna: Social Media */}
            <div className="space-y-4">
                <h3 className="font-medium text-white mb-4 border-b border-white/10 pb-2">Social Media & Kontakt</h3>
                <div>
                    <label className="block text-sm text-zinc-400 mb-1">Facebook (Link)</label>
                    <input 
                        type="text" 
                        placeholder="https://facebook.com/twoja-strona" 
                        className="w-full bg-black/40 border border-zinc-700 rounded p-2.5 text-white focus:border-blue-500 outline-none placeholder-zinc-600" 
                        value={settings.social_facebook}
                        onChange={e => setSettings({...settings, social_facebook: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm text-zinc-400 mb-1">Instagram (Link)</label>
                    <input 
                        type="text" 
                        placeholder="https://instagram.com/twoj-profil" 
                        className="w-full bg-black/40 border border-zinc-700 rounded p-2.5 text-white focus:border-pink-500 outline-none placeholder-zinc-600" 
                        value={settings.social_instagram}
                        onChange={e => setSettings({...settings, social_instagram: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm text-zinc-400 mb-1">WhatsApp / Bot (Link)</label>
                    <input 
                        type="text" 
                        placeholder="https://wa.me/48XXXXXXXXX" 
                        className="w-full bg-black/40 border border-zinc-700 rounded p-2.5 text-white focus:border-green-500 outline-none placeholder-zinc-600" 
                        value={settings.contact_whatsapp}
                        onChange={e => setSettings({...settings, contact_whatsapp: e.target.value})}
                    />
                </div>
            </div>

            <div className="md:col-span-2 mt-4">
                <button 
                    onClick={handleSave}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition-colors font-medium"
                >
                    Zapisz Integracje
                </button>
            </div>
        </div>
    );
}

// --- FORMULARZ 2: POLITYKA (Bez zmian, działa poprawnie) ---
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
    alert('Polityka zapisana!');
  };

  if (loading) return <p className="text-zinc-500">Ładowanie treści...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-zinc-400">Wklej kod HTML:</p>
          <a href="/polityka-prywatnosci" target="_blank" className="text-purple-400 text-sm hover:underline">Podgląd na żywo ↗</a>
      </div>
      <textarea 
        className="w-full h-80 p-4 border border-zinc-700 rounded-xl bg-black/40 font-mono text-sm text-zinc-300 focus:ring-2 focus:ring-purple-500 outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSave} className="mt-4
