"use client";

import Link from "next/link";
import { useState } from "react";

export default function LessonClient({ lessonId }: { lessonId: string }) {
  const [completed, setCompleted] = useState(false);

  return (
    <article className="lesson-detail card">
      <Link className="text-link" href="/">← العودة إلى مسار التعلّم</Link>
      <p className="eyebrow">الدرس {lessonId}</p>
      <h1>ابدأ رحلتك التعليمية</h1>
      <p className="muted">أهلاً بك! هذا مكانك لتتعلّم بهدوء وتتقدّم خطوة بخطوة. يمكنك لاحقاً استبدال هذا المحتوى بدروسك الخاصة.</p>
      <div className="lesson-body">
        <h2>خطوتك الأولى</h2>
        <p>اختر هدفاً صغيراً وواضحاً، ثم خصّص له وقتاً مناسباً. الاستمرارية أهم من إنجاز كل شيء دفعة واحدة.</p>
      </div>
      {completed ? <p className="notice" role="status">أحسنت! أتممت هذا الدرس.</p> : <Link className="button" href="/complete" onClick={() => setCompleted(true)}>إكمال الدرس</Link>}
    </article>
  );
}
