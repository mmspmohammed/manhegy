'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Heart, X, Check, XCircle } from 'lucide-react';

export default function LessonClient({ lesson, questions, userId }: any) {
  const router = useRouter();
  const supabase = createClient();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [hearts, setHearts] = useState(5);
  const [xp, setXp] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const question = questions?.[currentQ];
  const progress = questions ? ((currentQ) / questions.length) * 100 : 0;

  const checkAnswer = () => {
    if (!selected || !question) return;
    const correct = selected === question.correct_answer;
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) setXp(xp + 10); else setHearts(hearts - 1);
  };

  const nextQuestion = async () => {
    setShowFeedback(false);
    setSelected(null);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      await supabase.from('progress').upsert({ user_id: userId, lesson_id: lesson.id, completed: true, score: xp + 10, attempts: 1 });
      const { data } = await supabase.from('profiles').select('xp').eq('id', userId).single();
      await supabase.from('profiles').update({ xp: (data?.xp || 0) + xp + 10 }).eq('id', userId);
      router.push(`/complete?xp=${xp + 10}`);
    }
  };

  if (hearts <= 0) return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 text-center max-w-md shadow-xl border-b-8 border-red-200">
        <div className="text-7xl mb-4">💔</div>
        <h2 className="text-3xl font-black text-gray-800 mb-2">انتهت القلوب!</h2>
        <button onClick={() => router.push('/')} className="w-full py-4 bg-[#1cb0f6] text-white rounded-2xl font-black text-lg mt-6">العودة للرئيسية</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#131f2e] pb-40">
      <div className="sticky top-0 bg-[#131f2e] z-50 p-4 border-b border-gray-800">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button onClick={() => router.push('/')} className="text-gray-400 hover:text-white"><X size={28} /></button>
          <div className="flex-1 bg-gray-700 rounded-full h-4 overflow-hidden">
            <div className="bg-[#58cc02] h-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex items-center gap-1"><Heart className="fill-red-500 text-red-500" size={24} /><span className="font-black text-white text-lg">{hearts}</span></div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6 mt-4">
        <div className="bg-white rounded-3xl p-8 min-h-[400px] shadow-xl">
          <div className="flex items-center gap-3 mb-6"><span className="text-4xl">{lesson?.units?.icon}</span><span className="text-sm font-bold text-gray-500">{lesson?.units?.title}</span></div>
          <h2 className="text-2xl font-black text-gray-800 mb-8 leading-relaxed">{question?.prompt}</h2>

          {question?.type === 'mcq' && question?.options && (
            <div className="grid grid-cols-1 gap-3">
              {(question.options as string[]).map((opt, i) => (
                <button key={i} onClick={() => !showFeedback && setSelected(opt)}
                  className={`p-5 rounded-2xl border-2 text-right text-lg font-bold transition-all active:scale-98 ${selected === opt ? 'border-[#1cb0f6] bg-[#ddf4ff] text-[#1cb0f6]' : showFeedback && opt === question.correct_answer ? 'border-[#58cc02] bg-[#d7ffb8] text-[#46a302]' : showFeedback && opt === selected ? 'border-[#ff4b4b] bg-[#ffdfe0] text-[#ea2b2b]' : 'border-gray-200 hover:bg-gray-50 text-gray-700'}`}>
                  {opt}
                </button>
              ))}
            </div>
          )}

          {question?.type === 'true_false' && (
            <div className="grid grid-cols-2 gap-4">
              {['صح', 'خطأ'].map(opt => (
                <button key={opt} onClick={() => !showFeedback && setSelected(opt)}
                  className={`p-6 rounded-2xl border-2 text-xl font-black transition-all active:scale-98 ${selected === opt ? 'border-[#1cb0f6] bg-[#ddf4ff] text-[#1cb0f6]' : showFeedback && opt === question.correct_answer ? 'border-[#58cc02] bg-[#d7ffb8] text-[#46a302]' : showFeedback && opt === selected ? 'border-[#ff4b4b] bg-[#ffdfe0] text-[#ea2b2b]' : 'border-gray-200 hover:bg-gray-50 text-gray-700'}`}>
                  {opt === 'صح' ? '✅' : '❌'} {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={`fixed bottom-0 left-0 right-0 p-6 border-t-4 transition-all duration-300 ${showFeedback ? (isCorrect ? 'bg-[#d7ffb8] border-[#58cc02]' : 'bg-[#ffdfe0] border-[#ff4b4b]') : 'bg-white border-gray-200'}`}>
        <div className="max-w-2xl mx-auto">
          {showFeedback && (
            <div className="mb-4 flex items-start gap-3">
              {isCorrect ? (
                <><Check className="text-[#58cc02] flex-shrink-0 mt-1" size={32} /><div><h3 className="text-2xl font-black text-[#46a302]">أحسنت! إجابة صحيحة 🎉</h3><p className="text-gray-700 font-medium mt-1">{question.explanation}</p></div></>
              ) : (
                <><XCircle className="text-[#ea2b2b] flex-shrink-0 mt-1" size={32} /><div><h3 className="text-2xl font-black text-[#ea2b2b]">إجابة خاطئة</h3><p className="text-gray-800 font-bold mt-1">الإجابة الصحيحة: {question.correct_answer}</p><p className="text-gray-600 font-medium text-sm mt-1">{question.explanation}</p></div></>
              )}
            </div>
          )}
          <button onClick={showFeedback ? nextQuestion : checkAnswer} disabled={!selected}
            className={`w-full py-4 rounded-2xl font-black text-lg text-white transition-all active:scale-98 ${!selected ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : showFeedback ? (isCorrect ? 'bg-[#58cc02] border-b-4 border-[#46a302]' : 'bg-[#ff4b4b] border-b-4 border-[#ea2b2b]') : 'bg-[#58cc02] border-b-4 border-[#46a302]'}`}>
            {showFeedback ? 'متابعة ←' : 'تحقق'}
          </button>
        </div>
      </div>
    </div>
  );
}