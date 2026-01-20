import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Upewnij się, że masz ten import

// Pobieranie treści
export async function GET() {
  const { data, error } = await supabase
    .from('static_pages')
    .select('*')
    .eq('slug', 'privacy-policy')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// Aktualizacja treści
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
