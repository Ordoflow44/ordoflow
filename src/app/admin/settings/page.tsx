'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('integrations');
  
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Ustawienia</h1>
            <p className="text-gray-400 mt-2">Konfiguracja systemu Ordoflow</p>
          </div>
          <Link href="/admin/dashboard" className="text-purple-400 hover:text-purple-300 transition-colors">
            ← Wróć do Dashboardu
          </Link>
        </div>
        
        {/* Nawigacja zakładek */}
        <div className="flex space-x-2 mb-8 border-b border-gray-800 overflow-x-auto">
          {['integrations', 'privacy', 'users', 'password'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-4 capitalize transition-colors whitespace-nowrap ${
                activeTab === tab 
                  ? 'border-b-2 border-purple-600 text-purple-400 font-bold' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab === 'integrations' && 'Integracje i SEO'}
              {tab === 'privacy' && 'Polityka Prywatności'}
              {tab === 'users' && 'Nowy Użytkownik'}
              {tab === 'password' && 'Zmiana Hasła'}
            </button>
          ))}
        </div>

        <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
          {activeTab === 'integrations' && <IntegrationsTab />}
          {activeTab === 'privacy' && <PrivacyEditor />}
          {activeTab === 'users' && <AddUserForm />}
          {activeTab === 'password' && <ChangePasswordForm />}
        </div>
      </div>
    </div>
  );
}

// --- ZAKŁADKA 1: Integracje (Odtworzone) ---
function IntegrationsTab() {
    return (
        <div className="space-y-6">
            <h3 className="font-bold text-lg text-white mb-4">Zewnętrzne Narzędzia</h3>
            
            <div className="grid gap-6">
                <div className="bg-[#0A0A0F] p-4 rounded-xl border border-gray-800">
                    <h3 className="font-bold mb-2 text-purple-400">Google Analytics 4</h3>
                    <p className="text-sm text-gray-400 mb-4">Wklej identyfikator pomiaru (np. G-123456)</p>
                    <input type="text" placeholder="G-XXXXXXXXXX" className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-purple-500 outline-none placeholder-gray-600" />
                </div>

                <div className="bg-[#0A0A0F] p-4 rounded-xl border border-gray-800">
                    <h3 className="font-bold mb-2 text-purple-400">Google Search Console</h3>
                    <p className="text-sm text-gray-400 mb-4">Kod weryfikacyjny HTML</p>
                    <input type="text" placeholder='content="kod-weryfikacyjny"' className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-purple-500 outline-none placeholder-gray-600" />
                </div>

                <div className="bg-[#0A0A0F] p-4 rounded-xl border border-gray-800">
                    <h3 className="font-bold mb-2 text-purple-400">Hotjar / Inne</h3>
                    <p className="text-sm text-gray-400 mb-4">Skrypty śledzące</p>
                    <input type="text" placeholder="ID konta..." className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-purple-500 outline-none placeholder-gray-600" />
                </div>
            </div>

            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors w-full md:w-auto font-medium mt-4">
                Zapisz Integracje
            </button>
        </div>
    )
}

// --- ZAKŁADKA 2: Edytor Polityki ---
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

  if (loading) return <p className="text-gray-400">Ładowanie...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-400">Kod HTML polityki prywatności:</p>
          <a href="/polityka-prywatnosci" target="_blank" className="text-purple-400 text-sm hover:underline">Podgląd strony ↗</a>
      </div>
      <textarea 
        className="w-full h-96 p-4 border border-gray-700 rounded-xl bg-[#0A0A0F] font-mono text-sm text-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSave} className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors font-medium">
        Zapisz Politykę
      </button>
    </div>
  );
}

// --- ZAKŁADKA 3: Dodawanie Usera ---
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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <h3 className="font-bold text-lg mb-4 text-white">Dodaj nowego administratora</h3>
      <input type="text" placeholder="Imię" required className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-purple-500 outline-none mb-4 placeholder-gray-600"
        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
      <input type="email" placeholder="Email" required className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-purple-500 outline-none mb-4 placeholder-gray-600"
        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
      <input type="password" placeholder="Hasło" required className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-purple-500 outline-none mb-4 placeholder-gray-600"
        value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
      <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">Dodaj Administratora</button>
    </form>
  );
}

// --- ZAKŁADKA 4: Zmiana Hasła ---
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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <h3 className="font-bold text-lg mb-4 text-white">Zresetuj hasło</h3>
      <p className="text-sm text-gray-400 mb-4">Wpisz email konta, któremu chcesz zmienić hasło.</p>
      <input type="email" placeholder="Email użytkownika" required className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-purple-500 outline-none mb-4 placeholder-gray-600"
        value={data.email} onChange={e => setData({...data, email: e.target.value})} />
      <input type="password" placeholder="Nowe Hasło" required className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-purple-500 outline-none mb-4 placeholder-gray-600"
        value={data.newPassword} onChange={e => setData({...data, newPassword: e.target.value})} />
      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">Zmień hasło</button>
    </form>
  );
}
