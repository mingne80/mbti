"use client";

import { Lock, Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { deleteResults, listAccessLogs, listResults } from "@/lib/clientStore";
import type { AccessLogPage, ResultRecord } from "@/lib/types";

const entryPassword = "rhksflwk01!";
const logPageSize = 20;

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [results, setResults] = useState<ResultRecord[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [accessLogPage, setAccessLogPage] = useState<AccessLogPage | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadResults() {
    setLoading(true);
    setMessage("");
    try {
      const nextResults = await listResults();
      setResults(nextResults);
      setSelectedIds([]);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }

  async function loadLogs(page = accessLogPage?.page ?? 1) {
    setLoading(true);
    setMessage("");
    try {
      const nextLogs = await listAccessLogs({ page, pageSize: logPageSize, password });
      setAccessLogPage(nextLogs);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "접근 로그를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }

  async function enter(event: FormEvent) {
    event.preventDefault();
    if (password !== entryPassword) {
      setMessage("비밀번호가 올바르지 않습니다.");
      return;
    }
    setAuthorized(true);
    setLoading(true);
    setMessage("");
    try {
      const [nextResults, nextLogs] = await Promise.all([listResults(), listAccessLogs({ page: 1, pageSize: logPageSize, password })]);
      setResults(nextResults);
      setAccessLogPage(nextLogs);
      setSelectedIds([]);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "관리자 정보를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }

  function toggleSelected(id: string) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }

  function toggleAll() {
    setSelectedIds((prev) => (prev.length === results.length ? [] : results.map((result) => result.id)));
  }

  async function removeSelected() {
    if (selectedIds.length === 0) {
      setMessage("삭제할 결과를 선택해 주세요.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const { deletedCount } = await deleteResults(selectedIds, password);
      setMessage(`${deletedCount}개 결과를 삭제했습니다.`);
      const nextResults = await listResults();
      setResults(nextResults);
      setSelectedIds([]);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "삭제에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  if (!authorized) {
    return (
      <PageShell>
        <section className="mx-auto max-w-md rounded-lg border border-line bg-white p-6 shadow-lg">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand/10 text-brand">
              <Lock size={20} />
            </div>
            <div>
              <h1 className="text-xl font-black text-ink">관리자 페이지</h1>
              <p className="mt-1 text-sm text-slate-600">비밀번호를 입력해 주세요.</p>
            </div>
          </div>
          <form onSubmit={enter}>
            <label className="block text-sm font-bold text-ink" htmlFor="admin-password">
              비밀번호
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 h-12 w-full rounded-md border border-line px-4 outline-none ring-brand/30 transition focus:ring-4"
              autoComplete="current-password"
            />
            {message ? <p className="mt-3 text-sm font-semibold text-coral">{message}</p> : null}
            <PrimaryButton className="mt-5 w-full" disabled={!password || loading}>
              진입
            </PrimaryButton>
          </form>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-white p-4 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-ink">관리자 페이지</h1>
          <p className="mt-1 text-sm text-slate-600">등록 결과 삭제와 페이지 접근 로그를 확인할 수 있습니다.</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              loadResults();
              loadLogs(accessLogPage?.page ?? 1);
            }}
            disabled={loading}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-line bg-white px-4 py-2 font-semibold text-ink transition hover:bg-panel disabled:opacity-50"
          >
            새로고침
          </button>
          <PrimaryButton onClick={removeSelected} disabled={loading || selectedIds.length === 0} className="gap-2 bg-coral hover:bg-[#BF554A]">
            <Trash2 size={18} /> 선택 삭제
          </PrimaryButton>
        </div>
      </div>

      {message ? <div className="mb-5 rounded-md border border-line bg-white p-4 font-semibold text-slate-700">{message}</div> : null}

      <section className="mb-5 overflow-hidden rounded-lg border border-line bg-white shadow-sm">
        <div className="border-b border-line px-4 py-3">
          <h2 className="font-bold text-ink">등록 결과 관리 · 총 {results.length}개</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead className="bg-panel text-slate-600">
              <tr>
                <th className="px-4 py-3">
                  <input type="checkbox" checked={results.length > 0 && selectedIds.length === results.length} onChange={toggleAll} aria-label="전체 선택" />
                </th>
                <th className="px-4 py-3">닉네임</th>
                <th className="px-4 py-3">MBTI</th>
                <th className="px-4 py-3">검사일</th>
              </tr>
            </thead>
            <tbody>
              {results.length === 0 ? (
                <tr>
                  <td className="px-4 py-8 text-center text-slate-500" colSpan={4}>
                    삭제할 결과가 없습니다.
                  </td>
                </tr>
              ) : (
                results.map((result) => (
                  <tr key={result.id} className="border-t border-line">
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selectedIds.includes(result.id)} onChange={() => toggleSelected(result.id)} aria-label={`${result.nickname} 선택`} />
                    </td>
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

      <section className="overflow-hidden rounded-lg border border-line bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div>
            <h2 className="font-bold text-ink">페이지 접근 로그</h2>
            <p className="mt-1 text-sm text-slate-600">최근 접근 기록을 20건씩 확인합니다. 식별 정보는 닉네임, 접속 주소, 브라우저 정보 기준입니다.</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">전체 {accessLogPage?.total ?? 0}건 · 닉네임 없음 {accessLogPage?.anonymousTotal ?? 0}건</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <button
              type="button"
              onClick={() => loadLogs((accessLogPage?.page ?? 1) - 1)}
              disabled={loading || !accessLogPage || accessLogPage.page <= 1}
              className="rounded-md border border-line px-3 py-2 font-semibold text-ink disabled:opacity-40"
            >
              이전
            </button>
            <span>
              {accessLogPage?.page ?? 1} / {accessLogPage?.totalPages ?? 1}
            </span>
            <button
              type="button"
              onClick={() => loadLogs((accessLogPage?.page ?? 1) + 1)}
              disabled={loading || !accessLogPage || accessLogPage.page >= accessLogPage.totalPages}
              className="rounded-md border border-line px-3 py-2 font-semibold text-ink disabled:opacity-40"
            >
              다음
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-left text-sm">
            <thead className="bg-panel text-slate-600">
              <tr>
                <th className="px-4 py-3">시간</th>
                <th className="px-4 py-3">페이지</th>
                <th className="px-4 py-3">닉네임</th>
                <th className="px-4 py-3">접속 주소</th>
                <th className="px-4 py-3">브라우저 정보</th>
              </tr>
            </thead>
            <tbody>
              {!accessLogPage || accessLogPage.logs.length === 0 ? (
                <tr>
                  <td className="px-4 py-8 text-center text-slate-500" colSpan={5}>
                    접근 로그가 없습니다.
                  </td>
                </tr>
              ) : (
                accessLogPage.logs.map((log) => (
                  <tr key={log.id} className="border-t border-line align-top">
                    <td className="whitespace-nowrap px-4 py-3 text-slate-600">{new Date(log.createdAt).toLocaleString("ko-KR")}</td>
                    <td className="px-4 py-3 font-semibold text-ink">{log.path}</td>
                    <td className="px-4 py-3 text-slate-700">{log.nickname ?? "-"}</td>
                    <td className="px-4 py-3 text-slate-700">{log.ipAddress}</td>
                    <td className="max-w-md px-4 py-3 text-slate-600">{log.userAgent}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </PageShell>
  );
}


