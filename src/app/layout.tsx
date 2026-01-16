import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'] })

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
      <body className={`${inter.className} bg-brand-bg text-zinc-400 antialiased`}>
        {children}
      </body>
    </html>
  )
}
