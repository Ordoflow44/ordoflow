import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';

export const revalidate = 0; // Zawsze świeża treść

export default async function PrivacyPolicyPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data } = await supabase
    .from('static_pages')
    .select('*')
    .eq('slug', 'privacy-policy')
    .single();

  if (!data) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">{data.title}</h1>
      <article 
        className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </main>
  );
}
