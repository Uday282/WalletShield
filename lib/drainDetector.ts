import {
  Approval,
  Activity,
} from "@/types/wallet";

export function detectWalletDrainRisk({
  approvals,
  activities,
}: {
  approvals: Approval[];

  activities: Activity[];
}) {

  let threatLevel = "Safe";

  let score = 0;

  const warnings: string[] = [];

  const criticalApprovals =
    approvals.filter(
      (a) =>
        a.risk ===
        "Critical"
    ).length;

  const highApprovals =
    approvals.filter(
      (a) =>
        a.risk ===
        "High"
    ).length;

  if (
    criticalApprovals >= 1
  ) {

    score += 50;

    warnings.push(
      "Critical approval detected"
    );
  }

  if (
    highApprovals >= 3
  ) {

    score += 30;

    warnings.push(
      "Multiple high-risk approvals detected"
    );
  }

  const suspiciousActivities =
    activities.filter(
      (a) =>
        a.risk ===
        "Critical"
    ).length;

  if (
    suspiciousActivities >= 1
  ) {

    score += 40;

    warnings.push(
      "Suspicious wallet activity detected"
    );
  }

  if (score >= 80) {

    threatLevel =
      "Critical";
  }

  else if (
    score >= 50
  ) {

    threatLevel =
      "High";
  }

  else if (
    score >= 20
  ) {

    threatLevel =
      "Medium";
  }

  return {
    threatLevel,
    score,
    warnings,
  };
}