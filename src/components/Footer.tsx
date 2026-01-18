import Link from 'next/link'
import Image from 'next/image'
import { getImageUrl, IMAGES } from '@/lib/supabase'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 py-12 bg-gradient-to-b from-transparent to-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Image
            src={getImageUrl(IMAGES.logo)}
            alt="Ordoflow"
            width={140}
            height={40}
            className="h-10 w-auto object-contain opacity-80"
          />
          <p className="text-gray-500 text-sm text-center">
            © {currentYear} Ordoflow. Automatyzacja procesów biznesowych.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/blog"
              className="text-gray-500 hover:text-gray-300 transition-colors text-sm"
            >
              Blog
            </Link>
            <a
              href="https://cal.com/maciej-kanikowski-ordoflow/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
            >
              Skontaktuj się →
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
