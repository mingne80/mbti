"use client";

import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { calculateMbti, calculateScores, questions } from "@/lib/questions";

const scale = [
  { value: 1, label: "전혀 아님" },
  { value: 2, label: "아님" },
  { value: 3, label: "보통" },
  { value: 4, label: "그럼" },
  { value: 5, label: "매우 그럼" }
];

export default function TestPage() {
  const router = useRouter();
  const [nickname] = useState(() => (typeof window === "undefined" ? "" : window.sessionStorage.getItem("mbti-nickname") ?? ""));
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  useEffect(() => {
    if (!nickname) router.replace("/");
  }, [nickname, router]);

  const canSubmit = answeredCount === questions.length;

  const groupedQuestions = useMemo(
    () => [
      { title: "에너지 방향", items: questions.filter((question) => question.axis === "EI") },
      { title: "정보 인식", items: questions.filter((question) => question.axis === "SN") },
      { title: "판단 기준", items: questions.filter((question) => question.axis === "TF") },
      { title: "생활 방식", items: questions.filter((question) => question.axis === "JP") }
    ],
    []
  );

  function submit() {
    const scores = calculateScores(answers);
    const mbti = calculateMbti(scores);
    window.sessionStorage.setItem("mbti-result", JSON.stringify({ nickname, scores, mbti }));
    router.push("/result");
  }

  return (
    <PageShell>
      <div className="mb-5 rounded-lg border border-line bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-ink">{nickname}님의 테스트</h1>
            <p className="mt-1 text-sm text-slate-600">{answeredCount}/{questions.length}개 문항 완료</p>
          </div>
          <PrimaryButton onClick={submit} disabled={!canSubmit} className="gap-2">
            <CheckCircle2 size={18} /> 결과 보기
          </PrimaryButton>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-coral transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="grid gap-4">
        {groupedQuestions.map((group) => (
          <section key={group.title} className="rounded-lg border border-line bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-ink">{group.title}</h2>
            <div className="grid gap-4">
              {group.items.map((question) => (
                <article key={question.id} className="rounded-md bg-panel p-4">
                  <p className="font-semibold leading-7 text-ink">
                    {question.id}. {question.prompt}
                  </p>
                  <div className="mt-4 grid grid-cols-5 gap-2">
                    {scale.map((item) => {
                      const selected = answers[question.id] === item.value;
                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: item.value }))}
                          className={[
                            "min-h-12 rounded-md border px-2 text-sm font-semibold transition",
                            selected ? "border-brand bg-brand text-white" : "border-line bg-white text-slate-700 hover:border-brand"
                          ].join(" ")}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
