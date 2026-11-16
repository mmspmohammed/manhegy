'use client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@/lib/supabase/client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') router.push('/');
    });
    return () => subscription.unsubscribe();
  }, [router, supabase]);

  return (
    <div className="min-h-screen bg-[#1cb0f6] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl border-b-8 border-[#1480c4]">
        <div className="text-center mb-8">
          <div className="text-7xl mb-4 animate-bounce">🎓</div>
          <h1 className="text-4xl font-black text-gray-800">مِنهجي</h1>
          <p className="text-gray-500 mt-2 font-bold">رفيقك الذكي للمناهج السورية</p>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            variables: { default: { colors: { brand: '#58cc02', brandAccent: '#46a302' } } },
            className: { button: 'font-bold rounded-2xl py-3 text-lg', input: 'rounded-xl py-3 text-right' }
          }}
          providers={[]}
          localization={{
            variables: {
              sign_in: { email_label: 'البريد الإلكتروني', password_label: 'كلمة المرور', button_label: 'تسجيل الدخول', link_text: 'ليس لديك حساب؟ أنشئ حساباً جديداً' },
              sign_up: { email_label: 'البريد الإلكتروني', password_label: 'كلمة المرور', button_label: 'إنشاء حساب', link_text: 'لديك حساب بالفعل؟ سجل دخولك' }
            }
          }}
        />
      </div>
    </div>
  );
}