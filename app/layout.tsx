import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "유통/서비스실행그룹 MBTI 대시보드",
  description: "유통/서비스실행그룹을 위한 MBTI 테스트와 결과 대시보드"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
