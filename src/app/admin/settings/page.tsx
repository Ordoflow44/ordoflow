'use client';

import { useState, useEffect } from 'react';
import AdminNav from '@/components/admin/AdminNav';

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-black">
      <AdminNav />
      <main className="flex-1 lg:ml-64 pt-20 lg:pt-0">
        <div className="p-6 lg:p-8 text-white max-w-6xl">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Ustawienia Systemowe</h1>
            <p className="text-zinc-400">Zarządzaj integracjami i treściami strony</p>
          </div>
          
          <div className="space-y-12 pb-20">
            {/* SEKCJA 1: GOOGLE I SOCIAL MEDIA */}
            <section className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-xl">
              <h2 className="text-xl font-semibold mb-6 text-purple-400">
                1. Integracje (Google Analytics, Pixele, Sociale)
              </h2>
              <IntegrationsForm />
            </section>

            {/* SEKCJA 2: TREŚĆ PRAWNA */}
            <section className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-xl">
              <h2 className="text-xl font-semibold mb-6 text-purple-400">
                2. Polityka Prywatności (HTML)
              </h2>
              <PrivacyEditor />
            </section>

            {/* SEKCJA 3: ADMINISTRACJA */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-xl">
                <h2 className="text-lg font-semibold mb-4 text-green-400">Dodaj Administratora</h2>
                <AddUserForm />
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-xl">
                <h2 className="text-lg font-semibold mb-4 text-blue-400">Zmień Hasło</h2>
                <ChangePasswordForm />
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// --- KOMPONENT: INTEGRACJE ---
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
    async function loadSettings() {
      try {
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (data && !data.error) {
          setSettings(prev => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error("Błąd ładowania ustawień:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) alert('Sukces! Zapisano surowy kod.');
      else alert('Wystąpił błąd podczas zapisu.');
    } catch (err) {
      alert('Błąd połączenia z serwerem.');
    }
  };

  if (loading) return <div className="text-zinc-500 animate-pulse">Ładowanie formularza...</div>;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Google Analytics (Wklej cały kod)</label>
          <textarea
            rows={8}
            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white font-mono text-xs focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="<script>...</script>"
            value={settings.google_analytics_id}
            onChange={e => setSettings({ ...settings, google_analytics_id: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Google Search Console (Tag Meta)</label>
          <input
            type="text"
            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
            value={settings.google_search_console}
            onChange={e => setSettings({ ...settings, google_search_console: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Facebook URL</label>
          <input
            type="text"
            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            value={settings.social_facebook}
            onChange={e => setSettings({ ...settings, social_facebook: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Instagram URL</label>
          <input
            type="text"
            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-pink-500 outline-none"
            value={settings.social_instagram}
            onChange={e => setSettings({ ...settings, social_instagram: e.target.value })}
          />
        </div>
      </div>

      <div className="md:col-span-2 border-t border-zinc-800 pt-6">
        <button
          onClick={handleSave}
          className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-3 rounded-lg font-bold transition-all shadow-lg"
        >
          Zapisz wszystkie zmiany
        </button>
      </div>
    </div>
  );
}

// --- KOMPONENT: EDYTOR POLITYKI ---
function PrivacyEditor() {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/api/admin/privacy')
      .then(res => res.json())
      .then(data => setContent(data.content || ''));
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/admin/privacy', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
    if (res.ok) alert('Polityka zaktualizowana!');
  };

  return (
    <div className="space-y-4">
      <textarea
        className="w-full h-64 bg-zinc-950 border border-zinc-700 rounded-lg p-4 text-zinc-300 font-mono text-sm focus:ring-2 focus:ring-purple-500 outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Wklej kod HTML polityki prywatności..."
      />
      <button
        onClick={handleSave}
        className="bg-zinc-100 hover:bg-white text-black px-6 py-2 rounded-lg font-semibold transition-colors"
      >
        Aktualizuj treść
      </button>
    </div>
  );
}

// --- KOMPONENT: DODAWANIE ADMINA ---
function AddUserForm() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      alert('Użytkownik dodany!');
      setFormData({ name: '', email: '', password: '' });
    } else {
      alert('Błąd podczas dodawania.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Imię i nazwisko"
        className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Adres e-mail"
        className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Hasło"
        className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white"
        value={formData.password}
        onChange={e => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition-colors">
        Utwórz konto
      </button>
    </form>
  );
}

// --- KOMPONENT: ZMIANA HASŁA ---
function ChangePasswordForm() {
  const [data, setData] = useState({ email: '', newPassword: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, currentPassword: 'dummy' })
    });
    if (res.ok) {
      alert('Hasło zmienione!');
      setData({ email: '', newPassword: '' });
    } else {
      alert('Błąd podczas zmiany hasła.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="E-mail użytkownika"
        className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white"
        value={data.email}
        onChange={e => setData({ ...data, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Nowe bezpieczne hasło"
        className="w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-white"
        value={data.newPassword}
        onChange={e => setData({ ...data, newPassword: e.target.value })}
        required
      />
      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-colors">
        Zapisz nowe hasło
      </button>
    </form>
  );
}
