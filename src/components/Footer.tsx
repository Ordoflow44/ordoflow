import Link from 'next/link'
import Image from 'next/image'
import { getImageUrl, IMAGES } from '@/lib/supabase'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Image
              src={getImageUrl(IMAGES.logo)}
              alt="Ordoflow Logo"
              width={140}
              height={35}
              className="h-8 w-auto mb-4"
            />
            <p className="text-sm text-zinc-500 max-w-md">
              Automatyzacja procesów biznesowych i wdrożenia AI. 
              Zamieniamy chaos operacyjny w zyskowne systemy.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-medium mb-4">Nawigacja</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-zinc-500 hover:text-white transition-colors">
                  Strona główna
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-zinc-500 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#case-studies" className="text-sm text-zinc-500 hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-sm text-zinc-500 hover:text-white transition-colors">
                  O mnie
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium mb-4">Kontakt</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://cal.com/maciej-kanikowski-ordoflow/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 hover:text-white transition-colors"
                >
                  Umów konsultację
                </a>
              </li>
              <li>
                <a
                  href="mailto:kontakt@ordoflow.pl"
                  className="text-sm text-zinc-500 hover:text-white transition-colors"
                >
                  kontakt@ordoflow.pl
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600">
            © {currentYear} Ordoflow. Wszystkie prawa zastrzeżone.
          </p>
          <div className="flex gap-6">
            <Link href="/polityka-prywatnosci" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
              Polityka prywatności
            </Link>
            <Link href="/regulamin" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
              Regulamin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
