import {
  TransactionReport
} from "./buildTransactionReport";

import {
  generateTransactionExplanation
} from "./generateTransactionExplanation";

export function createTransactionReport(
  decision: "ALLOW" | "REVIEW" | "BLOCK",
  score: number,
  findings: string[],
  summary: TransactionReport["summary"]
): TransactionReport {

  return {

    decision,

    score,

    summary,

    findings,

    explanation:
      generateTransactionExplanation(
        findings
      ),

    recommendation:

      decision === "BLOCK"

        ? "Do not continue unless you fully trust this application."

        : decision === "REVIEW"

        ? "Review the transaction carefully before signing."

        : "No major security concerns were detected."

  };

}