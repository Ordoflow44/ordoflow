'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getImageUrl, IMAGES } from '@/lib/supabase'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Błąd logowania')
        return
      }

      router.push('/admin/dashboard')
    } catch (err) {
      setError('Wystąpił błąd podczas logowania')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setForgotPasswordMessage('')
    setLoading(true)

    try {
      const response = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotPasswordEmail }),
      })

      const data = await response.json()
      setForgotPasswordMessage(data.message || 'Sprawdź swoją skrzynkę email')
      
      // If in development, show the reset URL
      if (data.resetUrl) {
        console.log('Reset URL:', data.resetUrl)
      }
    } catch (err) {
      setForgotPasswordMessage('Wystąpił błąd')
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
          <h1 className="text-2xl font-bold text-white">Panel Administracyjny</h1>
          <p className="text-gray-400 mt-2">Zaloguj się, aby zarządzać stroną</p>
        </div>

        {/* Login Form */}
        {!showForgotPassword ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="admin@ordoflow.pl"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Hasło
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 text-white font-medium rounded-lg transition-colors"
              >
                {loading ? 'Logowanie...' : 'Zaloguj się'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Nie pamiętasz hasła?
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Forgot Password Form */
          <form onSubmit={handleForgotPassword} className="space-y-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Resetowanie hasła</h2>
                <p className="text-gray-400 text-sm">
                  Podaj swój adres email, a wyślemy Ci link do resetowania hasła.
                </p>
              </div>

              {forgotPasswordMessage && (
                <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg text-sm">
                  {forgotPasswordMessage}
                </div>
              )}

              <div>
                <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="forgot-email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="admin@ordoflow.pl"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 text-white font-medium rounded-lg transition-colors"
              >
                {loading ? 'Wysyłanie...' : 'Wyślij link resetujący'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(false)
                    setForgotPasswordMessage('')
                  }}
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  ← Wróć do logowania
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Back to site link */}
        <div className="text-center mt-6">
          <Link 
            href="/" 
            className="text-sm text-gray-500 hover:text-gray-400 transition-colors"
          >
            ← Wróć na stronę główną
          </Link>
        </div>
      </div>
    </div>
  )
}
