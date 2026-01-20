'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('privacy');
  
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Ustawienia</h1>
            <p className="text-gray-400 mt-2">Zarządzaj polityką i dostępem</p>
          </div>
          <Link href="/admin/dashboard" className="text-purple-400 hover:text-purple-300 transition-colors">
            ← Wróć do Dashboardu
          </Link>
        </div>
        
        {/* Nawigacja zakładek */}
        <div className="flex space-x-2 mb-8 border-b border-gray-800">
          {['privacy', 'users', 'password'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-4 capitalize transition-colors ${
                activeTab === tab 
                  ? 'border-b-2 border-purple-600 text-purple-400 font-bold' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab === 'privacy' && 'Polityka Prywatności'}
              {tab === 'users' && 'Nowy Użytkownik'}
              {tab === 'password' && 'Zmiana Hasła'}
            </button>
          ))}
        </div>

        <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
          {activeTab === 'privacy' && <PrivacyEditor />}
          {activeTab === 'users' && <AddUserForm />}
          {activeTab === 'password' && <ChangePasswordForm />}
        </div>
      </div>
    </div>
  );
}

// --- ZAKŁADKA 1: Edytor Polityki ---
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
          <p className="text-sm text-gray-400">Edytuj kod HTML polityki prywatności:</p>
          <a href="/polityka-prywatnosci" target="_blank" className="text-purple-400 text-sm hover:underline">Podgląd na żywo ↗</a>
      </div>
      <textarea 
        className="w-full h-96 p-4 border border-gray-700 rounded bg-[#0A0A0F] font-mono text-sm text-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSave} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
        Zapisz Politykę
      </button>
    </div>
  );
}

// --- ZAKŁADKA 2: Dodawanie Usera ---
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
      <input type="text" placeholder="Imię" required className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-purple-500 outline-none mb-4"
        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
