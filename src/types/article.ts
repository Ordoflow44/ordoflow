export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  cover_image?: string
  author: string
  published_at: string
  updated_at: string
  is_published: boolean
  reading_time: number
  
  // SEO fields
  meta_title?: string
  meta_description?: string
  meta_keywords?: string[]
  
  // Structured data for AI Overviews
  faq?: {
    question: string
    answer: string
  }[]
  
  // Categories & Tags
  category?: string
  tags?: string[]
}

export interface ArticleFormData {
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image?: string
  meta_title?: string
  meta_description?: string
  meta_keywords?: string[]
  category?: string
  tags?: string[]
  faq?: {
    question: string
    answer: string
  }[]
  is_published: boolean
}
