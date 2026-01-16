'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
import { getImageUrl, IMAGES } from '@/lib/supabase'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/articles', label: 'Artykuły', icon: FileText },
  { href: '/admin/seo', label: 'SEO', icon: BarChart3 },
  { href: '/admin/settings', label: 'Ustawienia', icon: Settings },
]

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-zinc-900/50 border-r border-white/5 fixed left-0 top-0">
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link href="/admin/dashboard">
            <Image
              src={getImageUrl(IMAGES.logo)}
              alt="Ordoflow"
              width={140}
              height={35}
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-brand-purple/20 text-brand-purple'
                        : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Wyloguj się
          </button>
          <Link
            href="/"
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-zinc-500 hover:text-zinc-400 transition-colors text-sm"
          >
            ← Wróć do strony
          </Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-brand-bg/95 backdrop-blur border-b border-white/5">
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/admin/dashboard">
            <Image
              src={getImageUrl(IMAGES.logo)}
              alt="Ordoflow"
              width={120}
              height={30}
              className="h-7 w-auto"
            />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="px-4 pb-4 border-b border-white/5 bg-brand-bg">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-brand-purple/20 text-brand-purple'
                          : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div className="mt-4 pt-4 border-t border-white/5">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Wyloguj się
              </button>
            </div>
          </nav>
        )}
      </header>
    </>
  )
}
