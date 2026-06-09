import { ThreatProfile } from "./buildThreatProfile";

export function generateThreatActions(
  threatProfile: ThreatProfile
): string[] {

  const actions: string[] = [];

  if (
    threatProfile.level === "SAFE"
  ) {

    return [
      "No immediate threats detected.",
      "Continue using standard wallet security practices.",
      "Review token approvals periodically.",
    ];
  }

  const findings =
    threatProfile.findings.join(" ")
      .toLowerCase();

  if (
    findings.includes(
      "phishing"
    )
  ) {

    actions.push(
      "Do not send funds to this wallet."
    );

    actions.push(
      "Do not sign transactions requested by this wallet."
    );

    actions.push(
      "Treat all communications from this wallet as untrusted."
    );
  }

  if (
    findings.includes(
      "sanction"
    )
  ) {

    actions.push(
      "Avoid all interactions with this wallet."
    );

    actions.push(
      "Review compliance implications before proceeding."
    );
  }

  if (
    findings.includes(
      "mixer"
    )
  ) {

    actions.push(
      "Exercise extreme caution when interacting with this wallet."
    );
  }

  if (
    threatProfile.level ===
      "HIGH_RISK" ||
    threatProfile.level ===
      "MALICIOUS"
  ) {

    actions.push(
      "Avoid interacting with linked contracts."
    );

    actions.push(
      "Verify destination addresses independently."
    );
  }

  return [
    ...new Set(actions),
  ];
}