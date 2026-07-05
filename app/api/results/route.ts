import { NextResponse } from "next/server";
import { deleteResultsByIds, insertResult, selectResults } from "@/lib/serverDb";
import type { MbtiType, Scores } from "@/lib/types";

export const dynamic = "force-dynamic";

const adminPassword = process.env.ADMIN_PASSWORD ?? "rhksflwk01!";

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

export async function DELETE(request: Request) {
  try {
    const body = (await request.json()) as { ids?: string[]; password?: string };
    if (body.password !== adminPassword) {
      return NextResponse.json({ message: "비밀번호가 올바르지 않습니다." }, { status: 401 });
    }
    if (!Array.isArray(body.ids) || body.ids.length === 0 || body.ids.some((id) => typeof id !== "string")) {
      return NextResponse.json({ message: "삭제할 결과를 선택해 주세요." }, { status: 400 });
    }

    const deletedCount = await deleteResultsByIds(body.ids);
    return NextResponse.json({ deletedCount });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "삭제 실패" }, { status: 500 });
  }
}
