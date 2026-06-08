import {
  Activity,
} from "@/types/wallet";

export function analyzeWalletBehavior(
  activities: Activity[]
) {

  let suspiciousScore = 0;

  const findings: string[] =
    [];

  if (
    activities.length >= 10
  ) {

    suspiciousScore += 30;

    findings.push(
      "High transaction frequency detected."
    );
  }

  const criticalActivities =
    activities.filter(
      (a) =>
        a.risk ===
        "Critical"
    ).length;

  if (
    criticalActivities >= 2
  ) {

    suspiciousScore += 40;

    findings.push(
      "Multiple critical wallet interactions detected."
    );
  }

  const nftInteractions =
    activities.filter(
      (a) =>
        a.type
          .toLowerCase()
          .includes(
            "erc721"
          )
    ).length;

  if (
    nftInteractions >= 3
  ) {

    suspiciousScore += 20;

    findings.push(
      "Heavy NFT interaction activity detected."
    );
  }

  let riskLevel = "Low";

  if (
    suspiciousScore >= 40
  ) {

    riskLevel = "Medium";
  }

  if (
    suspiciousScore >= 70
  ) {

    riskLevel = "High";
  }

  return {

    suspiciousScore,

    findings,

    riskLevel,
  };
}