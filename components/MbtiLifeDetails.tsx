import { mbtiLifeNotes } from "@/lib/mbtiProfiles";
import type { MbtiType } from "@/lib/types";

export function MbtiLifeDetails({ type }: { type: MbtiType }) {
  const note = mbtiLifeNotes[type];

  return (
    <div className="mt-5 grid gap-4">
      <section className="rounded-md border border-line bg-white px-4 py-4">
        <h3 className="text-lg font-black text-ink">실생활에서는 이렇게 보일 수 있어요</h3>
        <div className="mt-3 grid gap-3 text-sm leading-7 text-slate-700">
          <p>
            <span className="font-bold text-ink">일상:</span> {note.daily}
          </p>
          <p>
            <span className="font-bold text-ink">업무:</span> {note.work}
          </p>
          <p>
            <span className="font-bold text-ink">관계:</span> {note.relationship}
          </p>
          <p className="rounded-md bg-panel px-3 py-2 text-slate-800">
            <span className="font-bold text-ink">활용 팁:</span> {note.tip}
          </p>
        </div>
      </section>

      <section className="rounded-md border border-line bg-white px-4 py-4">
        <h3 className="text-lg font-black text-ink">유명인 예시</h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          아래 인물은 온라인에서 해당 유형으로 자주 언급되는 참고 예시입니다. 공식 검사 결과를 단정하기보다, 유형의 분위기를 이해하는 가벼운 예시로 봐 주세요.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {note.celebrityExamples.map((name) => (
            <span key={name} className="rounded-md bg-brand/10 px-3 py-1.5 text-sm font-bold text-brand">
              {name}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
