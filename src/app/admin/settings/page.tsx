'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Nagłówek */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold">Ustawienia</h1>
            <p className="text-gray-400 mt-2">Wszystkie konfiguracje w jednym miejscu</p>
          </div>
          <Link href="/admin/dashboard" className="text-purple-400 hover:text-purple-300 transition-colors">
            ← Wróć do Dashboardu
          </Link>
        </div>
        
        {/* Kontener pionowy (Vertical Stack) */}
        <div className="space-y-12 pb-20">
          
          {/* SEKCJA 1: Integracje */}
          <section id="integrations" className="bg-gray-900/50 border border-gray-800 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-purple-400 flex items-center gap-2">
              1. Integracje i SEO
            </h2>
            <IntegrationsForm />
          </section>

          {/* SEKCJA 2: Polityka Prywatności */}
          <section id="privacy" className="bg-gray-900/50 border border-gray-800 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-purple-400 flex items-center gap-2">
              2. Polityka Prywatności
            </h2>
            <PrivacyEditor />
          </section>

          {/* SEKCJA 3: Bezpieczeństwo i Dostęp (Grid dla mniejszych kart) */}
          <div className="grid md:grid-cols-2 gap-8">
            <section id="users" className="bg-gray-900/50 border border-gray-800 p-8 rounded-2xl">
              <h2 className="text-xl font-bold mb-6 text-green-400">
                Dodaj Administratora
              </h2>
              <AddUserForm />
            </section>

            <section id="password" className="bg-gray-900/50 border border-gray-800 p-8 rounded-2xl">
              <h2 className="text-xl font-bold mb-6 text-blue-400">
                Zmień Hasło
              </h2>
              <ChangePasswordForm />
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- KOMPONENTY (Formularze) ---

function IntegrationsForm() {
    return (
        <div className="space-y-6">
            <div className="grid gap-6">
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Google Analytics 4 (ID Pomiaru)</label>
                    <input type="text" placeholder="G-XXXXXXXXXX" className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-purple-500 outline-none" />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Google Search Console (Tag HTML)</label>
                    <input type="text" placeholder='content="kod-weryfikacyjny"' className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-purple-500 outline-none" />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Inne skrypty (Hotjar, Pixel)</label>
                    <input type="text" placeholder="ID konta..." className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-purple-500 outline-none" />
                </div>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors font-medium">
                Zapisz Integracje
            </button>
        </div>
    )
}

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
        className="w-full h-96 p-4 border border-gray-700 rounded-xl bg-black/50 font-mono text-sm text-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSave} className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors font-medium">
        Aktualizuj Politykę
      </button>
    </div>
  );
}

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
      <input type="text" placeholder="Imię" required className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-green-500 outline-none"
        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
      <input type="email" placeholder="Email" required className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-green-500 outline-none"
        value={formData.email} onChange={e => setFormData({...formData, email:
