import { NextResponse } from "next/server";
import { selectResults } from "@/lib/serverDb";
import { buildStats } from "@/lib/stats";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const results = await selectResults();
    return NextResponse.json(buildStats(results));
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "통계 조회 실패" }, { status: 500 });
  }
}
