import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 1. POBIERANIE USTAWIEŃ (GET)
export async function GET() {
  const { data, error } = await supabase.from('site_settings').select('*');
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Przerabiamy tablicę [{key: 'a', value: '1'}] na obiekt {a: '1'} dla łatwiejszej obsługi
  const settings = data.reduce((acc: any, item: any) => {
    acc[item.key] = item.value;
    return acc;
  }, {});

  return NextResponse.json(settings);
}

// 2. ZAPISYWANIE USTAWIEŃ (POST)
export async function POST(request: Request) {
  const body = await request.json();
  
  // Zapisujemy każdy klucz osobno (Upsert)
  const updates = Object.keys(body).map(key => ({
    key,
    value: body[key],
    updated_at: new Date()
  }));

  const { error } = await supabase
    .from('site_settings')
    .upsert(updates);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
