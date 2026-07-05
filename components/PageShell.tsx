import Link from "next/link";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between pb-6">
        <Link href="/" className="text-lg font-bold text-ink">
          유통/서비스실행그룹 MBTI
        </Link>
        <nav className="flex gap-2 text-sm font-medium">
          <Link className="rounded-md px-3 py-2 text-ink hover:bg-white/70" href="/test">
            테스트
          </Link>
          <Link className="rounded-md px-3 py-2 text-ink hover:bg-white/70" href="/dashboard">
            대시보드
          </Link>
          <Link className="rounded-md px-3 py-2 text-ink hover:bg-white/70" href="/admin">
            관리자
          </Link>
        </nav>
      </div>
      <div className="mx-auto max-w-6xl">{children}</div>
    </main>
  );
}
