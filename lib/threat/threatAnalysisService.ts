import { analyzeGoPlus } from "./providers/goplusProvider";
import { checkWalletThreat } from "@/lib/threatIntel";
import { analyzeWalletReputation } from "@/lib/walletReputation";

import { ThreatAnalysisResult } from "./types";
import { getThreatLevel } from "./threatScoring";

export async function analyzeWalletThreat(
  address: string
): Promise<ThreatAnalysisResult> {

  let score = 0;

  const findings: string[] = [];

  const reputation =
    analyzeWalletReputation(address);

  const goplus =
  await checkWalletThreat(
    address
  );

const result =
  goplus?.result;
  const goplusAnalysis =
  analyzeGoPlus(result);

score +=
  goplusAnalysis.score;

findings.push(
  ...goplusAnalysis.findings
);
console.log(
  "PARSED GOPLUS RESULT:",
  result
);
  if (result) {

    if (result.phishing === "1") {

      findings.push(
        "Known phishing wallet"
      );

      score += 60;

    }

    if (result.malicious_address === "1") {

      findings.push(
        "Known malicious wallet"
      );

      score += 80;

    }

    if (result.sanctioned === "1") {

      findings.push(
        "Sanctioned wallet"
      );

      score += 80;

    }

    if (result.mixer === "1") {

      findings.push(
        "Associated with a mixer"
      );

      score += 40;

    }

    if (result.drainer === "1") {

      findings.push(
        "Wallet drainer detected"
      );

      score += 100;

    }

  }

  return {

    score,

    level:
      getThreatLevel(score),

    findings,

    reputation:
      reputation?.label

  };

}