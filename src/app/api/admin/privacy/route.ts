import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Konfiguracja klienta Supabase dla API
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// 1. Pobieranie treści (GET)
export async function GET() {
  const { data, error } = await supabase
    .from('static_pages')
    .select('*')
    .eq('slug', 'privacy-policy')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// 2. Aktualizacja treści (PUT)
export async function PUT(request: Request) {
  const body = await request.json();
  const { content } = body;

  const { error } = await supabase
    .from('static_pages')
    .update({ content, updated_at: new Date() })
    .eq('slug', 'privacy-policy');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
