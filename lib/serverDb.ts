import "server-only";

import crypto from "crypto";
import { Pool } from "pg";
import type { ResultRecord } from "./types";

let pool: Pool | undefined;

function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL 환경변수가 필요합니다.");
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
