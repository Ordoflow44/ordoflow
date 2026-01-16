import { BarChart3, TrendingUp, Search, ExternalLink } from 'lucide-react'
import AdminNav from '@/components/admin/AdminNav'

export default function AdminSeoPage() {
  return (
    <div className="flex min-h-screen">
      <AdminNav />

      <main className="flex-1 lg:ml-64 pt-20 lg:pt-0">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-white mb-2">SEO Dashboard</h1>
            <p className="text-zinc-400">Monitoruj pozycje i ruch z wyszukiwarek</p>
          </div>

          {/* Setup Required Notice */}
          <div className="bg-brand-purple/10 border border-brand-purple/20 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-medium text-white mb-3">
              Konfiguracja wymagana
            </h2>
            <p className="text-zinc-400 mb-4">
              Aby zobaczyć dane SEO, musisz połączyć Google Search Console i Google Analytics.
              Przejdź do ustawień, aby skonfigurować integracje.
            </p>
            <a
              href="/admin/settings"
              className="btn-primary"
            >
              Przejdź do ustawień
            </a>
          </div>

          {/* Placeholder Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-400/10">
                  <Search className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-zinc-400">Wyświetlenia w Google</span>
              </div>
              <p className="text-3xl font-semibold text-white">-</p>
              <p className="text-sm text-zinc-500 mt-1">Ostatnie 28 dni</p>
            </div>

            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-400/10">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <span className="text-zinc-400">Kliknięcia</span>
              </div>
              <p className="text-3xl font-semibold text-white">-</p>
              <p className="text-sm text-zinc-500 mt-1">Ostatnie 28 dni</p>
            </div>

            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-purple-400/10">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-zinc-400">Średnia pozycja</span>
              </div>
              <p className="text-3xl font-semibold text-white">-</p>
              <p className="text-sm text-zinc-500 mt-1">Ostatnie 28 dni</p>
            </div>
          </div>

          {/* Top Queries Placeholder */}
          <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-medium text-white mb-4">Top zapytania</h2>
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-800 flex items-center justify-center">
                <Search className="w-8 h-8 text-zinc-600" />
              </div>
              <p className="text-zinc-400">
                Połącz Google Search Console, aby zobaczyć zapytania
              </p>
            </div>
          </div>

          {/* Top Pages Placeholder */}
          <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-6">
            <h2 className="text-xl font-medium text-white mb-4">Top strony</h2>
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-800 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-zinc-600" />
              </div>
              <p className="text-zinc-400">
                Połącz Google Analytics, aby zobaczyć statystyki stron
              </p>
            </div>
          </div>

          {/* External Links */}
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-zinc-900/40 border border-white/5 rounded-xl hover:bg-zinc-900/60 transition-colors"
            >
              <div>
                <h3 className="text-white font-medium">Google Search Console</h3>
                <p className="text-sm text-zinc-500">Otwórz panel GSC</p>
              </div>
              <ExternalLink className="w-5 h-5 text-zinc-400" />
            </a>

            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-zinc-900/40 border border-white/5 rounded-xl hover:bg-zinc-900/60 transition-colors"
            >
              <div>
                <h3 className="text-white font-medium">Google Analytics</h3>
                <p className="text-sm text-zinc-500">Otwórz panel GA4</p>
              </div>
              <ExternalLink className="w-5 h-5 text-zinc-400" />
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
