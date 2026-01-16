'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Eye, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import AdminNav from '@/components/admin/AdminNav'
import { supabase } from '@/lib/supabase'
import { generateSlug, calculateReadingTime } from '@/lib/articles'

export default function NewArticlePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    category: '',
    tags: '',
    is_published: false,
    faq: [{ question: '', answer: '' }],
  })

  const handleTitleChange = (value: string) => {
    setFormData({
      ...formData,
      title: value,
      slug: generateSlug(value),
    })
  }

  const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
    const newFaq = [...formData.faq]
    newFaq[index][field] = value
    setFormData({ ...formData, faq: newFaq })
  }

  const addFaq = () => {
    setFormData({
      ...formData,
      faq: [...formData.faq, { question: '', answer: '' }],
    })
  }

  const removeFaq = (index: number) => {
    const newFaq = formData.faq.filter((_, i) => i !== index)
    setFormData({ ...formData, faq: newFaq.length > 0 ? newFaq : [{ question: '', answer: '' }] })
  }

  const handleSubmit = async (e: React.FormEvent, publish: boolean = false) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const faqData = formData.faq.filter(f => f.question && f.answer)
      const keywordsArray = formData.meta_keywords
        .split(',')
        .map(k => k.trim())
        .filter(k => k)
      const tagsArray = formData.tags
        .split(',')
        .map(t => t.trim())
        .filter(t => t)

      const { data, error: insertError } = await supabase
        .from('articles')
        .insert([{
          title: formData.title,
          slug: formData.slug,
          excerpt: formData.excerpt,
          content: formData.content,
          cover_image: formData.cover_image || null,
          meta_title: formData.meta_title || formData.title,
          meta_description: formData.meta_description || formData.excerpt,
          meta_keywords: keywordsArray.length > 0 ? keywordsArray : null,
          category: formData.category || null,
          tags: tagsArray.length > 0 ? tagsArray : null,
          faq: faqData.length > 0 ? faqData : null,
          author: 'Maciej Kanikowski',
          reading_time: calculateReadingTime(formData.content),
          is_published: publish,
          published_at: publish ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        }])
        .select()
        .single()

      if (insertError) throw insertError

      router.push('/admin/articles')
    } catch (err: any) {
      console.error('Error saving article:', err)
      setError(err.message || 'Nie udało się zapisać artykułu')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <AdminNav />

      <main className="flex-1 lg:ml-64 pt-20 lg:pt-0">
        <div className="p-6 lg:p-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/admin/articles"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Powrót do listy
            </Link>
            <h1 className="text-3xl font-semibold text-white">Nowy artykuł</h1>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-400/10 border border-red-400/20 rounded-lg text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={(e) => handleSubmit(e, false)}>
            {/* Basic Info */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-6 mb-6">
              <h2 className="text-lg font-medium text-white mb-4">Podstawowe informacje</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Tytuł *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple"
                    placeholder="Tytuł artykułu"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Slug (URL)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple"
                    placeholder="tytul-artykulu"
                  />
                  <p className="text-xs text-zinc-500 mt-1">
                    URL: ordoflow.pl/blog/{formData.slug || 'tytul-artykulu'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Zajawka *
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple"
                    placeholder="Krótki opis artykułu (pokaże się na liście)"
                    rows={2}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Treść * (HTML)
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple font-mono text-sm"
                    placeholder="<p>Treść artykułu...</p>"
                    rows={15}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Kategoria
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple"
                      placeholder="np. Automatyzacja"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Tagi (oddzielone przecinkiem)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple"
                      placeholder="AI, no-code, biznes"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    URL obrazka głównego
                  </label>
                  <input
                    type="url"
                    value={formData.cover_image}
                    onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            {/* SEO */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-6 mb-6">
              <h2 className="text-lg font-medium text-white mb-4">SEO</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={formData.meta_title}
                    onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple"
                    placeholder="Tytuł dla wyszukiwarek (domyślnie tytuł artykułu)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={formData.meta_description}
                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple"
                    placeholder="Opis dla wyszukiwarek (domyślnie zajawka)"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Meta Keywords (oddzielone przecinkiem)
                  </label>
                  <input
                    type="text"
                    value={formData.meta_keywords}
                    onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple"
                    placeholder="automatyzacja, AI, biznes"
                  />
                </div>
              </div>
            </div>

            {/* FAQ for AI Overviews */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-medium text-white">FAQ (dla AI Overviews)</h2>
                  <p className="text-sm text-zinc-500">Dodaj pytania i odpowiedzi, które pomogą w pozycjonowaniu</p>
                </div>
                <button
                  type="button"
                  onClick={addFaq}
                  className="btn-secondary py-2 px-3 text-sm"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Dodaj
                </button>
              </div>

              <div className="space-y-4">
                {formData.faq.map((item, index) => (
                  <div key={index} className="p-4 bg-zinc-800/50 rounded-lg">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <span className="text-sm text-zinc-500">Pytanie {index + 1}</span>
                      {formData.faq.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFaq(index)}
                          className="text-zinc-500 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={item.question}
                      onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple mb-2"
                      placeholder="Pytanie..."
                    />
                    <textarea
                      value={item.answer}
                      onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple"
                      placeholder="Odpowiedź..."
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-secondary"
              >
                <Save className="w-4 h-4 mr-2" />
                Zapisz wersję roboczą
              </button>
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                disabled={isLoading}
                className="btn-primary"
              >
                <Eye className="w-4 h-4 mr-2" />
                Opublikuj
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
