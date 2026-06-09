import {
  classifyWallet,
} from "@/lib/walletClassifier";
import { checkWalletThreat } from "@/lib/threatIntel";
import {
  analyzeWalletReputation,
} from "@/lib/walletReputation";
export type ThreatLevel =
  | "SAFE"
  | "SUSPICIOUS"
  | "HIGH_RISK"
  | "MALICIOUS";

export interface ThreatAnalysisResult {
  score: number;

  level: ThreatLevel;

  findings: string[];

  reputation?: string;

  classification?: string;
}

export async function analyzeWalletThreat(
  address: string
): Promise<ThreatAnalysisResult> {

  const findings: string[] = [];

  let score = 0;
const reputation =
  analyzeWalletReputation(
    address
  );
  const response =
    await checkWalletThreat(address);

  const data = response;

  const result = data?.result;

  if (!result) {
    return {
      score: 0,
      level: "SAFE",
      findings: [
        "No threat intelligence available."
      ],
    };
  }

  if (result.cybercrime === "1") {
    score += 80;

    findings.push(
      "Associated with cybercrime."
    );
  }

  if (result.money_laundering === "1") {
    score += 70;

    findings.push(
      "Associated with money laundering."
    );
  }

  if (result.phishing_activities === "1") {
    score += 70;

    findings.push(
      "Associated with phishing activity."
    );
  }

  if (result.sanctioned === "1") {
    score += 100;

    findings.push(
      "Sanctioned address detected."
    );
  }

  if (result.mixer === "1") {
    score += 60;

    findings.push(
      "Mixer activity detected."
    );
  }

  if (result.financial_crime === "1") {
    score += 80;

    findings.push(
      "Associated with financial crime."
    );
  }

  if (result.contract_address === "1") {
    findings.push(
      "Smart contract address."
    );
  }
if (reputation) {

  findings.push(
    `Known entity: ${reputation.label}`
  );

  if (
    reputation.risk ===
    "Low"
  ) {

    score = Math.max(
      score - 10,
      0
    );
  }
}
  score = Math.min(score, 100);

  let level: ThreatLevel = "SAFE";

  if (score >= 80) {
    level = "MALICIOUS";
  } else if (score >= 60) {
    level = "HIGH_RISK";
  } else if (score >= 30) {
    level = "SUSPICIOUS";
  }
return {
  score,
  level,
  findings,

  reputation:
    reputation?.label,
};
}