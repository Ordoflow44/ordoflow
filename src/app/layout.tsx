import Script from 'next/script';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { createClient } from '@supabase/supabase-js';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ordoflow | Automatyzacja Procesów Biznesowych',
  description: 'Zamień chaos operacyjny w zyskowny system.',
  robots: { index: true, follow: true },
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  // 1. Pobieramy SUROWY kod z bazy (to co wkleiłeś)
  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'google_analytics_id')
    .single();

  const rawValue = data?.value || '';

  // 2. Szukamy w tym śmietniku identyfikatora G-XXXXXX
  // Niezależnie czy wkleiłeś sam ID, czy cały skrypt HTML
  const gaIdMatch = rawValue.match(/G-[A-Za-z0-9]+/);
  const gaId = gaIdMatch ? gaIdMatch[0] : null;

  return (
    <html lang="pl" className="scroll-smooth">
      <body className={inter.className}>
        
        {/* Cookiebot */}
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="6d244b98-88c2-41fe-9854-0d7852fa0b32"
          data-blockingmode="auto"
          strategy="afterInteractive"
        />

        {/* Google Analytics - Uruchamiamy tylko jeśli znaleźliśmy ID */}
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
