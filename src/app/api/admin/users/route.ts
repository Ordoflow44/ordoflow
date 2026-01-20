import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import * as bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password, name } = body;

  // Hashowanie hasła
  const hashedPassword = await bcrypt.hash(password, 10);

  const { error } = await supabase
    .from('admins')
    .insert([{ email, password_hash: hashedPassword, name, created_at: new Date() }]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
