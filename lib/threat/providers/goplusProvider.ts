export function analyzeGoPlus(result: any) {

  console.log(
    "GOPLUS PROVIDER:",
    result
  );

  let score = 0;

  const findings: string[] = [];

  if (!result) {

    return { score, findings };

  }

  if (result.contract_address === "1") {

    // Normal behavior.
  // Most DeFi protocols (Uniswap, Aave, Curve, etc.)
  // are smart contracts, so don't show this as a warning.


  }

  if (result.phishing_activities === "1") {

    findings.push("Known phishing address");

    score += 60;

  }

  if (result.stealing_attack === "1") {

    findings.push("Known wallet drainer");

    score += 100;

  }

  if (result.sanctioned === "1") {

    findings.push("Sanctioned address");

    score += 80;

  }

  if (result.mixer === "1") {

    findings.push("Mixer interaction");

    score += 40;

  }

  if (result.fake_token === "1") {

    findings.push("Fake token");

    score += 60;

  }

  if (result.honeypot_related_address === "1") {

    findings.push("Honeypot");

    score += 80;

  }

  if (result.cybercrime === "1") {

    findings.push("Cybercrime activity");

    score += 80;

  }

  if (result.money_laundering === "1") {

    findings.push("Money laundering");

    score += 70;

  }

  console.log(
    "GOPLUS ANALYSIS:",
    {
      score,
      findings
    }
  );

  return {

    score,

    findings

  };

}