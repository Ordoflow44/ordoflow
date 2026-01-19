import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
