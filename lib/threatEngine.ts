import {
  DANGEROUS_CONTRACTS,
} from "@/lib/constants";

export function analyzeApprovalThreats(
  approvals: any[]
) {

  const alerts = [];

  for (const approval of approvals) {

    const amount =
      Number(approval.amount);

    const spender =
      approval.spenderAddress?.toLowerCase();

    const isUnlimited =
      amount > 1000000;

    const isDangerous =
      DANGEROUS_CONTRACTS.includes(
        spender
      );

    if (
      isUnlimited &&
      isDangerous
    ) {

      alerts.push({

        severity:
          "Critical",

        title:
          "Malicious Unlimited Approval",

        message:
          `${approval.spender}
           has unlimited access
           to ${approval.token}.`,
      });

      continue;
    }

    if (isUnlimited) {

      alerts.push({

        severity:
          "High",

        title:
          "Unlimited Token Approval",

        message:
          `${approval.spender}
           has very high spending
           permissions.`,
      });

      continue;
    }

    if (isDangerous) {

      alerts.push({

        severity:
          "Critical",

        title:
          "Known Dangerous Contract",

        message:
          `${approval.spender}
           is flagged as malicious.`,
      });
    }
  }

  return alerts;
}