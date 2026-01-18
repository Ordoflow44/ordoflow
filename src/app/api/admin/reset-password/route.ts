import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.supabase_service_role_key

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  serviceRoleKey!
)

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token i hasło są wymagane' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Hasło musi mieć co najmniej 8 znaków' },
        { status: 400 }
      )
    }

    // Find valid token
    const { data: resetToken, error: tokenError } = await supabaseAdmin
      .from('password_reset_tokens')
      .select('*, admins(*)')
      .eq('token', token)
      .is('used_at', null)
      .gte('expires_at', new Date().toISOString())
      .single()

    if (tokenError || !resetToken) {
      return NextResponse.json(
        { error: 'Nieprawidłowy lub wygasły link do resetowania hasła' },
        { status: 400 }
      )
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(password, 10)

    // Update admin password
    const { error: updateError } = await supabaseAdmin
      .from('admins')
      .update({ password_hash: passwordHash })
      .eq('id', resetToken.admin_id)

    if (updateError) {
      throw updateError
    }

    // Mark token as used
    await supabaseAdmin
      .from('password_reset_tokens')
      .update({ used_at: new Date().toISOString() })
      .eq('id', resetToken.id)

    return NextResponse.json({
      success: true,
      message: 'Hasło zostało zmienione. Możesz się teraz zalogować.'
    })

  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas resetowania hasła' },
      { status: 500 }
    )
  }
}
