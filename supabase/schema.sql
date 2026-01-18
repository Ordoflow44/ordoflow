-- ===========================================
-- ORDOFLOW DATABASE SCHEMA
-- ===========================================

-- Drop existing tables if they exist (for fresh install)
-- DROP TABLE IF EXISTS articles;
-- DROP TABLE IF EXISTS admins;
-- DROP TABLE IF EXISTS password_reset_tokens;

-- ===========================================
-- ADMINS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE
);

-- Password reset tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES admins(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster token lookup
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_admin_id ON password_reset_tokens(admin_id);

-- ===========================================
-- ARTICLES TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Basic content
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    excerpt TEXT,
    content TEXT,
    cover_image TEXT,
    
    -- Author and metadata
    author VARCHAR(255) DEFAULT 'Maciej Kanikowski',
    published_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Status
    is_published BOOLEAN DEFAULT FALSE,
    reading_time INTEGER DEFAULT 5,
    
    -- SEO fields
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT[],
    
    -- Categorization
    category VARCHAR(100),
    tags TEXT[],
    
    -- FAQ for AI Overviews (stored as JSON)
    faq JSONB DEFAULT '[]'::jsonb
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);

-- Auto-update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;
CREATE TRIGGER update_articles_updated_at
    BEFORE UPDATE ON articles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_admins_updated_at ON admins;
CREATE TRIGGER update_admins_updated_at
    BEFORE UPDATE ON admins
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ===========================================
-- ROW LEVEL SECURITY (RLS)
-- ===========================================

-- Enable RLS on tables
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;

-- Articles policies
DROP POLICY IF EXISTS "Public can read published articles" ON articles;
CREATE POLICY "Public can read published articles" ON articles
    FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Authenticated can do everything with articles" ON articles;
CREATE POLICY "Authenticated can do everything with articles" ON articles
    FOR ALL USING (auth.role() = 'authenticated');

-- Admins policies (only service role can access)
DROP POLICY IF EXISTS "Service role can manage admins" ON admins;
CREATE POLICY "Service role can manage admins" ON admins
    FOR ALL USING (auth.role() = 'service_role');

-- Password reset tokens policies
DROP POLICY IF EXISTS "Service role can manage tokens" ON password_reset_tokens;
CREATE POLICY "Service role can manage tokens" ON password_reset_tokens
    FOR ALL USING (auth.role() = 'service_role');

-- ===========================================
-- INSERT DEFAULT ADMIN
-- ===========================================
-- Password: Admin123! (hashed with bcrypt)
-- You should change this after first login!
INSERT INTO admins (email, password_hash, name) 
VALUES (
    'admin@ordoflow.pl',
    '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu.1q',
    'Administrator'
) ON CONFLICT (email) DO NOTHING;

-- ===========================================
-- NOTES
-- ===========================================
-- Default admin credentials:
-- Email: admin@ordoflow.pl
-- Password: Admin123!
-- 
-- IMPORTANT: Change the password after first login!
-- 
-- To manually create a new admin, use bcrypt to hash the password:
-- INSERT INTO admins (email, password_hash, name)
-- VALUES ('email@example.com', '<bcrypt_hash>', 'Name');
