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

// Klient Supabase do odczytu
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  // Pobieramy ID z bazy (to, co zapisał Admin Panel)
  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'google_analytics_id')
    .single();

  const gaId = data?.value; // np. G-NRJMBR02NE

  return (
    <html lang="pl" className="scroll-smooth">
      <body className={inter.className}>
        
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="6d244b98-88c2-41fe-9854-0d7852fa0b32"
          data-blockingmode="auto"
          strategy="afterInteractive"
        />

        {/* Wstrzykiwanie Google Analytics JEŚLI istnieje w bazie */}
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
