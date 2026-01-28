import { NextRequest, NextResponse } from 'next/server'

// Mark as dynamic to prevent build-time execution
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
    try {
          // Placeholder - will be replaced with PocketBase implementation
      const { email } = await request.json()

      if (!email) {
              return NextResponse.json(
                { error: 'Email jest wymagany' },
                { status: 400 }
                      )
      }

      // Return success response for now
      return NextResponse.json({
              success: true,
              message: 'Funkcja reset hasła jest obecnie niedostępna. Skontaktuj się z administratorem.'
      })
    } catch (error) {
          console.error('Forgot password error:', error)
          return NextResponse.json(
            { error: 'Wystąpił błąd' },
            { status: 500 }
                )
    }
}
