export function askSecurityCopilot(
  question: string
) {

  const q =
    question.toLowerCase();

  if (
    q.includes("approval")
  ) {

    return {

      answer:
        "Token approvals allow smart contracts to spend your tokens. Unlimited approvals can be dangerous if the contract becomes malicious.",

      risk: "Medium",
    };
  }

  if (
    q.includes("wallet")
  ) {

    return {

      answer:
        "Wallet risk depends on approvals, suspicious interactions, phishing exposure, and transaction activity.",

      risk: "Low",
    };
  }

  if (
    q.includes("phishing")
  ) {

    return {

      answer:
        "Phishing websites attempt to trick users into signing malicious transactions or revealing wallet access.",

      risk: "High",
    };
  }

  if (
    q.includes("revoke")
  ) {

    return {

      answer:
        "Revoking approvals removes smart contract spending permissions from your wallet.",

      risk: "Low",
    };
  }

  if (
    q.includes("drain")
  ) {

    return {

      answer:
        "Wallet drain attacks attempt to steal assets through malicious approvals or smart contract interactions.",

      risk: "Critical",
    };
  }

  return {

    answer:
      "No specific threat intelligence found. Continue monitoring wallet activity carefully.",

    risk: "Unknown",
  };
}