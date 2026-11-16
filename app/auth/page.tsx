"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const supabase = createClient();
    const result = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    setMessage(result.error?.message ?? (isSignUp ? "تحقّق من بريدك الإلكتروني لإكمال إنشاء الحساب." : "تم تسجيل الدخول بنجاح."));
  }

  return (
    <section className="auth-card card">
      <p className="eyebrow">أهلاً بك في منهجي</p>
      <h1>{isSignUp ? "أنشئ حسابك" : "سجّل الدخول"}</h1>
      <p className="muted">احفظ تقدّمك وتابع رحلتك التعليمية.</p>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="email">البريد الإلكتروني</label>
        <input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
        <label htmlFor="password">كلمة المرور</label>
        <input id="password" type="password" autoComplete={isSignUp ? "new-password" : "current-password"} minLength={6} required value={password} onChange={(event) => setPassword(event.target.value)} />
        <button className="button" type="submit" disabled={busy}>{busy ? "لحظة من فضلك…" : isSignUp ? "إنشاء حساب" : "دخول"}</button>
      </form>
      {message && <p className="notice" role="status">{message}</p>}
      <button className="switch-button" type="button" onClick={() => { setIsSignUp(!isSignUp); setMessage(""); }}>
        {isSignUp ? "لديك حساب؟ سجّل الدخول" : "ليس لديك حساب؟ أنشئ حساباً"}
      </button>
    </section>
  );
}
