import Script from 'next/script';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { createClient } from '@supabase/supabase-js'; // <--- Nowy import do bazy
import './globals.css';

// Konfiguracja czcionki
const inter = Inter({ subsets: ['latin'] });

// Twoje pełne metadane SEO (Bez zmian)
export const metadata: Metadata = {
  title: {
    default: 'Ordoflow | Automatyzacja Procesów Biznesowych',
    template: '%s | Ordoflow',
  },
  description: 'Zamień chaos operacyjny w zyskowny system. Wdrażam automatyzację i AI, które realnie oszczędzają czas i pieniądze. Strategiczne rozwiązania od praktyka biznesu.',
  keywords: ['automatyzacja', 'AI', 'procesy biznesowe', 'no-code', 'integracje', 'CRM', 'Polska'],
  authors: [{ name: 'Maciej Kanikowski' }],
  creator: 'Ordoflow',
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://ordoflow.pl',
    siteName: 'Ordoflow',
    title: 'Ordoflow | Automatyzacja Procesów Biznesowych',
    description: 'Zamień chaos operacyjny w zyskowny system. Wdrażam automatyzację i AI, które realnie oszczędzają czas i pieniądze.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ordoflow | Automatyzacja Procesów Biznesowych',
    description: 'Zamień chaos operacyjny w zyskowny system.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Konfiguracja klienta Supabase (tylko do odczytu w tym miejscu)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Funkcja jest teraz "async", aby mogła pobrać dane z bazy przed wyświetleniem strony
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  // 1. Pobieramy ID Google Analytics z bazy danych
  // (To ID, które zapisałeś w Panelu Admina -> Ustawienia)
  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'google_analytics_id')
    .single();

  const gaId = data?.value; // np. "G-NRJMBR02NE"

  return (
    <html lang="pl" className="scroll-smooth">
      <body className={inter.className}>
        
        {/* Skrypt Cookiebot (Zostawiamy) */}
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="6d244b98-88c2-41fe-9854-0d7852fa0b32"
          data-blockingmode="auto"
          strategy="afterInteractive"
        />

        {/* 2. Google Analytics (Dynamicznie ładowany) */}
        {/* Skrypt pojawi się w kodzie TYLKO jeśli w bazie jest zapisane ID */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}

        {children}
      </body>
    </html>
  );
}
