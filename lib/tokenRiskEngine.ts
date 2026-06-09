export function analyzeTokenRisk(
  tokenSecurity: any
) {

  if (!tokenSecurity) {

    return {

      score: 0,

      level: "SAFE",

      findings: [],
    };
  }

  let score = 0;

  const findings: string[] = [];
const isTrustedToken =
  tokenSecurity.trust_list === "1";
  //
  // HONEYPOT
  //

  if (
    tokenSecurity.is_honeypot === "1"
  ) {

    score += 50;

    findings.push(
      "Honeypot detected."
    );
  }

  //
  // MINTABLE
  //

  if (
    tokenSecurity.is_mintable === "1"
  ) {

    score += 20;

    findings.push(
      "Owner can mint new tokens."
    );
  }

  //
  // BLACKLIST
  //

  if (
    tokenSecurity.is_blacklisted === "1"
  ) {

    score += 20;

    findings.push(
      "Blacklist functionality detected."
    );
  }

  //
  // OWNER CAN CHANGE BALANCE
  //

  if (
    tokenSecurity.owner_change_balance === "1"
  ) {

    score += 15;

    findings.push(
      "Owner can modify balances."
    );
  }

  //
  // OWNERSHIP NOT RENOUNCED
  //

  if (
    tokenSecurity.can_take_back_ownership === "1"
  ) {

    score += 10;

    findings.push(
      "Ownership can be reclaimed."
    );
  }

  //
  // CLOSED SOURCE
  //

  if (
    tokenSecurity.is_open_source === "0"
  ) {

    score += 15;

    findings.push(
      "Contract is not open source."
    );
  }

  score =
    Math.min(score, 100);
if (isTrustedToken) {

  score = Math.max(
    score - 40,
    0
  );
}
  let level = "SAFE";

  if (score >= 80) {

    level = "MALICIOUS";

  } else if (
    score >= 50
  ) {

    level = "HIGH_RISK";

  } else if (
    score >= 20
  ) {

    level = "SUSPICIOUS";
  }

  return {

    score,

    level,

    findings,
  };
}