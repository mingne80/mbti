"use client";

import { BarChart3, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { saveResult } from "@/lib/clientStore";
import { typeDescriptions } from "@/lib/questions";
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

  return (
    <PageShell>
      <section className="mx-auto max-w-3xl rounded-lg border border-line bg-white p-6 text-center shadow-lg">
        <p className="text-sm font-bold text-brand">{result.nickname}님의 결과</p>
        <h1 className="mt-3 text-6xl font-black text-ink">{result.mbti}</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-slate-700">{typeDescriptions[result.mbti]}</p>
        <p className="mt-4 rounded-md bg-panel px-4 py-3 text-sm text-slate-600">{status}</p>

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
      </section>
    </PageShell>
  );
}
