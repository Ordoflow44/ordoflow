'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Lock, ArrowRight, AlertCircle } from 'lucide-react'
import { getImageUrl, IMAGES } from '@/lib/supabase'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/admin/dashboard')
      } else {
        setError('Nieprawidłowe hasło')
      }
    } catch (err) {
      setError('Wystąpił błąd. Spróbuj ponownie.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Image
            src={getImageUrl(IMAGES.logo)}
            alt="Ordoflow"
            width={160}
            height={40}
            className="h-10 w-auto mx-auto mb-6"
          />
          <h1 className="text-2xl font-semibold text-white mb-2">
            Panel Admina
          </h1>
          <p className="text-zinc-400 text-sm">
            Wprowadź hasło, aby kontynuować
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="sr-only">
              Hasło
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-zinc-500" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Hasło"
                className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple"
                required
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logowanie...' : 'Zaloguj się'}
            {!isLoading && <ArrowRight className="ml-2 w-4 h-4" />}
          </button>
        </form>

        {/* Back Link */}
        <p className="text-center mt-8">
          <a
            href="/"
            className="text-sm text-zinc-500 hover:text-white transition-colors"
          >
            ← Powrót do strony głównej
          </a>
        </p>
      </div>
    </div>
  )
}
