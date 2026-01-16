import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import AdminNav from '@/components/admin/AdminNav'
import { getAllArticles } from '@/lib/articles'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'

export const dynamic = 'force-dynamic'

export default async function AdminArticlesPage() {
  const articles = await getAllArticles()

  return (
    <div className="flex min-h-screen">
      <AdminNav />

      <main className="flex-1 lg:ml-64 pt-20 lg:pt-0">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-semibold text-white mb-2">Artykuły</h1>
              <p className="text-zinc-400">Zarządzaj wpisami na blogu</p>
            </div>
            <Link
              href="/admin/articles/new"
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nowy artykuł
            </Link>
          </div>

          {/* Articles Table */}
          <div className="bg-zinc-900/40 border border-white/5 rounded-xl overflow-hidden">
            {articles.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left text-sm font-medium text-zinc-400 p-4">Tytuł</th>
                      <th className="text-left text-sm font-medium text-zinc-400 p-4">Status</th>
                      <th className="text-left text-sm font-medium text-zinc-400 p-4">Data</th>
                      <th className="text-left text-sm font-medium text-zinc-400 p-4">Kategoria</th>
                      <th className="text-right text-sm font-medium text-zinc-400 p-4">Akcje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map((article) => (
                      <tr key={article.id} className="border-b border-white/5 last:border-0">
                        <td className="p-4">
                          <div>
                            <p className="text-white font-medium">{article.title}</p>
                            <p className="text-sm text-zinc-500 truncate max-w-xs">
                              {article.excerpt}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          {article.is_published ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-400/10 text-green-400">
                              <Eye className="w-3 h-3" />
                              Opublikowany
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-yellow-400/10 text-yellow-400">
                              <EyeOff className="w-3 h-3" />
                              Wersja robocza
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-sm text-zinc-400">
                          {article.published_at
                            ? format(new Date(article.published_at), 'd MMM yyyy', { locale: pl })
                            : '-'}
                        </td>
                        <td className="p-4 text-sm text-zinc-400">
                          {article.category || '-'}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/articles/${article.id}`}
                              className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                              title="Edytuj"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <button
                              className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                              title="Usuń"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-800 flex items-center justify-center">
                  <span className="text-3xl">📝</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Brak artykułów</h3>
                <p className="text-zinc-400 mb-6">Utwórz swój pierwszy artykuł na blogu</p>
                <Link href="/admin/articles/new" className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Utwórz artykuł
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
