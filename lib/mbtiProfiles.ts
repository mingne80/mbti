import type { MbtiType } from "./types";

export type MbtiProfile = {
  nickname: string;
  image: string;
  imageLabel: string;
  shortDescription: string;
  longDescription: string;
  accent: string;
};

export const mbtiProfiles: Record<MbtiType, MbtiProfile> = {
  ISTJ: {
    nickname: "질서정연한 체크리스트 장인",
    image: "📋",
    imageLabel: "체크리스트를 든 꼼꼼한 관리자",
    shortDescription: "현실적이고 책임감 있게 일을 마무리하는 신뢰형",
    longDescription: "약속과 기준을 허투루 넘기지 않습니다. 농담처럼 말하면 머릿속에 작은 감사팀이 살고 있고, 진지하게 말하면 조직의 안정감을 만들어 주는 사람입니다. 계획이 흔들릴 때도 필요한 사실과 절차를 붙잡아 일을 끝까지 가져갑니다.",
    accent: "#496A81"
  },
  ISFJ: {
    nickname: "조용한 케어 패키지 담당자",
    image: "🧺",
    imageLabel: "필요한 것을 챙겨 둔 바구니",
    shortDescription: "세심하게 챙기고 안정적인 분위기를 만드는 지원형",
    longDescription: "티 내지 않고 필요한 것을 미리 챙깁니다. 누가 컵을 비우기도 전에 물병을 찾는 타입에 가깝고, 진지하게는 팀의 빈틈과 사람의 컨디션을 섬세하게 감지하는 사람입니다. 꾸준함이 강점입니다.",
    accent: "#5E8C61"
  },
  INFJ: {
    nickname: "조용히 큰 그림을 보는 예언서 편집자",
    image: "🔮",
    imageLabel: "큰 그림을 비추는 수정구",
    shortDescription: "깊이 있는 통찰과 의미를 중시하는 비전형",
    longDescription: "겉으로는 차분하지만 머릿속에서는 의미와 방향을 계속 연결합니다. 회의 중 갑자기 핵심을 찌르는 한마디를 던져 모두를 조용하게 만들 수 있습니다. 사람과 일의 맥락을 함께 보는 힘이 있습니다.",
    accent: "#7B5EA7"
  },
  INTJ: {
    nickname: "전략 지도를 접지 않는 설계자",
    image: "🧭",
    imageLabel: "방향을 잡는 전략 나침반",
    shortDescription: "전략적으로 구조를 만들고 개선점을 찾는 설계형",
    longDescription: "현재 상태를 보면서 이미 다음 버전의 구조를 그리고 있습니다. 농담처럼 말하면 머릿속에 로드맵이 자동 생성됩니다. 진지하게는 복잡한 문제를 체계로 바꾸고 장기적인 개선 방향을 잡는 데 강합니다.",
    accent: "#355070"
  },
  ISTP: {
    nickname: "말보다 드라이버가 빠른 해결사",
    image: "🛠️",
    imageLabel: "문제를 고치는 공구",
    shortDescription: "문제를 차분히 분석하고 직접 해결하는 실전형",
    longDescription: "길게 설명하기보다 직접 만져 보고 답을 찾습니다. 문제가 생기면 당황하기보다 어디가 막혔는지 차분히 뜯어봅니다. 말수는 적어도 위기 상황에서 존재감이 올라가는 실전형입니다.",
    accent: "#2F6F73"
  },
  ISFP: {
    nickname: "감각 좋은 평화 유지 요원",
    image: "🎨",
    imageLabel: "색을 고르는 감각적인 팔레트",
    shortDescription: "조용히 배려하며 자신의 가치와 감각을 지키는 온화형",
    longDescription: "강하게 밀어붙이기보다 분위기와 사람의 결을 봅니다. 조용하지만 취향과 기준은 분명합니다. 진지하게는 팀 안에서 불필요한 마찰을 줄이고, 결과물에 자연스러운 감각을 더하는 사람입니다.",
    accent: "#C08497"
  },
  INFP: {
    nickname: "가치관 충전식 아이디어 산책가",
    image: "🌱",
    imageLabel: "천천히 자라는 새싹",
    shortDescription: "진정성과 가능성을 중시하는 가치탐색형",
    longDescription: "겉보기엔 느긋해 보여도 마음속 기준은 꽤 단단합니다. 의미 없는 일에는 배터리가 빨리 닳지만, 납득되는 일에는 오래 몰입합니다. 사람과 일의 가능성을 발견하는 데 강합니다.",
    accent: "#7A9E9F"
  },
  INTP: {
    nickname: "왜요 버튼이 고장 나지 않는 분석가",
    image: "🧩",
    imageLabel: "퍼즐을 맞추는 분석가",
    shortDescription: "원리와 논리를 파고드는 분석탐구형",
    longDescription: "대답보다 질문이 먼저 나올 때가 많습니다. 단순 반항이 아니라 구조가 맞는지 확인하려는 본능입니다. 진지하게는 복잡한 개념을 분해하고 허점을 찾아 더 나은 설명을 만드는 데 강합니다.",
    accent: "#6D597A"
  },
  ESTP: {
    nickname: "현장 반응속도 0.2초 실행가",
    image: "🏃",
    imageLabel: "빠르게 움직이는 실행가",
    shortDescription: "상황 판단이 빠르고 실행력이 강한 행동형",
    longDescription: "상황이 움직이면 같이 움직입니다. 오래 고민하기보다 일단 판을 읽고 가능한 선택지를 잡습니다. 농담처럼 말하면 회의실보다 현장에서 레벨업이 빠르고, 진지하게는 변화 대응력이 좋은 사람입니다.",
    accent: "#D96C5F"
  },
  ESFP: {
    nickname: "분위기 전원을 켜는 현장 스타",
    image: "🎤",
    imageLabel: "마이크를 든 분위기 메이커",
    shortDescription: "사람들과 에너지를 나누고 현재를 즐기는 활력형",
    longDescription: "공기가 무거워지면 자연스럽게 온도를 올립니다. 사람들의 반응을 잘 읽고 지금 필요한 에너지를 만들어 냅니다. 진지하게는 참여와 몰입을 끌어내는 힘이 있습니다.",
    accent: "#E09F3E"
  },
  ENFP: {
    nickname: "아이디어 팝콘 제조기",
    image: "🍿",
    imageLabel: "톡톡 튀는 아이디어 팝콘",
    shortDescription: "새로운 가능성과 연결을 만드는 아이디어형",
    longDescription: "하나의 이야기를 듣고 세 갈래 가능성을 떠올립니다. 가끔 아이디어가 팝콘처럼 튀어 주변이 바빠질 수 있지만, 그 안에서 새로운 연결과 기회를 발견합니다. 사람을 움직이게 하는 긍정 에너지가 있습니다.",
    accent: "#D89B32"
  },
  ENTP: {
    nickname: "토론으로 엔진 거는 발명가",
    image: "💡",
    imageLabel: "반짝이는 아이디어 전구",
    shortDescription: "질문과 토론으로 관점을 확장하는 발명형",
    longDescription: "반박은 공격이 아니라 엔진 예열에 가깝습니다. 새로운 관점과 가능성을 찾기 위해 말을 던지고 받습니다. 진지하게는 고정관념을 흔들어 더 나은 대안을 찾는 데 강합니다.",
    accent: "#B85C38"
  },
  ESTJ: {
    nickname: "회의를 액션 아이템으로 바꾸는 운영자",
    image: "📌",
    imageLabel: "업무를 고정하는 핀",
    shortDescription: "목표와 기준을 세우고 추진하는 운영형",
    longDescription: "말로 끝나는 회의를 별로 좋아하지 않습니다. 누가, 언제, 무엇을 할지 정리되어야 마음이 놓입니다. 진지하게는 목표를 현실의 실행 계획으로 바꾸는 추진력이 강합니다.",
    accent: "#A44A3F"
  },
  ESFJ: {
    nickname: "사람 온도계가 달린 조율자",
    image: "🤝",
    imageLabel: "협업을 상징하는 악수",
    shortDescription: "관계를 살피며 함께 움직이게 하는 조율형",
    longDescription: "사람들의 분위기와 반응을 빠르게 읽습니다. 누가 빠졌는지, 누가 불편한지 그냥 지나치지 않습니다. 진지하게는 협업의 접착제 역할을 하며 구성원이 함께 움직이도록 돕습니다.",
    accent: "#4F86C6"
  },
  ENFJ: {
    nickname: "성장 버튼을 찾아 누르는 코치",
    image: "🌟",
    imageLabel: "성장을 비추는 별",
    shortDescription: "사람의 성장을 돕고 방향을 제시하는 리더형",
    longDescription: "사람마다 어디서 빛나는지 찾아내는 편입니다. 격려만 하는 것이 아니라 방향과 기대치를 함께 제시합니다. 진지하게는 개인의 성장을 조직의 성과와 연결하는 데 강합니다.",
    accent: "#588157"
  },
  ENTJ: {
    nickname: "목표를 향해 판을 짜는 지휘관",
    image: "♟️",
    imageLabel: "전략을 상징하는 체스 말",
    shortDescription: "큰 목표를 세우고 체계적으로 이끄는 지휘형",
    longDescription: "목표가 보이면 필요한 판부터 짭니다. 가끔 속도가 빨라 주변이 안전벨트를 찾을 수 있지만, 진지하게는 큰 방향을 잡고 실행 체계를 만드는 힘이 있습니다. 복잡한 상황에서 결정을 미루지 않습니다.",
    accent: "#17202A"
  }
};
