'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { getImageUrl, IMAGES } from '@/lib/supabase'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-white/5 bg-brand-bg/80 backdrop-blur-md">
      <div className="flex h-16 max-w-7xl mx-auto px-6 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={getImageUrl(IMAGES.logo)}
            alt="Ordoflow Logo"
            width={160}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            href="/blog" 
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Blog
          </Link>
          <Link 
            href="/#case-studies" 
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Case Studies
          </Link>
          <Link 
            href="/#about" 
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            O mnie
          </Link>
          <a
            href="https://cal.com/maciej-kanikowski-ordoflow/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center hover:bg-white/10 transition-colors text-xs font-medium text-white bg-white/5 border-white/10 border rounded-md py-2 px-4"
          >
            Kontakt
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-zinc-400 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-brand-bg/95 backdrop-blur-md">
          <div className="px-6 py-4 space-y-4">
            <Link
              href="/blog"
              className="block text-sm text-zinc-400 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/#case-studies"
              className="block text-sm text-zinc-400 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Case Studies
            </Link>
            <Link
              href="/#about"
              className="block text-sm text-zinc-400 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              O mnie
            </Link>
            <a
              href="https://cal.com/maciej-kanikowski-ordoflow/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm font-medium text-white bg-white/5 border border-white/10 rounded-md py-2 px-4 text-center"
            >
              Kontakt
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
