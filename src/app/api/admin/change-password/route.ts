import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import * as bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken'; // Upewnij się, że masz `npm install jsonwebtoken`

export async function PUT(request: Request) {
  const body = await request.json();
  const { currentPassword, newPassword } = body;

  // 1. Pobierz email z ciasteczka sesji
  const cookieStore = cookies();
  const token = cookieStore.get('admin_session')?.value;
  
  if (!token) return NextResponse.json({ error: 'Brak autoryzacji' }, { status: 401 });
  
  // Odkoduj token (zakładam, że w tokenie jest email - dostosuj SECRET)
  // UWAGA: Tutaj uproszczenie, w produkcji użyj process.env.JWT_SECRET
  const decoded: any = jwt.decode(token); 
  const email = decoded?.email;

  if (!email) return NextResponse.json({ error: 'Błąd sesji' }, { status: 401 });

  // 2. Pobierz usera z bazy
  const { data: user } = await supabase.from('admins').select('*').eq('email', email).single();
  
  if (!user) return NextResponse.json({ error: 'Użytkownik nie istnieje' }, { status: 404 });

  // 3. Sprawdź stare hasło
  const match = await bcrypt.compare(currentPassword, user.password_hash);
  if (!match) return NextResponse.json({ error: 'Obecne hasło jest nieprawidłowe' }, { status: 400 });

  // 4. Zapisz nowe hasło
  const newHash = await bcrypt.hash(newPassword, 10);
  const { error: updateError } = await supabase
    .from('admins')
    .update({ password_hash: newHash })
    .eq('email', email);

  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
