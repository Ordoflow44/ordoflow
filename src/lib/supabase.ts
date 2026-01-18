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
  // Główne
  logo: 'Logo.png',
  hero: 'Przeplyw.webp',
  
  // Sekcja "Problem" (pomarańczowe ikony)
  przepalanie: 'przepalanie.png',
  szklanySufit: 'szklany_sufit.png',
  syndrom: 'syndrom.png',
  lejek: 'lejek.png',
  rotacja: 'rotacja.png',
  
  // Sekcja "Case Studies" (fioletowe ikony)
  onboarding: 'onboarding.png',
  asystent: 'asystent.png',
  integracja: 'integracja.png',
  
  // Sekcja "About"
  maciejTlo: 'Maciej_tlo.png',
  maciejTablet: 'Maciej_tablet.png',
  
  // Inne
  checkbox: 'checkbox.png',
} as const
