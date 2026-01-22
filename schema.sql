-- ===========================================
-- ORDOFLOW DATABASE SCHEMA (POCKETBASE VERSION)
-- ===========================================

-- Note: PocketBase handles IDs (15 chars) and system fields 
-- (created, updated) automatically for all collections.

-- ===========================================
-- ADMINS COLLECTION
-- ===========================================
-- Ta kolekcja przechowuje dane administratorów panelu.
-- W PocketBase używamy pól systemowych do autoryzacji.

-- Fields for 'admins':
-- id (System: 15 alphanumeric strings)
-- email (Type: email, Required, Unique)
-- password_hash (Type: text, Required)
-- name (Type: text)
-- created (System: DateTime)
-- updated (System: DateTime)
-- last_login_at (Type: date)

-- ===========================================
-- ARTICLES COLLECTION
-- ===========================================
-- Główna kolekcja przechowująca treści blogowe i dane SEO.

-- Fields for 'articles':
-- id (System: 15 alphanumeric strings)

-- Basic content
-- slug (Type: text, Required, Unique)
-- title (Type: text, Required)
-- excerpt (Type: text)
-- content (Type: editor - Rich Text)
-- cover_image (Type: text / file)

-- Author and metadata
-- author (Type: text, Default: 'Maciej Kanikowski')
-- published_at (Type: date)
-- created (System: DateTime)
-- updated (System: DateTime)

-- Status
-- is_published (Type: bool, Default: False)
-- reading_time (Type: number, Default: 5)

-- SEO fields
-- meta_title (Type: text)
-- meta_description (Type: text)
-- meta_keywords (Type: json - Text Array)

-- Categorization
-- category (Type: text)
-- tags (Type: json - Text Array)

-- FAQ for AI Overviews
-- faq (Type: json, Default: [])

-- ===========================================
-- PASSWORD_RESET_TOKENS COLLECTION
-- ===========================================
-- Kolekcja pomocnicza do obsługi resetowania haseł.

-- Fields for 'password_reset_tokens':
-- id (System: 15 alphanumeric strings)
-- admin_id (Type: relation, Collection: admins, CascadeDelete: true)
-- token (Type: text, Required, Unique)
-- expires_at (Type: date, Required)
-- used_at (Type: date)
-- created (System: DateTime)

-- ===========================================
-- API RULES (Equivalent to RLS)
-- ===========================================
-- PocketBase API Rules zarządzają dostępem zamiast SQL Policies.

-- Articles:
-- List/View: "is_published = true" (Dla publiczności)
-- Create/Update/Delete: "@request.auth.id != ''" (Dla zalogowanych adminów)

-- Admins:
-- All access: restricted to admin system only.
