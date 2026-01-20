import Script from 'next/script';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Konfiguracja czcionki
const inter = Inter({ subsets: ['latin'] });

// Twoje pełne metadane SEO
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className={inter.className}>
        
        {/* Skrypt Cookiebot */}
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="6d244b98-88c2-41fe-9854-0d7852fa0b32"
          data-blockingmode="auto"
          strategy="afterInteractive"
        />

        {children}
      </body>
    </html>
  );
}
