"use client";

import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { DonutChart } from "@/components/DonutChart";
import { PageShell } from "@/components/PageShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { getStats, isLocalMode, listResults } from "@/lib/clientStore";
import { allTypes } from "@/lib/questions";
import type { ResultRecord, Stats } from "@/lib/types";

export default function DashboardPage() {
  const [results, setResults] = useState<ResultRecord[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    try {
      const [nextResults, nextStats] = await Promise.all([listResults(), getStats()]);
      setResults(nextResults);
      setStats(nextStats);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "대시보드를 불러오지 못했습니다.");
    }
  }

  useEffect(() => {
    Promise.all([listResults(), getStats()])
      .then(([nextResults, nextStats]) => {
        setResults(nextResults);
        setStats(nextStats);
      })
      .catch((loadError) => {
        setError(loadError instanceof Error ? loadError.message : "대시보드를 불러오지 못했습니다.");
      });
  }, []);

  return (
    <PageShell>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-white p-4 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-ink">유통/서비스실행그룹 MBTI 대시보드</h1>
          <p className="mt-1 text-sm text-slate-600">
            {isLocalMode() ? "현재 브라우저 localStorage 기준" : "Postgres 중앙 DB 기준"} · 총 {results.length}명
          </p>
        </div>
        <PrimaryButton onClick={load} className="gap-2">
          <RefreshCcw size={18} /> 새로고침
        </PrimaryButton>
      </div>

      {error ? <div className="mb-5 rounded-md border border-coral bg-white p-4 font-semibold text-coral">{error}</div> : null}

      <section className="mb-5 overflow-hidden rounded-lg border border-line bg-white shadow-sm">
        <div className="border-b border-line px-4 py-3">
          <h2 className="font-bold text-ink">구성원 결과</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-left text-sm">
            <thead className="bg-panel text-slate-600">
              <tr>
                <th className="px-4 py-3">닉네임</th>
                <th className="px-4 py-3">MBTI</th>
                <th className="px-4 py-3">검사일</th>
              </tr>
            </thead>
            <tbody>
              {results.length === 0 ? (
                <tr>
                  <td className="px-4 py-8 text-center text-slate-500" colSpan={3}>
                    아직 저장된 결과가 없습니다.
                  </td>
                </tr>
              ) : (
                results.map((result) => (
                  <tr key={result.id} className="border-t border-line">
                    <td className="px-4 py-3 font-semibold text-ink">{result.nickname}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-md bg-brand/10 px-2 py-1 font-bold text-brand">{result.mbti}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{new Date(result.createdAt).toLocaleString("ko-KR")}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {stats ? (
        <div className="grid gap-4 md:grid-cols-2">
          <DonutChart
            title="16유형 분포"
            labels={allTypes}
            values={allTypes.map((type) => stats.byType[type])}
            colors={[
              "#2F6F73",
              "#D96C5F",
              "#D89B32",
              "#7B5EA7",
              "#5E8C61",
              "#496A81",
              "#B85C38",
              "#8D6E63",
              "#4F86C6",
              "#C08497",
              "#7A9E9F",
              "#E09F3E",
              "#6D597A",
              "#355070",
              "#A44A3F",
              "#588157"
            ]}
          />
          <DonutChart title="E / I" labels={["외향 E", "내향 I"]} values={[stats.byAxis.EI.E, stats.byAxis.EI.I]} colors={["#2F6F73", "#D96C5F"]} />
          <DonutChart title="S / N" labels={["감각 S", "직관 N"]} values={[stats.byAxis.SN.S, stats.byAxis.SN.N]} colors={["#D89B32", "#7B5EA7"]} />
          <DonutChart title="T / F" labels={["사고 T", "감정 F"]} values={[stats.byAxis.TF.T, stats.byAxis.TF.F]} colors={["#496A81", "#C08497"]} />
          <DonutChart title="J / P" labels={["판단 J", "인식 P"]} values={[stats.byAxis.JP.J, stats.byAxis.JP.P]} colors={["#5E8C61", "#B85C38"]} />
        </div>
      ) : null}
    </PageShell>
  );
}

