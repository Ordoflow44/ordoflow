-- Tabela artykułów dla bloga Ordoflow
-- Uruchom ten skrypt w Supabase SQL Editor

CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Podstawowe pola
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  author VARCHAR(255) DEFAULT 'Maciej Kanikowski',
  
  -- Daty
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Status
  is_published BOOLEAN DEFAULT FALSE,
  reading_time INTEGER DEFAULT 5,
  
  -- SEO
  meta_title VARCHAR(500),
  meta_description TEXT,
  meta_keywords TEXT[], -- Array of keywords
  
  -- Kategoryzacja
  category VARCHAR(255),
  tags TEXT[], -- Array of tags
  
  -- FAQ dla AI Overviews (JSONB array)
  faq JSONB
);

-- Indeksy dla lepszej wydajności
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);

-- Funkcja do automatycznej aktualizacji updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger do automatycznej aktualizacji updated_at
DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Polityka: każdy może czytać opublikowane artykuły
CREATE POLICY "Public can read published articles" ON articles
  FOR SELECT
  USING (is_published = true);

-- Polityka: autoryzowani użytkownicy mogą wszystko
-- (w produkcji dodasz tu odpowiednie warunki autoryzacji)
CREATE POLICY "Authenticated users can manage articles" ON articles
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Przykładowy artykuł (opcjonalnie)
-- INSERT INTO articles (slug, title, excerpt, content, category, is_published, published_at, faq)
-- VALUES (
--   'jak-automatyzacja-oszczedza-czas',
--   'Jak automatyzacja oszczędza czas w małej firmie?',
--   'Poznaj 5 sprawdzonych sposobów na automatyzację procesów, które pozwolą Ci odzyskać nawet 10 godzin tygodniowo.',
--   '<h2>Wprowadzenie</h2><p>Automatyzacja to nie tylko domena dużych korporacji...</p>',
--   'Automatyzacja',
--   true,
--   NOW(),
--   '[{"question": "Ile kosztuje wdrożenie automatyzacji?", "answer": "Koszt zależy od skali projektu, ale proste automatyzacje można wdrożyć już od 500 zł."}]'::jsonb
-- );
