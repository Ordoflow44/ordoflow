'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getImageUrl, IMAGES } from '@/lib/supabase'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      setError('Brak tokenu resetowania hasła')
    }
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setError('Hasła nie są identyczne')
      return
    }

    if (password.length < 8) {
      setError('Hasło musi mieć co najmniej 8 znaków')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Wystąpił błąd')
        return
      }

      setSuccess(data.message)
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/admin')
      }, 3000)
    } catch (err) {
      setError('Wystąpił błąd podczas resetowania hasła')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <Image
              src={getImageUrl(IMAGES.logo)}
              alt="Ordoflow"
              width={180}
              height={50}
              className="h-12 w-auto mx-auto mb-4"
            />
          </Link>
          <h1 className="text-2xl font-bold text-white">Ustaw nowe hasło</h1>
          <p className="text-gray-400 mt-2">Wprowadź nowe hasło do swojego konta</p>
        </div>

        {/* Reset Password Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg text-sm">
                {success}
                <p className="mt-1 text-xs">Przekierowanie do logowania za 3 sekundy...</p>
              </div>
            )}

            {!success && token && (
              <>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Nowe hasło
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Minimum 8 znaków"
                    minLength={8}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-2">
                    Potwierdź hasło
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Powtórz hasło"
                    minLength={8}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 text-white font-medium rounded-lg transition-colors"
                >
                  {loading ? 'Zapisywanie...' : 'Ustaw nowe hasło'}
                </button>
              </>
            )}
          </div>
        </form>

        {/* Back to login link */}
        <div className="text-center mt-6">
          <Link 
            href="/admin" 
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            ← Wróć do logowania
          </Link>
        </div>
      </div>
    </div>
  )
}
