import { ThreatProfile } from "./buildThreatProfile";

export function generateThreatExplanation(
  threatProfile: ThreatProfile
): string {

  if (
    threatProfile.level === "SAFE"
  ) {

    return `
No major threat indicators were detected.

The wallet appears safe based on current intelligence sources.

Continue following standard security practices when interacting with this address.
`;
  }

  if (
    threatProfile.findings.some(
      (f) =>
        f.toLowerCase().includes(
          "phishing"
        )
    )
  ) {

    return `
This wallet has been associated with phishing activity.

The threat score indicates elevated risk and interactions with this address may expose funds to theft.

Avoid sending funds or signing transactions involving this wallet.
`;
  }

  if (
    threatProfile.findings.some(
      (f) =>
        f.toLowerCase().includes(
          "sanction"
        )
    )
  ) {

    return `
This wallet appears to be associated with sanctioned activity.

Interactions may expose users to compliance and security risks.

Avoid interacting with this address.
`;
  }

  if (
    threatProfile.level ===
    "HIGH_RISK"
  ) {

    return `
Multiple threat indicators have been detected.

This wallet should be treated as potentially dangerous.

Exercise extreme caution before interacting with this address.
`;
  }

  if (
    threatProfile.level ===
    "MALICIOUS"
  ) {

    return `
This wallet has been classified as malicious.

Interactions may result in loss of funds or exposure to fraudulent activity.

Do not send funds or sign transactions involving this address.
`;
  }

  return `
This wallet exhibits suspicious characteristics.

Review findings carefully before interacting with this address.
`;
}