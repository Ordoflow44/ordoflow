import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getPublishedArticles } from '@/lib/articles'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'

export const metadata: Metadata = {
  title: 'Blog | Automatyzacja i AI dla Biznesu',
  description: 'Praktyczne artykuły o automatyzacji procesów biznesowych, wdrożeniach AI i strategiach no-code. Wiedza od praktyka z 15-letnim doświadczeniem.',
  openGraph: {
    title: 'Blog | Ordoflow',
    description: 'Praktyczne artykuły o automatyzacji procesów biznesowych i AI.',
  },
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function BlogPage() {
  const articles = await getPublishedArticles()

  return (
    <>
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
              Blog
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Praktyczna wiedza o automatyzacji, AI i skalowaniu biznesu. 
              Bez teorii – tylko sprawdzone rozwiązania.
            </p>
          </div>

          {/* Articles Grid */}
          {articles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="group hover-card bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden"
                >
                  {/* Cover Image */}
                  {article.cover_image && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.cover_image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    {/* Category */}
                    {article.category && (
                      <span className="inline-block text-xs font-medium text-brand-purple mb-3">
                        {article.category}
                      </span>
                    )}

                    {/* Title */}
                    <h2 className="text-xl font-medium text-white mb-3 group-hover:text-brand-purple transition-colors">
                      <Link href={`/blog/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-zinc-400 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(article.published_at), 'd MMM yyyy', { locale: pl })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.reading_time} min
                        </span>
                      </div>
                      <Link
                        href={`/blog/${article.slug}`}
                        className="flex items-center gap-1 text-brand-purple hover:underline"
                      >
                        Czytaj
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-zinc-900 flex items-center justify-center">
                <span className="text-4xl">📝</span>
              </div>
              <h2 className="text-2xl font-medium text-white mb-3">
                Artykuły już wkrótce
              </h2>
              <p className="text-zinc-400 max-w-md mx-auto">
                Pracuję nad pierwszymi artykułami. Wróć niedługo lub umów się na 
                konsultację, żeby porozmawiać o automatyzacji Twojego biznesu.
              </p>
              <a
                href="https://cal.com/maciej-kanikowski-ordoflow/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-8"
              >
                Umów konsultację
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
