"use client";

import { ExternalLink, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DonutChart } from "@/components/DonutChart";
import { PageShell } from "@/components/PageShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { getStats, isLocalMode, listResults } from "@/lib/clientStore";
import { mbtiProfiles } from "@/lib/mbtiProfiles";
import { allTypes } from "@/lib/questions";
import type { ResultRecord, Stats } from "@/lib/types";

const axisGuides = [
  {
    title: "E / I : 에너지를 얻는 방향",
    left: "E는 사람과 상황 속에서 에너지가 살아나는 쪽입니다. 회의에서 말하면서 생각이 정리되고, 아이디어가 오갈수록 속도가 붙는 편입니다.",
    right: "I는 혼자 정리하는 시간에서 에너지가 회복되는 쪽입니다. 말하기 전에 머릿속으로 구조를 세우고, 조용한 환경에서 판단이 더 선명해지는 편입니다.",
    example: "예를 들어 새 프로젝트가 시작되면 E는 먼저 사람들을 모아 이야기를 굴려보고, I는 자료를 읽고 맥락을 잡은 뒤 핵심 의견을 내는 식으로 강점이 다르게 나타납니다."
  },
  {
    title: "S / N : 정보를 받아들이는 방식",
    left: "S는 실제로 보이고 확인되는 정보에 강합니다. 숫자, 사례, 절차, 지금 눈앞의 조건을 바탕으로 판단합니다.",
    right: "N은 보이지 않는 가능성과 패턴에 강합니다. 현재 사실 너머의 의미, 연결성, 앞으로 벌어질 수 있는 시나리오를 먼저 떠올립니다.",
    example: "누가 '서부 술집에 말이 들어와서 한마디 한다면?'이라고 물으면 S는 '말이 왜 술집에 들어와? 구조상 문 높이는 맞아?'처럼 현실 조건을 먼저 점검할 수 있습니다. N은 '말이 현상금 사냥꾼이면 어떨까, 사실 보안관보다 말을 잘한다면?'처럼 장면의 가능성을 먼저 확장합니다. 둘 다 필요합니다. S는 실행 가능성을 지키고, N은 새로운 해석의 문을 엽니다."
  },
  {
    title: "T / F : 판단할 때 우선 보는 기준",
    left: "T는 원칙, 논리, 일관성을 먼저 봅니다. 개인의 선호보다 기준이 맞는지, 결정이 재현 가능한지에 민감합니다.",
    right: "F는 사람, 관계, 수용 가능성을 먼저 봅니다. 맞는 말이어도 어떻게 전달해야 움직일 수 있는지, 결정이 사람에게 어떤 영향을 주는지 살핍니다.",
    example: "문제가 생겼을 때 T는 '원인이 무엇이고 기준상 어떻게 처리해야 하지?'를 먼저 묻고, F는 '관련된 사람이 이 결정을 어떻게 받아들일까?'를 함께 봅니다. 좋은 의사결정은 보통 두 관점이 만날 때 단단해집니다."
  },
  {
    title: "J / P : 일을 다루는 리듬",
    left: "J는 정리된 계획과 마감이 있을 때 안정감을 느낍니다. 역할, 순서, 일정이 명확할수록 실행력이 올라갑니다.",
    right: "P는 상황 변화에 맞춰 조정할 여지가 있을 때 편합니다. 가능성을 열어두고, 마지막 정보까지 반영해 유연하게 움직이는 데 강합니다.",
    example: "출장 준비를 한다면 J는 체크리스트를 만들고 전날 짐을 끝내려 하고, P는 큰 방향만 잡아둔 뒤 현장에서 더 좋은 선택지를 찾는 식입니다. J는 예측 가능성을 만들고, P는 변화 대응력을 가져옵니다."
  }
];

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
            {isLocalMode() ? "현재 기기 임시 저장 기준" : "공유 저장소 기준"} · 총 {results.length}명
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
          <p className="mt-1 text-sm text-slate-600">별명은 상세 설명 페이지로 이동하는 링크입니다.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] border-collapse text-left text-sm">
            <thead className="bg-panel text-slate-600">
              <tr>
                <th className="px-4 py-3">닉네임</th>
                <th className="px-4 py-3">MBTI</th>
                <th className="px-4 py-3">별명</th>
                <th className="px-4 py-3">검사일</th>
              </tr>
            </thead>
            <tbody>
              {results.length === 0 ? (
                <tr>
                  <td className="px-4 py-8 text-center text-slate-500" colSpan={4}>
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
                    <td className="px-4 py-3">
                      <Link
                        className="inline-flex items-center gap-1 rounded-md border border-brand/30 bg-brand/10 px-2 py-1 font-bold text-brand underline-offset-4 transition hover:border-brand hover:bg-brand hover:text-white hover:underline"
                        href={`/types/${result.mbti}`}
                        title={`${result.mbti} 상세 설명 보기`}
                      >
                        {mbtiProfiles[result.mbti].nickname}
                        <ExternalLink size={14} />
                      </Link>
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
        <section>
          <div className="mb-4 rounded-lg border border-line bg-white p-4 shadow-sm">
            <h2 className="text-xl font-black text-ink">우리 부서의 MBTI 분포는?</h2>
            <p className="mt-1 text-sm text-slate-600">아래 차트는 구성원의 유형 분포와 지표별 누적 점수를 보여줍니다.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <DonutChart
              className="md:col-span-2"
              totalLabel="총"
              title="우리 부서 분포도 : 16유형 분포"
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
            <DonutChart totalLabel="누적 점수" title="우리 부서 분포도 : E / I 누적 점수" labels={["외향 E", "내향 I"]} values={[stats.byAxis.EI.E, stats.byAxis.EI.I]} colors={["#2F6F73", "#D96C5F"]} />
            <DonutChart totalLabel="누적 점수" title="우리 부서 분포도 : S / N 누적 점수" labels={["감각 S", "직관 N"]} values={[stats.byAxis.SN.S, stats.byAxis.SN.N]} colors={["#D89B32", "#7B5EA7"]} />
            <DonutChart totalLabel="누적 점수" title="우리 부서 분포도 : T / F 누적 점수" labels={["사고 T", "감정 F"]} values={[stats.byAxis.TF.T, stats.byAxis.TF.F]} colors={["#496A81", "#C08497"]} />
            <DonutChart totalLabel="누적 점수" title="우리 부서 분포도 : J / P 누적 점수" labels={["판단 J", "인식 P"]} values={[stats.byAxis.JP.J, stats.byAxis.JP.P]} colors={["#5E8C61", "#B85C38"]} />
          </div>

          <div className="mt-4 rounded-lg border border-line bg-white p-4 shadow-sm">
            <h2 className="text-xl font-black text-ink">각 지표는 무엇을 뜻할까?</h2>
            <p className="mt-1 text-sm text-slate-600">MBTI 문자는 좋고 나쁨의 구분이 아니라, 정보를 얻고 판단하고 움직이는 선호의 차이를 보여줍니다.</p>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {axisGuides.map((guide) => (
                <article key={guide.title} className="rounded-md bg-panel p-4">
                  <h3 className="text-base font-black text-ink">{guide.title}</h3>
                  <div className="mt-3 grid gap-3 text-sm leading-7 text-slate-700">
                    <p>{guide.left}</p>
                    <p>{guide.right}</p>
                    <p className="rounded-md bg-white px-3 py-2 text-slate-800">예시: {guide.example}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}
