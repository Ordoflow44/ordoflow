'use client'

import { useState } from 'react'
import { Save, Check } from 'lucide-react'
import AdminNav from '@/components/admin/AdminNav'

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    ga_id: '',
    gsc_property: '',
    hotjar_id: '',
    fb_pixel_id: '',
  })

  const handleSave = async () => {
    // In production, you'd save these to Supabase or environment variables
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="flex min-h-screen">
      <AdminNav />

      <main className="flex-1 lg:ml-64 pt-20 lg:pt-0">
        <div className="p-6 lg:p-8 max-w-3xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-white mb-2">Ustawienia</h1>
            <p className="text-zinc-400">Konfiguruj integracje i śledzenie</p>
          </div>

          {/* Google Analytics */}
          <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-medium text-white mb-4">Google Analytics 4</h2>
            <p className="text-sm text-zinc-400 mb-4">
              Śledź ruch na stronie i zachowanie użytkowników.
            </p>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Measurement ID (G-XXXXXXXXXX)
              </label>
              <input
                type="text"
                value={settings.ga_id}
                onChange={(e) => setSettings({ ...settings, ga_id: e.target.value })}
                className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple"
                placeholder="G-XXXXXXXXXX"
              />
              <p className="text-xs text-zinc-500 mt-2">
                Znajdziesz to w Google Analytics → Admin → Data Streams → Web Stream
              </p>
            </div>
          </div>

          {/* Google Search Console */}
          <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-medium text-white mb-4">Google Search Console</h2>
            <p className="text-sm text-zinc-400 mb-4">
              Monitoruj pozycje w wynikach wyszukiwania Google.
            </p>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Property URL
              </label>
              <input
                type="url"
                value={settings.gsc_property}
                onChange={(e) => setSettings({ ...settings, gsc_property: e.target.value })}
                className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple"
                placeholder="https://ordoflow.pl"
              />
            </div>

            <div className="mt-4 p-4 bg-zinc-800/50 rounded-lg">
              <h3 className="text-sm font-medium text-white mb-2">Jak skonfigurować?</h3>
              <ol className="text-sm text-zinc-400 space-y-2 list-decimal list-inside">
                <li>Wejdź na <a href="https://search.google.com/search-console" target="_blank" className="text-brand-purple hover:underline">Google Search Console</a></li>
                <li>Dodaj property dla ordoflow.pl</li>
                <li>Zweryfikuj własność domeny (przez DNS lub plik HTML)</li>
                <li>Wróć tutaj i wpisz URL property</li>
              </ol>
            </div>
          </div>

          {/* Hotjar */}
          <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-medium text-white mb-4">Hotjar</h2>
            <p className="text-sm text-zinc-400 mb-4">
              Nagrywaj sesje użytkowników i twórz heatmapy.
            </p>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Site ID
              </label>
              <input
                type="text"
                value={settings.hotjar_id}
                onChange={(e) => setSettings({ ...settings, hotjar_id: e.target.value })}
                className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple"
                placeholder="1234567"
              />
              <p className="text-xs text-zinc-500 mt-2">
                Znajdziesz to w Hotjar → Settings → Sites & Organizations
              </p>
            </div>
          </div>

          {/* Facebook Pixel */}
          <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-medium text-white mb-4">Facebook Pixel</h2>
            <p className="text-sm text-zinc-400 mb-4">
              Śledź konwersje z reklam na Facebooku i Instagramie.
            </p>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Pixel ID
              </label>
              <input
                type="text"
                value={settings.fb_pixel_id}
                onChange={(e) => setSettings({ ...settings, fb_pixel_id: e.target.value })}
                className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple"
                placeholder="123456789012345"
              />
              <p className="text-xs text-zinc-500 mt-2">
                Znajdziesz to w Meta Business Suite → Events Manager → Data Sources
              </p>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="btn-primary"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Zapisano!
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Zapisz ustawienia
              </>
            )}
          </button>

          {/* Info */}
          <div className="mt-8 p-4 bg-zinc-800/30 rounded-lg">
            <p className="text-sm text-zinc-500">
              <strong className="text-zinc-400">Uwaga:</strong> Po zapisaniu ustawień, 
              musisz dodać odpowiednie zmienne środowiskowe w panelu Vercel, 
              aby integracje działały poprawnie.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
