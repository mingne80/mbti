import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { insertAccessLog, selectAccessLogs } from "@/lib/serverDb";

export const dynamic = "force-dynamic";

const adminPassword = process.env.ADMIN_PASSWORD ?? "rhksflwk01!";

function getClientIp(headerList: Headers) {
  const forwardedFor = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || headerList.get("x-real-ip") || headerList.get("cf-connecting-ip") || "알 수 없음";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { path?: string; nickname?: string | null };
    if (!body.path || typeof body.path !== "string") {
      return NextResponse.json({ message: "path가 필요합니다." }, { status: 400 });
    }

    const headerList = await headers();
    await insertAccessLog({
      path: body.path.slice(0, 500),
      nickname: body.nickname?.trim() ? body.nickname.trim().slice(0, 80) : null,
      ipAddress: getClientIp(headerList),
      userAgent: (headerList.get("user-agent") ?? "알 수 없음").slice(0, 500)
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "접근 로그 저장 실패" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    if (url.searchParams.get("password") !== adminPassword) {
      return NextResponse.json({ message: "비밀번호가 올바르지 않습니다." }, { status: 401 });
    }

    const page = Number(url.searchParams.get("page") ?? "1");
    const pageSize = Number(url.searchParams.get("pageSize") ?? "20");
    const logs = await selectAccessLogs(Number.isFinite(page) ? page : 1, Number.isFinite(pageSize) ? pageSize : 20);
    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "접근 로그 조회 실패" }, { status: 500 });
  }
}
