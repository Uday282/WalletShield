export function generateTransactionExplanation(
  findings: string[]
): string {

  const hasUnlimitedApproval =
    findings.includes(
      "Unlimited Approval Risk"
    );

  const hasApproval =
    findings.includes(
      "ERC20 Approval Detected"
    );

  const protocol =
    findings.find(
      (f) =>
        f.startsWith(
          "Protocol:"
        )
    );

  const token =
    findings.find(
      (f) =>
        f.startsWith(
          "Token:"
        )
    );

  const drainer =
    findings.includes(
      "Known Wallet Drainer"
    );

  if (drainer) {

    return `
WalletShield has identified this transaction as interacting with a known wallet drainer.

Signing this transaction may immediately place your assets at risk.

Do NOT continue unless you are absolutely certain this is expected.
`;

  }

  if (
    hasUnlimitedApproval &&
    token &&
    protocol
  ) {

    return `
You are about to give ${protocol.replace("Protocol: ", "")} permission to spend ALL of your ${token.replace("Token: ", "")}.

Unlimited approvals remain active until you revoke them.

Only continue if you completely trust this application.
`;

  }

  if (
    hasApproval &&
    token
  ) {

    return `
You are approving access to your ${token.replace("Token: ", "")}.

Review the transaction carefully before signing.
`;

  }

  return `
WalletShield detected activity that requires your attention.

Please review this transaction carefully before signing.
`;
}