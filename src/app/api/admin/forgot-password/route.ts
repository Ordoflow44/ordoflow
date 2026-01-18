import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email jest wymagany' },
        { status: 400 }
      )
    }

    // Find admin by email
    const { data: admin } = await supabaseAdmin
      .from('admins')
      .select('id, email')
      .eq('email', email.toLowerCase())
      .single()

    // Always return success to prevent email enumeration
    if (!admin) {
      return NextResponse.json({
        success: true,
        message: 'Jeśli konto istnieje, wysłaliśmy link do resetowania hasła'
      })
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // Delete any existing tokens for this admin
    await supabaseAdmin
      .from('password_reset_tokens')
      .delete()
      .eq('admin_id', admin.id)

    // Create new token
    await supabaseAdmin
      .from('password_reset_tokens')
      .insert({
        admin_id: admin.id,
        token,
        expires_at: expiresAt.toISOString()
      })

    // Build reset URL
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ordoflow.pl'
    const resetUrl = `${baseUrl}/admin/reset-password?token=${token}`

    // In production, you would send an email here
    // For now, we'll just log the reset URL
    console.log('=================================')
    console.log('PASSWORD RESET LINK:')
    console.log(resetUrl)
    console.log('=================================')

    // TODO: Send email with resetUrl
    // await sendEmail({
    //   to: admin.email,
    //   subject: 'Resetowanie hasła - Ordoflow',
    //   html: `<p>Kliknij <a href="${resetUrl}">tutaj</a> aby zresetować hasło.</p>`
    // })

    return NextResponse.json({
      success: true,
      message: 'Jeśli konto istnieje, wysłaliśmy link do resetowania hasła',
      // Remove this in production - only for testing
      ...(process.env.NODE_ENV === 'development' && { resetUrl })
    })

  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd' },
      { status: 500 }
    )
  }
}
