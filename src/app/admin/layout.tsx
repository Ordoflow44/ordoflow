import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panel Admina | Ordoflow',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Ustawiamy ciemne tło dla całego panelu admina
    <div className="min-h-screen bg-[#0A0A0F]">
      {children}
    </div>
  );
}
