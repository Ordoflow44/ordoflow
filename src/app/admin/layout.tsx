import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Panel Admina | Ordoflow',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-brand-bg">
      {children}
    </div>
  )
}
