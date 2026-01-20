'use client';
import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('privacy');
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Ustawienia Systemu</h1>
      
      {/* Nawigacja zakładek */}
      <div className="flex space-x-4 mb-8 border-b">
        <button 
          onClick={() => setActiveTab('privacy')}
          className={`pb-2 px-4 ${activeTab === 'privacy' ? 'border-b-2 border-blue-600 font-bold' : ''}`}
        >
          Polityka Prywatności
        </button>
        <button 
          onClick={() => setActiveTab('users')}
          className={`pb-2 px-4 ${activeTab === 'users' ? 'border-b-2 border-blue-600 font-bold' : ''}`}
        >
          Nowy Użytkownik
        </button>
        <button 
          onClick={() => setActiveTab('password')}
          className={`pb-2 px-4 ${activeTab === 'password' ? 'border-b-2 border-blue-600 font-bold' : ''}`}
        >
          Zmiana Hasła
        </button>
      </div>

      {/* Zawartość */}
      <div className="bg-white p-6 rounded-lg shadow">
        {activeTab === 'privacy' && <PrivacyEditor />}
        {activeTab === 'users' && <AddUserForm />}
        {activeTab === 'password' && <ChangePasswordForm />}
      </div>
    </div>
  );
}

// --- KOMPONENT 1: Edycja Polityki ---
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
      <h2 className="text-xl font-bold mb-4">Edytuj treść (HTML)</h2>
      <textarea 
        className="w-full h-64 p-4 border rounded font-mono text-sm"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSave} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Zapisz Politykę
      </button>
    </div>
  );
}

// --- KOMPONENT 2: Dodawanie Usera ---
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
      <h2 className="text-xl font-bold mb-4">Dodaj Administratora</h2>
      <input 
        type="text" placeholder="Imię" required className="w-full border p-2 rounded"
        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
      />
      <input 
        type="email" placeholder="Email" required className="w-full border p-2 rounded"
        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
      />
      <input 
        type="password" placeholder="Hasło" required className="w-full border p-2 rounded"
        value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Dodaj</button>
    </form>
  );
}

// --- KOMPONENT 3: Zmiana Hasła ---
function ChangePasswordForm() {
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) return alert('Hasła nie są identyczne');
    
    const res = await fetch('/api/admin/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword: passwords.current, newPassword: passwords.new }),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Hasło zmienione pomyślnie!');
      setPasswords({ current: '', new: '', confirm: '' });
    } else {
      alert('Błąd: ' + data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <h2 className="text-xl font-bold mb-4">Zmień swoje hasło</h2>
      <input 
        type="password" placeholder="Obecne hasło" required className="w-full border p-2 rounded"
        value={passwords.current} onChange={e => setPasswords({...passwords, current: e.target.value})}
      />
      <input 
        type="password" placeholder="Nowe hasło" required className="w-full border p-2 rounded"
        value={passwords.new} onChange={e => setPasswords({...passwords, new: e.target.value})}
      />
      <input 
        type="password" placeholder="Potwierdź nowe hasło" required className="w-full border p-2 rounded"
        value={passwords.confirm} onChange={e => setPasswords({...passwords, confirm: e.target.value})}
      />
      <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">Zmień hasło</button>
    </form>
  );
}
