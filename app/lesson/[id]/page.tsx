import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import LessonClient from './LessonClient';

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth');

  const { data: lesson } = await supabase.from('lessons').select('*, units(title, icon, color)').eq('id', id).single();
  const { data: questions } = await supabase.from('questions').select('*').eq('lesson_id', id).order('order_index');

  if (!lesson || !questions) redirect('/');
  return <LessonClient lesson={lesson} questions={questions} userId={user.id} />;
}