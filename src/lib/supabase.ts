import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper do pobierania URL obrazków z storage
export const getImageUrl = (filename: string) => {
  return `${supabaseUrl}/storage/v1/object/public/images/${filename}`
}

// Stałe z nazwami obrazków
export const IMAGES = {
  logo: 'Logo.png',
  hero: 'Przeplyw.webp',
  paloneBudget: 'palony_budzet.png',
  crush: 'crush.png',
  puzzleGlowa: 'puzze_w_glowie.png',
  zegar: 'zegar.png',
  tablet: 'tablet.png',
  iconBlyskawica: 'Icon_blyskawica.png',
  puzzlePolaczone: 'puzzle_poła_czone.png',
  maciejTlo: 'Maciej_tlo.png',
  maciejTablet: 'Maciej_tablet.png',
  checkbox: 'checkbox.png',
} as const
