import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export const revalidate = 60; // Odświeżaj co minutę

export default async function PrivacyPolicyPage() {
  const { data } = await supabase
    .from('static_pages')
    .select('*')
    .eq('slug', 'privacy-policy')
    .single();

  if (!data) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{data.title}</h1>
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </main>
  );
}
