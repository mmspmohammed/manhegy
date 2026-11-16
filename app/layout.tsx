import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "منهجي | طريقك للتعلّم",
  description: "منصة عربية تساعدك على التعلّم خطوة بخطوة.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <header className="site-header">
          <a className="brand" href="/">منهجي</a>
          <nav aria-label="التنقل الرئيسي">
            <a href="/">مسار التعلّم</a>
            <a href="/auth">تسجيل الدخول</a>
          </nav>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
