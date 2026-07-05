export type MbtiLetter = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
export type MbtiType = `${"E" | "I"}${"S" | "N"}${"T" | "F"}${"J" | "P"}`;

export type Scores = Record<MbtiLetter, number>;

export type ResultRecord = {
  id: string;
  nickname: string;
  mbti: MbtiType;
  scores: Scores;
  createdAt: string;
};

export type AccessLog = {
  id: string;
  path: string;
  nickname: string | null;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
};

export type AccessLogPage = {
  logs: AccessLog[];
  page: number;
  pageSize: number;
  total: number;
  anonymousTotal: number;
  totalPages: number;
};

export type AxisStats = {
  EI: { E: number; I: number };
  SN: { S: number; N: number };
  TF: { T: number; F: number };
  JP: { J: number; P: number };
};

export type Stats = {
  byType: Record<MbtiType, number>;
  byAxis: AxisStats;
};

