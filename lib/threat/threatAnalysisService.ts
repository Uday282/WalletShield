import { checkWalletThreat }
from "@/lib/threatIntel";

import { analyzeWalletReputation }
from "@/lib/walletReputation";

import {
  ThreatAnalysisResult
}
from "./types";

import {
  getThreatLevel
}
from "./threatScoring";

export async function analyzeWalletThreat(
  address: string
): Promise<ThreatAnalysisResult> {

  let score = 0;

  const findings: string[] = [];

  const reputation =
    analyzeWalletReputation(
      address
    );

  const goplus =
    await checkWalletThreat(
      address
    );

  return {

    score,

    level:
      getThreatLevel(score),

    findings,

    reputation:
      reputation?.label,

  };
}