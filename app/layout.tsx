import type { Metadata } from "next";
import { Cairo } from "next/font/google"; // خط عربي جميل
import "./globals.css";

const cairo = Cairo({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "مِنهجي - Duolingo للمناهج السورية",
  description: "تعلّم المنهج السوري بطريقة ممتعة وتفاعلية",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>{children}</body>
    </html>
  );
}