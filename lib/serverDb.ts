import "server-only";

import crypto from "crypto";
import { Pool } from "pg";
import type { AccessLog, AccessLogPage, ResultRecord } from "./types";

let pool: Pool | undefined;

function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("공유 저장소 연결 정보가 필요합니다.");
  }

  pool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined
  });
  return pool;
}

export async function ensureSchema() {
  await getPool().query(`
    CREATE TABLE IF NOT EXISTS results (
      id TEXT PRIMARY KEY,
      nickname TEXT NOT NULL UNIQUE,
      mbti TEXT NOT NULL,
      scores JSONB NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS access_logs (
      id TEXT PRIMARY KEY,
      path TEXT NOT NULL,
      nickname TEXT,
      ip_address TEXT NOT NULL,
      user_agent TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS access_logs_created_at_idx ON access_logs (created_at DESC);
  `);
}

export async function insertResult(input: Omit<ResultRecord, "id" | "createdAt">) {
  await ensureSchema();
  const result = await getPool().query(
    `
      INSERT INTO results (nickname, mbti, scores, id)
      VALUES ($1, $2, $3::jsonb, $4)
      ON CONFLICT (nickname)
      DO UPDATE SET mbti = EXCLUDED.mbti, scores = EXCLUDED.scores, created_at = NOW()
      RETURNING id::text, nickname, mbti, scores, created_at;
    `,
    [input.nickname, input.mbti, JSON.stringify(input.scores), crypto.randomUUID()]
  );
  return rowToResult(result.rows[0]);
}

export async function selectResults() {
  await ensureSchema();
  const result = await getPool().query(`
    SELECT id::text, nickname, mbti, scores, created_at
    FROM results
    ORDER BY created_at DESC;
  `);
  return result.rows.map(rowToResult);
}

export async function deleteResultsByIds(ids: string[]) {
  await ensureSchema();
  const result = await getPool().query("DELETE FROM results WHERE id = ANY($1::text[]);", [ids]);
  return result.rowCount ?? 0;
}

export async function insertAccessLog(input: { path: string; nickname: string | null; ipAddress: string; userAgent: string }) {
  await ensureSchema();
  await getPool().query(
    `
      INSERT INTO access_logs (id, path, nickname, ip_address, user_agent)
      VALUES ($1, $2, $3, $4, $5);
    `,
    [crypto.randomUUID(), input.path, input.nickname, input.ipAddress, input.userAgent]
  );
}

export async function selectAccessLogs(page: number, pageSize: number): Promise<AccessLogPage> {
  await ensureSchema();
  const safePage = Math.max(1, page);
  const safePageSize = Math.min(50, Math.max(1, pageSize));
  const offset = (safePage - 1) * safePageSize;

  const [countResult, rowsResult] = await Promise.all([
    getPool().query("SELECT COUNT(*)::int AS total FROM access_logs;"),
    getPool().query(
      `
        SELECT id::text, path, nickname, ip_address, user_agent, created_at
        FROM access_logs
        ORDER BY created_at DESC
        LIMIT $1 OFFSET $2;
      `,
      [safePageSize, offset]
    )
  ]);

  const total = countResult.rows[0]?.total ?? 0;
  return {
    logs: rowsResult.rows.map(rowToAccessLog),
    page: safePage,
    pageSize: safePageSize,
    total,
    totalPages: Math.max(1, Math.ceil(total / safePageSize))
  };
}

function rowToResult(row: {
  id: string;
  nickname: string;
  mbti: ResultRecord["mbti"];
  scores: ResultRecord["scores"];
  created_at: Date | string;
}): ResultRecord {
  return {
    id: row.id,
    nickname: row.nickname,
    mbti: row.mbti,
    scores: row.scores,
    createdAt: new Date(row.created_at).toISOString()
  };
}

function rowToAccessLog(row: {
  id: string;
  path: string;
  nickname: string | null;
  ip_address: string;
  user_agent: string;
  created_at: Date | string;
}): AccessLog {
  return {
    id: row.id,
    path: row.path,
    nickname: row.nickname,
    ipAddress: row.ip_address,
    userAgent: row.user_agent,
    createdAt: new Date(row.created_at).toISOString()
  };
}
