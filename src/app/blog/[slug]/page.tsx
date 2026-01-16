import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getArticleBySlug, getPublishedArticles } from '@/lib/articles'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'

interface Props {
  params: { slug: string }
}

// Generate static params for all published articles
export async function generateStaticParams() {
  const articles = await getPublishedArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: 'Artykuł nie znaleziony',
    }
  }

  return {
    title: article.meta_title || article.title,
    description: article.meta_description || article.excerpt,
    keywords: article.meta_keywords,
    openGraph: {
      title: article.meta_title || article.title,
      description: article.meta_description || article.excerpt,
      type: 'article',
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
      authors: [article.author],
      images: article.cover_image ? [article.cover_image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.meta_title || article.title,
      description: article.meta_description || article.excerpt,
      images: article.cover_image ? [article.cover_image] : [],
    },
  }
}

export const revalidate = 60

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  // JSON-LD structured data for SEO and AI Overviews
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.cover_image,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: {
      '@type': 'Person',
      name: article.author,
      url: 'https://ordoflow.pl/#about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ordoflow',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ordoflow.pl/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://ordoflow.pl/blog/${article.slug}`,
    },
  }

  // FAQ structured data (for AI Overviews)
  const faqJsonLd = article.faq && article.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } : null

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Navbar />

      <main className="pt-32 pb-24">
        <article className="max-w-4xl mx-auto px-6">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Powrót do bloga
          </Link>

          {/* Header */}
          <header className="mb-12">
            {/* Category */}
            {article.category && (
              <span className="inline-block text-sm font-medium text-brand-purple mb-4">
                {article.category}
              </span>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-zinc-400 mb-8">
              {article.excerpt}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500 pb-8 border-b border-white/10">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {format(new Date(article.published_at), 'd MMMM yyyy', { locale: pl })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.reading_time} min czytania
              </span>
            </div>
          </header>

          {/* Cover Image */}
          {article.cover_image && (
            <div className="relative h-[400px] rounded-2xl overflow-hidden mb-12">
              <Image
                src={article.cover_image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose-brand"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* FAQ Section (if exists) */}
          {article.faq && article.faq.length > 0 && (
            <section className="mt-16 pt-12 border-t border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-8">
                Często zadawane pytania
              </h2>
              <div className="space-y-6">
                {article.faq.map((item, index) => (
                  <div
                    key={index}
                    className="bg-zinc-900/40 border border-white/5 rounded-xl p-6"
                  >
                    <h3 className="text-lg font-medium text-white mb-3">
                      {item.question}
                    </h3>
                    <p className="text-zinc-400">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs bg-zinc-800 text-zinc-400 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 p-8 bg-gradient-to-r from-brand-purple/20 to-transparent rounded-2xl border border-brand-purple/20">
            <h3 className="text-2xl font-semibold text-white mb-3">
              Chcesz wdrożyć automatyzację w swojej firmie?
            </h3>
            <p className="text-zinc-400 mb-6">
              Umów się na bezpłatną konsultację i sprawdź, jak mogę pomóc Twojemu biznesowi.
            </p>
            <a
              href="https://cal.com/maciej-kanikowski-ordoflow/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Umów bezpłatną konsultację
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </>
  )
}
