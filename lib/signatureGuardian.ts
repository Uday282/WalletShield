export function evaluateSignatureThreat(
  decoded: any,
  transactionRisk: any,
  spenderThreat: any,
  protocolReputation: any
){

  const reasons: string[] = [];

  let action = "ALLOW";

  // Unlimited approval / critical risk

  if (
    transactionRisk?.score >= 80
  ) {

    action = "BLOCK";

    reasons.push(
      "Critical transaction risk detected."
    );
  }

  // Known malicious spender

  // Known malicious spender

if (
  spenderThreat?.detected
) {

  action = "BLOCK";

  reasons.push(
    "Known malicious spender detected."
  );
}

// Known malicious protocol

if (
  protocolReputation?.risk ===
  "Critical"
) {

  action = "BLOCK";

  reasons.push(
    "Known malicious protocol detected."
  );
}
  // Standard token approval

  if (
    decoded?.type ===
      "Token Approval" &&
    action !== "BLOCK"
  ) {

    action = "REVIEW";

    reasons.push(
      "Token spending permission requested."
    );
  }

  // NFT Approval For All

  if (
    decoded?.type ===
    "NFT Approval For All"
  ) {

    action = "BLOCK";

    reasons.push(
      "Full NFT collection access requested."
    );
  }

  return {
    action,
    reasons,
  };
}