import { FileText, Eye, TrendingUp, Clock } from 'lucide-react'
import AdminNav from '@/components/admin/AdminNav'
import { getAllArticles } from '@/lib/articles'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const articles = await getAllArticles()
  
  const publishedCount = articles.filter(a => a.is_published).length
  const draftCount = articles.filter(a => !a.is_published).length

  const stats = [
    {
      label: 'Opublikowane artykuły',
      value: publishedCount,
      icon: FileText,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      label: 'Wersje robocze',
      value: draftCount,
      icon: Clock,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
    },
    {
      label: 'Wyświetlenia (wkrótce)',
      value: '-',
      icon: Eye,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      label: 'Pozycja SEO (wkrótce)',
      value: '-',
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
  ]

  return (
    <div className="flex min-h-screen">
      <AdminNav />

      <main className="flex-1 lg:ml-64 pt-20 lg:pt-0">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-white mb-2">Dashboard</h1>
            <p className="text-zinc-400">Witaj w panelu administracyjnym Ordoflow</p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="bg-zinc-900/40 border border-white/5 rounded-xl p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-white">{stat.value}</p>
                      <p className="text-sm text-zinc-500">{stat.label}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Recent Articles */}
          <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-6">
            <h2 className="text-xl font-medium text-white mb-4">Ostatnie artykuły</h2>
            
            {articles.length > 0 ? (
              <div className="space-y-4">
                {articles.slice(0, 5).map((article) => (
                  <div
                    key={article.id}
                    className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg"
                  >
                    <div>
                      <h3 className="text-white font-medium">{article.title}</h3>
                      <p className="text-sm text-zinc-500">
                        {article.is_published ? 'Opublikowany' : 'Wersja robocza'}
                      </p>
                    </div>
                    <a
                      href={`/admin/articles/${article.id}`}
                      className="text-sm text-brand-purple hover:underline"
                    >
                      Edytuj
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-zinc-500 mb-4">Nie masz jeszcze żadnych artykułów</p>
                <a
                  href="/admin/articles/new"
                  className="btn-primary"
                >
                  Utwórz pierwszy artykuł
                </a>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            <a
              href="/admin/articles/new"
              className="p-6 bg-brand-purple/10 border border-brand-purple/20 rounded-xl hover:bg-brand-purple/20 transition-colors"
            >
              <h3 className="text-white font-medium mb-2">Nowy artykuł</h3>
              <p className="text-sm text-zinc-400">Utwórz nowy wpis na blogu</p>
            </a>
            <a
              href="/admin/seo"
              className="p-6 bg-zinc-900/40 border border-white/5 rounded-xl hover:bg-zinc-900/60 transition-colors"
            >
              <h3 className="text-white font-medium mb-2">Sprawdź SEO</h3>
              <p className="text-sm text-zinc-400">Monitoruj pozycje w Google</p>
            </a>
            <a
              href="/admin/settings"
              className="p-6 bg-zinc-900/40 border border-white/5 rounded-xl hover:bg-zinc-900/60 transition-colors"
            >
              <h3 className="text-white font-medium mb-2">Ustawienia</h3>
              <p className="text-sm text-zinc-400">Konfiguruj integracje</p>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
