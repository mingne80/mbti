import { allTypes, emptyScores } from "./questions";
import type { ResultRecord, Stats } from "./types";

export function buildStats(results: ResultRecord[]): Stats {
  const byType = Object.fromEntries(allTypes.map((type) => [type, 0])) as Stats["byType"];
  const totals = emptyScores();

  for (const result of results) {
    byType[result.mbti] += 1;
    for (const letter of Object.keys(totals) as Array<keyof typeof totals>) {
      totals[letter] += result.scores[letter] ?? 0;
    }
  }

  return {
    byType,
    byAxis: {
      EI: { E: totals.E, I: totals.I },
      SN: { S: totals.S, N: totals.N },
      TF: { T: totals.T, F: totals.F },
      JP: { J: totals.J, P: totals.P }
    }
  };
}
