'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function CompletePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const xp = searchParams.get('xp') || '0';

  return (
    <div className="min-h-screen bg-[#131f2e] flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-10 text-center max-w-md w-full shadow-2xl border-b-8 border-[#58cc02]">
        <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-8xl mb-6">🏆</motion.div>
        <h1 className="text-4xl font-black text-gray-800 mb-2">أحسنت!</h1>
        <p className="text-gray-500 font-bold mb-8">لقد أكملت الدرس بنجاح</p>
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mb-8">
          <div className="text-sm font-bold text-yellow-700 uppercase mb-1">مجموع النقاط</div>
          <div className="text-5xl font-black text-yellow-500">+{xp} XP</div>
        </div>
        <button onClick={() => router.push('/')} className="w-full py-4 bg-[#58cc02] text-white rounded-2xl font-black text-xl hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-0 active:translate-y-1 transition-all">متابعة الرحلة 🚀</button>
      </motion.div>
    </div>
  );
}