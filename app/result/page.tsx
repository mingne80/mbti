"use client";

import { BarChart3, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MbtiLifeDetails } from "@/components/MbtiLifeDetails";
import { PageShell } from "@/components/PageShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { saveResult } from "@/lib/clientStore";
import { mbtiProfiles } from "@/lib/mbtiProfiles";
import type { MbtiType, Scores } from "@/lib/types";

type SessionResult = {
  nickname: string;
  mbti: MbtiType;
  scores: Scores;
};

function readSessionResult() {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem("mbti-result");
  return raw ? (JSON.parse(raw) as SessionResult) : null;
}

export default function ResultPage() {
  const router = useRouter();
  const savedRef = useRef(false);
  const [result] = useState<SessionResult | null>(readSessionResult);
  const [status, setStatus] = useState("결과 저장 중");

  useEffect(() => {
    if (!result) {
      router.replace("/");
      return;
    }

    if (!savedRef.current) {
      savedRef.current = true;
      saveResult(result)
        .then(() => setStatus("결과가 저장되었습니다."))
        .catch((error) => setStatus(error instanceof Error ? error.message : "결과 저장에 실패했습니다."));
    }
  }, [result, router]);

  if (!result) return null;

  const profile = mbtiProfiles[result.mbti];

  return (
    <PageShell>
      <section className="mx-auto max-w-4xl overflow-hidden rounded-lg border border-line bg-white shadow-lg">
        <div className="grid gap-0 lg:grid-cols-[300px_1fr]">
          <div className="flex min-h-72 items-center justify-center p-8" style={{ backgroundColor: profile.accent }}>
            <div className="text-center text-white">
              <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-white/20 text-7xl shadow-inner" role="img" aria-label={profile.imageLabel}>
                {profile.image}
              </div>
              <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-white/80">{result.nickname}님의 결과</p>
              <h1 className="mt-2 text-6xl font-black">{result.mbti}</h1>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-sm font-bold text-brand">{profile.shortDescription}</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-ink">{profile.nickname}</h2>
            <p className="mt-5 rounded-md bg-panel px-4 py-4 text-left text-base leading-8 text-slate-700">{profile.longDescription}</p>
            <MbtiLifeDetails type={result.mbti} />
            <p className="mt-4 rounded-md border border-line px-4 py-3 text-sm text-slate-600">{status}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link href="/dashboard">
                <PrimaryButton className="w-full gap-2">
                  <BarChart3 size={18} /> 대시보드 보기
                </PrimaryButton>
              </Link>
              <Link href="/test">
                <button className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-line bg-white px-5 py-2.5 font-semibold text-ink transition hover:bg-panel">
                  <RotateCcw size={18} /> 다시 테스트
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
