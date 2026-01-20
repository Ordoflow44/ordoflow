'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('privacy');
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Ustawienia Systemu</h1>
        <Link href="/admin/dashboard" className="text-blue-600 hover:underline">
          ← Wróć do Dashboardu
        </Link>
      </div>
      
      {/* Zakładki */}
      <div className="flex space-x-4 mb-8 border-b">
        {['privacy', 'users', 'password'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-4 capitalize ${activeTab === tab ? 'border-b-2 border-blue-600 font-bold' : 'text-gray-500'}`}
          >
            {tab === 'privacy' && 'Polityka Prywatności'}
            {tab === 'users' && 'Nowy Użytkownik'}
            {tab === 'password' && 'Zmiana Hasła'}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow border">
        {activeTab === 'privacy' && <PrivacyEditor />}
        {activeTab === 'users' && <AddUserForm />}
        {activeTab === 'password' && <ChangePasswordForm />}
      </div>
    </div>
  );
}

// --- Komponent 1: Polityka ---
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

  if (loading) return <p>Ładowanie...</p>;

  return (
    <div>
      <p className="mb-2 text-sm text-gray-600">Edytuj kod HTML polityki prywatności:</p>
      <textarea 
        className="w-full h-96 p-4 border rounded font-mono text-sm bg-gray-50"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="mt-4 flex justify-between items-center">
        <a href="/polityka-prywatnosci" target="_blank" className="text-blue-600 underline">Podgląd na żywo</a>
        <button onClick={handleSave} className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
          Zapisz Politykę
        </button>
      </div>
    </div>
  );
}

// --- Komponent 2: Dodawanie Usera ---
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
      <h3 className="font-bold text-lg">Dodaj nowego administratora</h3>
      <input type="text" placeholder="Imię" required className="w-full border p-2 rounded"
        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
      <input type="email" placeholder="Email" required className="w-full border p-2 rounded"
        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
      <input type="password" placeholder="Hasło" required className="w-full border p-2 rounded"
        value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">Dodaj Administratora</button>
    </form>
  );
}

// --- Komponent 3: Zmiana Hasła ---
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
      <h3 className="font-bold text-lg">Zmień hasło</h3>
      <p className="text-sm text-gray-500">Wpisz swój email i nowe hasło, aby je zresetować.</p>
      <input type="email" placeholder="Twój Email" required className="w-full border p-2 rounded"
        value={data.email} onChange={e => setData({...data, email: e.target.value})} />
      <input type="password" placeholder="Nowe Hasło" required className="w-full border p-2 rounded"
        value={data.newPassword} onChange={e => setData({...data, newPassword: e.target.value})} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Zmień hasło</button>
    </form>
  );
}
