import Link from "next/link";

export default function CompletePage() {
  return (
    <section className="complete-card card">
      <div className="success-mark" aria-hidden="true">✓</div>
      <p className="eyebrow">إنجاز رائع</p>
      <h1>أتممت الدرس بنجاح!</h1>
      <p className="muted">كل خطوة تُحدث فرقاً. تابع التعلّم عندما تكون مستعداً.</p>
      <Link className="button" href="/">العودة إلى مسار التعلّم</Link>
    </section>
  );
}
