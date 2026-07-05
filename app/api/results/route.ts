import { NextResponse } from "next/server";
import { insertResult, selectResults } from "@/lib/serverDb";
import type { MbtiType, Scores } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const results = await selectResults();
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "조회 실패" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { nickname?: string; mbti?: MbtiType; scores?: Scores };
    if (!body.nickname?.trim() || !body.mbti || !body.scores) {
      return NextResponse.json({ message: "nickname, mbti, scores가 필요합니다." }, { status: 400 });
    }

    const result = await insertResult({
      nickname: body.nickname.trim(),
      mbti: body.mbti,
      scores: body.scores
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "저장 실패" }, { status: 500 });
  }
}
