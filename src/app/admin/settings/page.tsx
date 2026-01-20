'use client';
import { useState, useEffect } from 'react';
import AdminNav from '@/components/admin/AdminNav';

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 lg:ml-64 pt-20 lg:pt-0">
        <div className="p-6 lg:p-8 text-white max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-white mb-2">Ustawienia</h1>
            <p className="text-zinc-400">Integracje, Social Media i Bezpieczeństwo</p>
          </div>
          
          <div className="space-y-8 pb-20">
            {/* SEKCJA 1: Integracje */}
            <section className="bg-zinc-900/40 border border-white/5 p-6 rounded-xl">
              <h2 className="text-xl font-medium mb-6 text-purple-400 flex items-center gap-2">
                 1. Integracje i Social Media
              </h2>
              <IntegrationsForm />
            </section>

            {/* SEKCJA 2: Polityka */}
            <section className="bg-zinc-900/40 border border-white/5 p-6 rounded-xl">
              <h2 className="text-xl font-medium mb-6 text-purple-400 flex items-center gap-2">
                 2. Polityka Prywatności
              </h2>
              <PrivacyEditor />
            </section>

            {/* SEKCJA 3: Bezpieczeństwo */}
            <div className="grid md:grid-cols-2 gap-6">
              <section className="bg-zinc-900/40 border border-white/5 p-6 rounded-xl">
                <h2 className="text-lg font-medium mb-4 text-green-400">Dodaj Administratora</h2>
                <AddUserForm />
              </section>
              <section className="bg-zinc-900/40 border border-white/5 p-6 rounded-xl">
                <h2 className="text-lg font-medium mb-4 text-blue-400">Zmień Hasło</h2>
                <ChangePasswordForm />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- FORMULARZ 1: INTEGRACJE (SMART PASTE) ---
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

    useEffect(() => {
        fetch('/api/admin/settings')
            .then(res => res.json())
            .then(data => {
                if(data && !data.error) setSettings(prev => ({...prev, ...data}));
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // FUNKCJA MAGICZNA: Wyciąga ID z wklejonego kodu
    const extractId = (input: string, type: 'GA' | 'PIXEL') => {
        if (!input) return '';
        // Jeśli to już wygląda jak ID (krótkie), zostaw bez zmian
        if (input.length < 30 && !input.includes('<script')) return input;

        if (type === 'GA') {
            // Szukamy wzorca G-XXXXXXXXXX
            const match = input.match(/G-[A-Z0-9]+/);
            return match ? match[0] : input;
        }
        return input;
    };

    const handleSave = async () => {
        // Przed zapisem "czyścimy" dane
        const cleanSettings = {
            ...settings,
            google_analytics_id: extractId(settings.google_analytics_id, 'GA'),
        };

        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cleanSettings),
            });
            
            if (res.ok) {
                alert('Zapisano! (Kod został automatycznie sformatowany)');
                // Aktualizujemy widok na czyste ID
                setSettings(cleanSettings);
            } else {
                alert('Błąd zapisu.');
            }
        } catch (error) {
            alert('Błąd połączenia.');
        }
    };

    if (loading) return <p className="text-zinc-500">Ładowanie...</p>;

    return (
        <div className="grid md:grid-cols-2 gap-8">
            {/* Lewa kolumna */}
            <div className="space-y-4">
                <h3 className="font-medium text-white mb-4 border-b border-white/10 pb-2">Analityka i SEO</h3>
                
                {/* GOOGLE ANALYTICS - Duże pole na wklejenie wszystkiego */}
                <div>
                    <label className="block text-sm text-zinc-400 mb-1">Google Analytics 4</label>
                    <textarea 
                        rows={3}
                        placeholder="Wklej tutaj CAŁY kod skopiowany z Google Analytics..." 
                        className="w-full bg-black/40 border border-zinc-700 rounded p-2.5 text-white focus:border-purple-500 outline-none placeholder-zinc-600 text-xs font-mono" 
                        value={settings.google_analytics_id}
                        onChange={e => setSettings({...settings, google_analytics_id: e.target.value})}
                    />
                    <p className="text-xs text-zinc-500 mt-1">Możesz wkleić cały skrypt - system sam wyciągnie ID (np. G-NRJMBR02NE).</p>
                </div>

                <div>
                    <label className="block text-sm text-zinc-400 mb-1">Google Search Console</label>
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
                        value={settings.facebook_pixel_id}
                        onChange={e => setSettings({...settings, facebook_pixel_id: e.target.value})}
                    />
                </div>
            </div>

            {/* Prawa kolumna */}
            <div className="space-y-4">
                <h3 className="font-medium text-white mb-4 border-b border-white/10 pb-2">Social Media & Kontakt</h3>
                <div>
                    <label className="block text-sm text-zinc-400 mb-1">Facebook (Link)</label>
                    <input type="text" placeholder="https://facebook.com/..." className="w-full bg-black/40 border border-zinc-700 rounded p-2.5 text-white focus:border-blue-500 outline-none" 
                        value={settings.social_facebook}
                        onChange={e => setSettings({...settings, social_facebook: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm text-zinc-400 mb-1">Instagram (Link)</label>
                    <input type="text" placeholder="https://instagram.com/..." className="w-full bg-black/40 border border-zinc-700 rounded p-2.5 text-white focus:border-pink-500 outline-none" 
                        value={settings.social_instagram}
                        onChange={e => setSettings({...settings, social_instagram: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm text-zinc-400 mb-1">WhatsApp (Link)</label>
                    <input type="text" placeholder="https://wa.me/..." className="w-full bg-black/40 border border-zinc-700 rounded p-2.5 text-white focus:border-green-500 outline-none" 
                        value={settings.contact_whatsapp}
                        onChange={e => setSettings({...settings, contact_whatsapp: e.target.value})}
                    />
                </div>
            </div>

            <div className="md:col-span-2 mt-4">
                <button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition-colors font-medium">
                    Zapisz Integracje
                </button>
            </div>
        </div>
    );
}

// --- POZOSTAŁE KOMPONENTY BEZ ZMIAN (PrivacyEditor, AddUserForm, ChangePasswordForm) ---
function PrivacyEditor() {
  const [content, setContent] = useState('');
  useEffect(() => { fetch('/api/admin/privacy').then(r => r.json()).then(d => setContent(d.content || '')); }, []);
  const handleSave = async () => { await fetch('/api/admin/privacy', { method: 'PUT', body: JSON.stringify({ content }) }); alert('Zapisano!'); };
  return (
    <div>
      <div className="flex justify-between items-center mb-4"><p className="text-sm text-zinc-400">Kod HTML:</p><a href="/polityka-prywatnosci" target="_blank" className="text-purple-400 text-sm">Podgląd ↗</a></div>
      <textarea className="w-full h-80 p-4 border border-zinc-700 rounded-xl bg-black/40 font-mono text-sm text-zinc-300 focus:ring-2 focus:ring-purple-500 outline-none" value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleSave} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors font-medium">Aktualizuj</button>
    </div>
  );
}

function AddUserForm() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); const res = await fetch('/api/admin/users', { method: 'POST', body: JSON.stringify(formData) }); if (res.ok) { alert('Dodano!'); setFormData({ name: '', email: '', password: '' }); } else alert('Błąd'); };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Imię" required className="w-full bg-black/40 border border-zinc-700 rounded p-2.5 text-white focus:border-green-500 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
      <input type="email" placeholder="Email" required className="w-full bg-black/40 border border-zinc-700 rounded p-2.5 text-white focus:border-green-500 outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
      <input type="password" placeholder="Hasło" required className="w-full bg-black/40 border border-zinc-700 rounded p-2.5 text-white focus:border-green-500 outline-none" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
      <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium">Dodaj</button>
    </form>
  );
}

function ChangePasswordForm() {
  const [data, setData] = useState({ email: '', newPassword: '' });
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); const res = await fetch('/api/admin/users', { method: 'POST', body: JSON.stringify({ email: data.email, newPassword: data.newPassword, currentPassword: 'dummy' }) }); if (res.ok) { alert('Zmieniono!'); setData({ email: '', newPassword: '' }); } else alert('Błąd'); };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="email" placeholder="Email użytkownika" required className="w-full bg-black/40 border border-zinc-700 rounded p-2.5 text-white focus:border-blue-500 outline-none" value={data.email} onChange={e => setData({...data, email: e.target.value})} />
      <input type="password" placeholder="Nowe Hasło" required className="w-full bg-black/40 border border-zinc-700 rounded p-2.5 text-white focus:border-blue-500 outline-none" value={data.newPassword} onChange={e => setData({...data, newPassword: e.target.value})} />
      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">Zmień</button>
    </form>
  );
}
