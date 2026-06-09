export interface ThreatProfile {

  score: number;

  level: string;

  findings: string[];

  reputation?: string;

  classification?: string;

  drainRisk?: string;
}

export function buildThreatProfile({

  threatIntel,

  walletReputation,

  walletClassification,

  drainAnalysis,

}: {

  threatIntel: any;

  walletReputation: any;

  walletClassification: any;

  drainAnalysis: any;

}): ThreatProfile {

  let score =
    threatIntel?.score || 0;

  const findings = [
    ...(threatIntel?.findings || []),
  ];

  //
  // REPUTATION
  //

  if (
  walletReputation?.label &&
  walletReputation.label !==
    "Unlabeled Wallet"
) {

  findings.push(
    `Known entity: ${walletReputation.label}`
  );
}

  //
  // CLASSIFICATION
  //

  

  //
  // DRAIN RISK
  //

  if (
    drainAnalysis?.score > 0
  ) {

    score +=
      Math.min(
        drainAnalysis.score,
        30
      );

    findings.push(
      ...drainAnalysis.warnings
    );
  }

  score =
    Math.min(score, 100);

  let level =
    "SAFE";

  if (score >= 80) {

    level =
      "MALICIOUS";

  } else if (
    score >= 60
  ) {

    level =
      "HIGH_RISK";

  } else if (
    score >= 30
  ) {

    level =
      "SUSPICIOUS";
  }

  return {

    score,

    level,

    findings,

    reputation:
  walletReputation?.label ===
  "Unlabeled Wallet"
    ? "No Known Entity"
    : walletReputation?.label,

    classification:
      walletClassification?.type,

    drainRisk:
      drainAnalysis?.threatLevel,
  };
}