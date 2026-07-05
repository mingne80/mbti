import type { MbtiLetter, MbtiType, Scores } from "./types";

export type Question = {
  id: number;
  axis: "EI" | "SN" | "TF" | "JP";
  prompt: string;
  agreeLetter: MbtiLetter;
  disagreeLetter: MbtiLetter;
};

export const questions: Question[] = [
  { id: 1, axis: "EI", prompt: "처음 만나는 사람과도 빠르게 대화를 시작하는 편이다.", agreeLetter: "E", disagreeLetter: "I" },
  { id: 2, axis: "EI", prompt: "여럿이 어울린 뒤보다 혼자 있는 시간이 더 충전된다.", agreeLetter: "I", disagreeLetter: "E" },
  { id: 3, axis: "EI", prompt: "모임에서는 분위기를 먼저 띄우는 역할을 자주 맡는다.", agreeLetter: "E", disagreeLetter: "I" },
  { id: 4, axis: "EI", prompt: "생각을 정리할 때 혼자 고민하기보다 누군가와 이야기하며 풀어가는 편이다.", agreeLetter: "E", disagreeLetter: "I" },
  { id: 5, axis: "EI", prompt: "일정이 많아도 사람들과 만나는 약속이 있으면 에너지가 살아난다.", agreeLetter: "E", disagreeLetter: "I" },

  { id: 6, axis: "SN", prompt: "아이디어보다 구체적인 사실과 실제 사례가 먼저 눈에 들어온다.", agreeLetter: "S", disagreeLetter: "N" },
  { id: 7, axis: "SN", prompt: "현재의 정보보다 앞으로의 가능성과 큰 그림을 자주 떠올린다.", agreeLetter: "N", disagreeLetter: "S" },
  { id: 8, axis: "SN", prompt: "설명은 실제 경험과 단계별 예시가 있을 때 가장 이해하기 쉽다.", agreeLetter: "S", disagreeLetter: "N" },
  { id: 9, axis: "SN", prompt: "새로운 일을 볼 때 지금 가능한 실행 방법보다 잠재적인 확장성을 먼저 생각한다.", agreeLetter: "N", disagreeLetter: "S" },
  { id: 10, axis: "SN", prompt: "업무를 판단할 때 검증된 자료와 수치가 있어야 안심된다.", agreeLetter: "S", disagreeLetter: "N" },

  { id: 11, axis: "TF", prompt: "결정할 때 논리와 객관적인 기준을 우선한다.", agreeLetter: "T", disagreeLetter: "F" },
  { id: 12, axis: "TF", prompt: "판단할 때 사람들의 감정과 관계에 미칠 영향을 먼저 고려한다.", agreeLetter: "F", disagreeLetter: "T" },
  { id: 13, axis: "TF", prompt: "갈등 상황에서는 부드러운 표현보다 명확한 결론이 더 중요하다고 느낀다.", agreeLetter: "T", disagreeLetter: "F" },
  { id: 14, axis: "TF", prompt: "피드백을 줄 때 상대가 받아들이기 쉬운 방식인지 먼저 신경 쓴다.", agreeLetter: "F", disagreeLetter: "T" },
  { id: 15, axis: "TF", prompt: "회의에서는 개인 사정보다 합의된 원칙과 기준이 지켜지는 것이 중요하다.", agreeLetter: "T", disagreeLetter: "F" },

  { id: 16, axis: "JP", prompt: "계획을 세우고 정해진 순서대로 진행할 때 마음이 편하다.", agreeLetter: "J", disagreeLetter: "P" },
  { id: 17, axis: "JP", prompt: "상황에 맞춰 유연하게 방향을 바꾸는 편이 더 자연스럽다.", agreeLetter: "P", disagreeLetter: "J" },
  { id: 18, axis: "JP", prompt: "할 일을 미리 끝내 두어야 마음이 놓인다.", agreeLetter: "J", disagreeLetter: "P" },
  { id: 19, axis: "JP", prompt: "마감이 가까워질 때 집중력이 올라와 더 효율적으로 움직인다.", agreeLetter: "P", disagreeLetter: "J" },
  { id: 20, axis: "JP", prompt: "일정과 역할이 명확하게 정리되어 있어야 일을 시작하기 쉽다.", agreeLetter: "J", disagreeLetter: "P" }
];

export const emptyScores = (): Scores => ({
  E: 0,
  I: 0,
  S: 0,
  N: 0,
  T: 0,
  F: 0,
  J: 0,
  P: 0
});

export const allTypes: MbtiType[] = [
  "ISTJ",
  "ISFJ",
  "INFJ",
  "INTJ",
  "ISTP",
  "ISFP",
  "INFP",
  "INTP",
  "ESTP",
  "ESFP",
  "ENFP",
  "ENTP",
  "ESTJ",
  "ESFJ",
  "ENFJ",
  "ENTJ"
];

export const typeDescriptions: Record<MbtiType, string> = {
  ISTJ: "현실적이고 책임감 있게 일을 마무리하는 신뢰형",
  ISFJ: "세심하게 챙기고 안정적인 분위기를 만드는 지원형",
  INFJ: "깊이 있는 통찰과 의미를 중시하는 비전형",
  INTJ: "전략적으로 구조를 만들고 개선점을 찾는 설계형",
  ISTP: "문제를 차분히 분석하고 직접 해결하는 실전형",
  ISFP: "조용히 배려하며 자신의 가치와 감각을 지키는 온화형",
  INFP: "진정성과 가능성을 중시하는 가치탐색형",
  INTP: "원리와 논리를 파고드는 분석탐구형",
  ESTP: "상황 판단이 빠르고 실행력이 강한 행동형",
  ESFP: "사람들과 에너지를 나누고 현재를 즐기는 활력형",
  ENFP: "새로운 가능성과 연결을 만드는 아이디어형",
  ENTP: "질문과 토론으로 관점을 확장하는 발명형",
  ESTJ: "목표와 기준을 세우고 추진하는 운영형",
  ESFJ: "관계를 살피며 함께 움직이게 하는 조율형",
  ENFJ: "사람의 성장을 돕고 방향을 제시하는 리더형",
  ENTJ: "큰 목표를 세우고 체계적으로 이끄는 지휘형"
};

export function calculateScores(answers: Record<number, number>) {
  const scores = emptyScores();

  for (const question of questions) {
    const value = answers[question.id] ?? 3;
    if (value > 3) scores[question.agreeLetter] += value - 3;
    if (value < 3) scores[question.disagreeLetter] += 3 - value;
  }

  return scores;
}

export function calculateMbti(scores: Scores): MbtiType {
  const first = scores.E > scores.I ? "E" : "I";
  const second = scores.S > scores.N ? "S" : "N";
  const third = scores.T > scores.F ? "T" : "F";
  const fourth = scores.J > scores.P ? "J" : "P";
  return `${first}${second}${third}${fourth}` as MbtiType;
}
