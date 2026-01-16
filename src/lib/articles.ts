import { supabase } from './supabase'
import { Article } from '@/types/article'

export async function getPublishedArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching articles:', error)
    return []
  }

  return data || []
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) {
    console.error('Error fetching article:', error)
    return null
  }

  return data
}

export async function getAllArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching all articles:', error)
    return []
  }

  return data || []
}

export async function createArticle(article: Partial<Article>): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .insert([{
      ...article,
      published_at: article.is_published ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    }])
    .select()
    .single()

  if (error) {
    console.error('Error creating article:', error)
    return null
  }

  return data
}

export async function updateArticle(id: string, article: Partial<Article>): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .update({
      ...article,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating article:', error)
    return null
  }

  return data
}

export async function deleteArticle(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting article:', error)
    return false
  }

  return true
}

// Helper to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-') // Replace multiple - with single -
    .trim()
}

// Calculate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}
