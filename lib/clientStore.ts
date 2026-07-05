"use client";

import { buildStats } from "./stats";
import type { AccessLog, AccessLogPage, MbtiType, ResultRecord, Scores, Stats } from "./types";

const resultKey = "team-mbti-results";
const accessLogKey = "team-mbti-access-logs";
const mode = process.env.NEXT_PUBLIC_STORAGE_MODE ?? "local";
const localAdminPassword = "rhksflwk01!";

function readLocalResults(): ResultRecord[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(resultKey);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as ResultRecord[];
  } catch {
    return [];
  }
}

function writeLocalResults(results: ResultRecord[]) {
  window.localStorage.setItem(resultKey, JSON.stringify(results));
}

function readLocalAccessLogs(): AccessLog[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(accessLogKey);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as AccessLog[];
  } catch {
    return [];
  }
}

function writeLocalAccessLogs(logs: AccessLog[]) {
  window.localStorage.setItem(accessLogKey, JSON.stringify(logs.slice(0, 500)));
}

export function isLocalMode() {
  return mode !== "postgres";
}

export async function saveResult(input: { nickname: string; mbti: MbtiType; scores: Scores }) {
  if (isLocalMode()) {
    const results = readLocalResults();
    const next: ResultRecord = {
      id: crypto.randomUUID(),
      nickname: input.nickname,
      mbti: input.mbti,
      scores: input.scores,
      createdAt: new Date().toISOString()
    };
    const withoutDuplicate = results.filter((item) => item.nickname !== input.nickname);
    writeLocalResults([next, ...withoutDuplicate]);
    return next;
  }

  const response = await fetch("/api/results", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });
  if (!response.ok) throw new Error("결과 저장에 실패했습니다.");
  return (await response.json()) as ResultRecord;
}

export async function listResults() {
  if (isLocalMode()) return readLocalResults();

  const response = await fetch("/api/results", { cache: "no-store" });
  if (!response.ok) throw new Error("결과 목록을 불러오지 못했습니다.");
  return (await response.json()) as ResultRecord[];
}

export async function getStats(): Promise<Stats> {
  if (isLocalMode()) return buildStats(readLocalResults());

  const response = await fetch("/api/stats", { cache: "no-store" });
  if (!response.ok) throw new Error("통계를 불러오지 못했습니다.");
  return (await response.json()) as Stats;
}

export async function deleteResults(ids: string[], password: string) {
  if (ids.length === 0) return { deletedCount: 0 };

  if (isLocalMode()) {
    if (password !== localAdminPassword) throw new Error("비밀번호가 올바르지 않습니다.");
    const targets = new Set(ids);
    const before = readLocalResults();
    const after = before.filter((item) => !targets.has(item.id));
    writeLocalResults(after);
    return { deletedCount: before.length - after.length };
  }

  const response = await fetch("/api/results", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids, password })
  });
  const data = (await response.json()) as { deletedCount?: number; message?: string };
  if (!response.ok) throw new Error(data.message ?? "삭제에 실패했습니다.");
  return { deletedCount: data.deletedCount ?? 0 };
}

export async function recordAccess(input: { path: string; nickname: string | null }) {
  if (isLocalMode()) {
    const logs = readLocalAccessLogs();
    writeLocalAccessLogs([
      {
        id: crypto.randomUUID(),
        path: input.path,
        nickname: input.nickname,
        ipAddress: "현재 기기",
        userAgent: navigator.userAgent,
        createdAt: new Date().toISOString()
      },
      ...logs
    ]);
    return;
  }

  await fetch("/api/access-logs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
    keepalive: true
  });
}

export async function listAccessLogs(input: { page: number; pageSize: number; password: string }): Promise<AccessLogPage> {
  if (isLocalMode()) {
    if (input.password !== localAdminPassword) throw new Error("비밀번호가 올바르지 않습니다.");
    const logs = readLocalAccessLogs();
    const page = Math.max(1, input.page);
    const pageSize = input.pageSize;
    const start = (page - 1) * pageSize;
    return {
      logs: logs.slice(start, start + pageSize),
      page,
      pageSize,
      total: logs.length,
      anonymousTotal: logs.filter((log) => !log.nickname).length,
      totalPages: Math.max(1, Math.ceil(logs.length / pageSize))
    };
  }

  const params = new URLSearchParams({ page: String(input.page), pageSize: String(input.pageSize), password: input.password });
  const response = await fetch(`/api/access-logs?${params.toString()}`, { cache: "no-store" });
  const data = (await response.json()) as AccessLogPage | { message?: string };
  if (!response.ok) throw new Error("message" in data && data.message ? data.message : "접근 로그를 불러오지 못했습니다.");
  return data as AccessLogPage;
}

