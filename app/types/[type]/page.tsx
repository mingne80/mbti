import Link from "next/link";
import { notFound } from "next/navigation";
import { MbtiLifeDetails } from "@/components/MbtiLifeDetails";
import { PageShell } from "@/components/PageShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { mbtiProfiles } from "@/lib/mbtiProfiles";
import { allTypes } from "@/lib/questions";
import type { MbtiType } from "@/lib/types";

type Props = {
  params: Promise<{ type: string }>;
};

export function generateStaticParams() {
  return allTypes.map((type) => ({ type }));
}

export async function generateMetadata({ params }: Props) {
  const { type } = await params;
  const mbti = type.toUpperCase() as MbtiType;
  const profile = mbtiProfiles[mbti];

  if (!profile) return { title: "MBTI 설명" };

  return {
    title: `${mbti} ${profile.nickname}`,
    description: profile.shortDescription
  };
}

export default async function MbtiTypePage({ params }: Props) {
  const { type } = await params;
  const mbti = type.toUpperCase() as MbtiType;
  const profile = mbtiProfiles[mbti];

  if (!profile) notFound();

  return (
    <PageShell>
      <section className="mx-auto max-w-4xl overflow-hidden rounded-lg border border-line bg-white shadow-lg">
        <div className="grid lg:grid-cols-[300px_1fr]">
          <div className="flex min-h-72 items-center justify-center p-8" style={{ backgroundColor: profile.accent }}>
            <div className="text-center text-white">
              <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-white/20 text-7xl shadow-inner" role="img" aria-label={profile.imageLabel}>
                {profile.image}
              </div>
              <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-white/80">MBTI 카드 설명</p>
              <h1 className="mt-2 text-6xl font-black">{mbti}</h1>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-sm font-bold text-brand">{profile.shortDescription}</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-ink">{profile.nickname}</h2>
            <p className="mt-5 rounded-md bg-panel px-4 py-4 text-base leading-8 text-slate-700">{profile.longDescription}</p>
            <MbtiLifeDetails type={mbti} />
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/dashboard">
                <PrimaryButton>대시보드로 돌아가기</PrimaryButton>
              </Link>
              <Link href="/test">
                <button className="inline-flex min-h-11 items-center justify-center rounded-md border border-line bg-white px-5 py-2.5 font-semibold text-ink transition hover:bg-panel">
                  테스트 하기
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
