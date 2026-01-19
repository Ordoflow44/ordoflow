import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.supabase_service_role_key
  
  if (!url || !key) {
    throw new Error('Missing Supabase credentials')
  }
  
  return createClient(url, key)
}

// Funkcja pomocnicza do tworzenia sesji
async function createAdminSession(admin: any) {
  const sessionToken = Buffer.from(
    JSON.stringify({
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
    })
  ).toString('base64')

  const cookieStore = await cookies()
  cookieStore.set('admin_session', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  })

  return {
    success: true,
    admin: {
      id: admin.id,
      email: admin.email,
      name: admin.name
    }
  }
}

// Email/hasło login
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email i hasło są wymagane' },
        { status: 400 }
      )
    }

    let supabaseAdmin
    try {
      supabaseAdmin = getSupabaseAdmin()
    } catch (e) {
      console.error('Supabase config error:', e)
      return NextResponse.json(
        { error: 'Błąd konfiguracji serwera' },
        { status: 500 }
      )
    }

    // Find admin by email
    const { data: admin, error } = await supabaseAdmin
      .from('admins')
      .select('*')
      .eq('email', email.toLowerCase())
      .single()

    if (error || !admin) {
      console.error('Admin not found:', error)
      return NextResponse.json(
        { error: 'Nieprawidłowy email lub hasło' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password_hash)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Nieprawidłowy email lub hasło' },
        { status: 401 }
      )
    }

    // Update last login
    await supabaseAdmin
      .from('admins')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', admin.id)

    const response = await createAdminSession(admin)
    return NextResponse.json(response)

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas logowania' },
      { status: 500 }
    )
  }
}

// Google OAuth callback
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    if (!code) {
      return NextResponse.json(
        { error: 'Brak kodu autoryzacyjnego' },
        { status: 400 }
      )
    }

    let supabaseAdmin
    try {
      supabaseAdmin = getSupabaseAdmin()
    } catch (e) {
      console.error('Supabase config error:', e)
      return NextResponse.json(
        { error: 'Błąd konfiguracji serwera' },
        { status: 500 }
      )
    }

    // Exchange code for session using Supabase auth
    const supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: authData, error: authError } = await supabaseClient.auth.exchangeCodeForSession(code)

    if (authError || !authData?.user) {
      console.error('Auth exchange error:', authError)
      return NextResponse.json(
        { error: 'Błąd uwierzytelniania' },
        { status: 401 }
      )
    }

    // Find or create admin by Google email
    const { data: admin, error: findError } = await supabaseAdmin
      .from('admins')
      .select('*')
      .eq('email', authData.user.email)
      .single()

    let adminData = admin

    if (findError || !admin) {
      // Create new admin from Google user
      const { data: newAdmin, error: createError } = await supabaseAdmin
        .from('admins')
        .insert([
          {
            email: authData.user.email,
            name: authData.user.user_metadata?.name || authData.user.email,
            password_hash: 'google_oauth', // Placeholder - no password for OAuth users
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select()
        .single()

      if (createError) {
        console.error('Admin creation error:', createError)
        return NextResponse.json(
          { error: 'Błąd tworzenia konta' },
          { status: 500 }
        )
      }

      adminData = newAdmin
    }

    // Update last login
    await supabaseAdmin
      .from('admins')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', adminData.id)

    const response = await createAdminSession(adminData)
    
    // Redirect to admin dashboard
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))

  } catch (error) {
    console.error('Google OAuth callback error:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas logowania przez Google' },
      { status: 500 }
    )
  }
}
