"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { isLocalMode } from "@/lib/clientStore";

export default function HomePage() {
  const router = useRouter();
  const [nickname, setNickname] = useState(() =>
    typeof window === "undefined" ? "" : window.sessionStorage.getItem("mbti-nickname") ?? ""
  );

  function start(event: FormEvent) {
    event.preventDefault();
    const trimmed = nickname.trim();
    if (!trimmed) return;
    window.sessionStorage.setItem("mbti-nickname", trimmed);
    router.push("/test");
  }

  return (
    <PageShell>
      <section className="grid min-h-[calc(100vh-112px)] items-center gap-8 pb-12 lg:grid-cols-[1fr_420px]">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-brand">Distribution/service execution group dashboard</p>
          <h1 className="text-5xl font-black leading-tight text-ink sm:text-6xl">유통/서비스실행그룹 MBTI 테스트</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
            닉네임으로 간단한 테스트를 진행하고, 유통/서비스실행그룹 전체의 MBTI 분포를 한 화면에서 확인합니다.
          </p>
          <div className="mt-6 inline-flex rounded-md border border-line bg-white/85 px-3 py-2 text-sm font-medium text-slate-700">
            현재 저장 방식: {isLocalMode() ? "현재 기기 임시 저장" : "공유 저장소"}
          </div>
        </div>

        <form onSubmit={start} className="rounded-lg border border-line bg-white p-6 shadow-lg">
          <label className="block text-sm font-bold text-ink" htmlFor="nickname">
            닉네임
          </label>
          <input
            id="nickname"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            className="mt-2 h-12 w-full rounded-md border border-line px-4 outline-none ring-brand/30 transition focus:ring-4"
            maxLength={24}
            placeholder="예: 민지"
          />
          <p className="mt-3 text-sm leading-6 text-slate-600">
            같은 닉네임으로 다시 제출하면 기존 결과가 새 결과로 갱신됩니다.
          </p>
          <PrimaryButton className="mt-5 w-full gap-2" disabled={!nickname.trim()}>
            테스트 시작 <ArrowRight size={18} />
          </PrimaryButton>
        </form>
      </section>
    </PageShell>
  );
}


