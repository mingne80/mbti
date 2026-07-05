"use client";

import { buildStats } from "./stats";
import type { MbtiType, ResultRecord, Scores, Stats } from "./types";

const key = "team-mbti-results";
const mode = process.env.NEXT_PUBLIC_STORAGE_MODE ?? "local";
const localAdminPassword = "rhksflwk01!";

function readLocal(): ResultRecord[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(key);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as ResultRecord[];
  } catch {
    return [];
  }
}

function writeLocal(results: ResultRecord[]) {
  window.localStorage.setItem(key, JSON.stringify(results));
}

export function isLocalMode() {
  return mode !== "postgres";
}

export async function saveResult(input: { nickname: string; mbti: MbtiType; scores: Scores }) {
  if (isLocalMode()) {
    const results = readLocal();
    const next: ResultRecord = {
      id: crypto.randomUUID(),
      nickname: input.nickname,
      mbti: input.mbti,
      scores: input.scores,
      createdAt: new Date().toISOString()
    };
    const withoutDuplicate = results.filter((item) => item.nickname !== input.nickname);
    writeLocal([next, ...withoutDuplicate]);
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
  if (isLocalMode()) return readLocal();

  const response = await fetch("/api/results", { cache: "no-store" });
  if (!response.ok) throw new Error("결과 목록을 불러오지 못했습니다.");
  return (await response.json()) as ResultRecord[];
}

export async function getStats(): Promise<Stats> {
  if (isLocalMode()) return buildStats(readLocal());

  const response = await fetch("/api/stats", { cache: "no-store" });
  if (!response.ok) throw new Error("통계를 불러오지 못했습니다.");
  return (await response.json()) as Stats;
}

export async function deleteResults(ids: string[], password: string) {
  if (ids.length === 0) return { deletedCount: 0 };

  if (isLocalMode()) {
    if (password !== localAdminPassword) throw new Error("비밀번호가 올바르지 않습니다.");
    const targets = new Set(ids);
    const before = readLocal();
    const after = before.filter((item) => !targets.has(item.id));
    writeLocal(after);
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
