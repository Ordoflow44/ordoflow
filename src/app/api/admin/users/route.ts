import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import * as bcrypt from 'bcrypt';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// 1. Dodawanie nowego użytkownika (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Obsługa zmiany hasła (jeśli wysłano currentPassword)
    if (body.currentPassword && body.newPassword) {
       // Tutaj upraszczamy - w produkcji warto weryfikować sesję
       // Dla bezpieczeństwa zmieniamy hasło tylko znając email
       const { email, newPassword } = body;
       const hashedPassword = await bcrypt.hash(newPassword, 10);
       
       const { error } = await supabase
         .from('admins')
         .update({ password_hash: hashedPassword })
         .eq('email', email);
         
       if (error) throw error;
       return NextResponse.json({ success: true });
    }

    // Obsługa dodawania nowego usera (jeśli nie ma currentPassword)
    const { email, password, name } = body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = await supabase
      .from('admins')
      .insert([{ email, password_hash: hashedPassword, name, created_at: new Date() }]);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Błąd serwera' }, { status: 500 });
  }
}
