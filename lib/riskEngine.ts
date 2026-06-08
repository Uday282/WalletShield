import {
  Approval,
  Activity,
  Token,
} from "@/types/wallet";

export function calculateRisk({
  isConnected,
  balance,
  approvals,
  activities,
  tokens,
  selectedChain,
}: {
  isConnected: boolean;

  balance: string;

  approvals: Approval[];

  activities: Activity[];

  tokens: Token[];

  selectedChain: string;
}) {

  let score = 100;

  const risks: string[] = [];

  if (!isConnected) {

    score -= 40;

    risks.push(
      "Wallet not connected"
    );
  }

  if (
    selectedChain === "bsc"
  ) {

    score -= 5;

    risks.push(
      "BNB Chain has higher scam activity risk"
    );
  }

  if (tokens.length === 0) {

    score -= 10;

    risks.push(
      "No ERC20 tokens detected"
    );
  }

  if (
    Number(balance || 0) <
    0.01
  ) {

    score -= 5;

    risks.push(
      "Very low native token balance"
    );
  }

  const criticalApprovals =
    approvals.filter(
      (a) =>
        a.risk ===
        "Critical"
    ).length;

  const highRiskApprovals =
    approvals.filter(
      (a) =>
        a.risk ===
        "High"
    ).length;

  score -=
    criticalApprovals * 25;

  score -=
    highRiskApprovals * 10;

  if (
    criticalApprovals > 0
  ) {

    risks.push(
      "Critical approvals detected"
    );
  }

  if (
    highRiskApprovals > 0
  ) {

    risks.push(
      "High-risk approvals detected"
    );
  }

  const criticalActivities =
    activities.filter(
      (a) =>
        a.risk ===
        "Critical"
    ).length;

  if (
    criticalActivities > 0
  ) {

    score -= 15;

    risks.push(
      "Suspicious wallet activity detected"
    );
  }

  if (score < 0) {
    score = 0;
  }

  let grade = "A";

  let gradeColor =
    "text-green-400";

  if (score < 90) {

    grade = "B";

    gradeColor =
      "text-yellow-400";
  }

  if (score < 70) {

    grade = "C";

    gradeColor =
      "text-orange-400";
  }

  if (score < 50) {

    grade = "D";

    gradeColor =
      "text-red-400";
  }

  if (score < 30) {

    grade = "F";

    gradeColor =
      "text-red-600";
  }

  return {
    score,
    grade,
    gradeColor,
    risks,
    criticalApprovals,
    highRiskApprovals,
  };
}