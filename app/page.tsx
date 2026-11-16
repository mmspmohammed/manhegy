import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth');

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  const { data: units } = await supabase
    .from('units').select(`*, lessons (id, title, type, order_index)`)
    .eq('subject_id', '00000000-0000-0000-0000-000000000001').order('order_index');

  return (
    <div className="min-h-screen bg-[#131f2e] pb-20">
      <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2"><span className="text-3xl">🎓</span><span className="font-black text-xl text-[#1cb0f6]">مِنهجي</span></div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-xl border-2 border-orange-200"><span>🔥</span><span className="font-black text-orange-500">{profile?.streak || 0}</span></div>
            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-xl border-2 border-yellow-200"><span>⭐</span><span className="font-black text-yellow-600">{profile?.xp || 0}</span></div>
            <div className="flex items-center gap-1 bg-red-50 px-3 py-1.5 rounded-xl border-2 border-red-200"><span>❤️</span><span className="font-black text-red-500">{profile?.hearts || 5}</span></div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto py-10 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-white mb-2">الصف الأول - الدراسات الاجتماعية</h1>
          <p className="text-gray-400 font-bold">🌍 رحلة التعلم تبدأ من هنا</p>
        </div>

        <div className="space-y-16">
          {units?.map((unit: any) => (
            <div key={unit.id} className="relative">
              <div className="rounded-2xl p-6 mb-8 text-white shadow-lg border-b-4" style={{ backgroundColor: unit.color, borderColor: unit.color + '99' }}>
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{unit.icon}</span>
                  <div>
                    <div className="text-sm font-bold opacity-80">الوحدة {unit.order_index}</div>
                    <h2 className="text-2xl font-black">{unit.title}</h2>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-8 relative">
                <div className="absolute top-0 bottom-0 w-2 bg-gray-700 rounded-full -z-10" />
                {unit.lessons?.map((lesson: any, i: number) => {
                  const offset = i % 2 === 0 ? '-translate-x-24' : 'translate-x-24';
                  return (
                    <Link key={lesson.id} href={`/lesson/${lesson.id}`} className={`transform ${offset} transition-all duration-300 hover:scale-110 group`}>
                      <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-lg border-4 border-white group-hover:brightness-110 active:scale-95" style={{ backgroundColor: unit.color }}>
                        {i === 0 ? '⭐' : '📖'}
                      </div>
                      <div className="text-center mt-3 bg-gray-800 text-white px-4 py-2 rounded-xl font-black text-sm shadow-md whitespace-nowrap">{lesson.title}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}