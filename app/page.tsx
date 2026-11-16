import Link from "next/link";

const lessons = [
  { id: "1", title: "ابدأ رحلتك", description: "تعرّف على أساسيات التعلّم خطوة بخطوة.", status: "متاح الآن" },
  { id: "2", title: "ابنِ عادتك", description: "خطوات بسيطة تساعدك على الاستمرار كل يوم.", status: "قريباً" },
  { id: "3", title: "راجع تقدّمك", description: "احتفل بما أنجزته وخطّط للمرحلة القادمة.", status: "قريباً" },
];

export default function HomePage() {
  return (
    <div className="page-stack">
      <section className="hero card">
        <p className="eyebrow">تعلّم على طريقتك</p>
        <h1>كل خطوة صغيرة تقرّبك من هدفك.</h1>
        <p className="muted">مسار تعلّم عربي واضح، يساعدك على التقدّم درساً بعد درس.</p>
        <Link className="button" href="/lesson/1">ابدأ أول درس</Link>
      </section>

      <section aria-labelledby="path-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">مسارك</p>
            <h2 id="path-title">رحلتك التعليمية</h2>
          </div>
          <span className="progress-label">٠ من ٣ دروس مكتملة</span>
        </div>
        <div className="lesson-list">
          {lessons.map((lesson, index) => (
            <article className="lesson-card card" key={lesson.id}>
              <span className={`lesson-number ${index === 0 ? "active" : ""}`}>{index + 1}</span>
              <div className="lesson-copy">
                <span className="eyebrow">{lesson.status}</span>
                <h3>{lesson.title}</h3>
                <p className="muted">{lesson.description}</p>
              </div>
              {index === 0 ? <Link className="text-link" href={`/lesson/${lesson.id}`}>افتح الدرس ←</Link> : <span className="muted">🔒</span>}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
