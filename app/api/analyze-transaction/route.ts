
import {
  enrichTransaction
} from "@/lib/enrichTransaction";

import {
  decodeTransactionData
} from "@/lib/transactionDecoder";

import {
  simulateTransaction
} from "@/lib/simulateTransaction";
import {
  createTransactionReport
} from "@/lib/createTransactionReport";

import {
  getThreatContract
} from "@/lib/threatDatabase";
import {
  isKnownDrainer
} from "@/lib/drainers";
import {
  getProtocolName
} from "@/lib/protocolRegistry";
import { NextResponse } from "next/server";
import {
  checkSpenderReputation
} from "@/lib/spenderReputation";
import {
  getTokenName
} from "@/lib/tokenRegistry";
export async function POST(req: Request) {
console.log(
  "ANALYZE TRANSACTION ROUTE HIT"
);
  const body = await req.json();

  const findings: string[] = [];

  let score = 0;

  const method =
    body?.payload?.method;

 // Handle wallet_sendCalls
let enrichedTransaction;
let simulation;
let decodedTransaction;
if (method === "wallet_sendCalls") {

  const calls =
    body?.payload?.params?.[0]?.calls || [];

  for (const call of calls) {

    const data =
      call?.data || "";
console.log(
  "FUNCTION SELECTOR:",
  data.slice(0, 10)
);

console.log(
  "FULL CALLDATA:",
  data
);
    decodedTransaction =
  decodeTransactionData(
    data
  );

enrichedTransaction =
  await enrichTransaction(
    decodedTransaction
  );

const decoded =
  enrichedTransaction;
simulation =
  simulateTransaction(
    decoded
  );

    console.log(
      "SIMULATION:",
      simulation
    );

    console.log(
      "TOKEN:",
      call.to
    );

    const tokenName =
      getTokenName(
        call.to
      );

    if (
      tokenName !==
      "Unknown Token"
    ) {

      findings.push(
        `Token: ${tokenName}`
      );

    }

    if (
      decoded.protocol
    ) {

      findings.push(
        `Protocol: ${decoded.protocol}`
      );

    }

    if (
      decoded.action ===
      "Unlimited Approval"
    ) {

      findings.push(
        "Unlimited Approval Risk"
      );

      score += 25;

    }

    else if (
      decoded.action ===
      "Approval"
    ) {

      findings.push(
        "ERC20 Approval Detected"
      );

      score += 10;

    }

    else if (
      decoded.action ===
      "Universal Router Transaction"
    ) {

      findings.push(
        "Uniswap Universal Router"
      );

      score += 20;

    }

    const spender =
      decoded.spender;

    if (spender) {

      console.log(
        "SPENDER:",
        spender
      );

      const threatResponse =
        await fetch(
          "http://localhost:3000/api/threat-check",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json"
            },
            body: JSON.stringify({
              address: spender
            })
          }
        );

      const threatData =
        await threatResponse.json();

      console.log(
        "THREAT API RESULT:",
        threatData
      );

      const threat =
        threatData.threat;

      if (threat) {

        findings.push(
          threat.reason
        );

        if (
          threat.severity ===
          "Critical"
        ) {

          score += 100;

        }

      }

      const drainer =
        isKnownDrainer(
          spender
        );

      if (drainer) {

        findings.push(
          "Known Wallet Drainer"
        );

        score += 100;

      }

      const spenderRisk =
        checkSpenderReputation(
          spender
        );

      if (
        spenderRisk.detected &&
        "label" in spenderRisk &&
        "severity" in spenderRisk
      ) {

        findings.push(
          spenderRisk.label
        );

        if (
          spenderRisk.severity ===
          "Critical"
        ) {

          score += 100;

        }

        else if (
          spenderRisk.severity ===
          "High"
        ) {

          score += 50;

        }

        else if (
          spenderRisk.severity ===
          "Medium"
        ) {

          score += 20;

        }

      }

    }

  }

}

  if (method === "eth_sendTransaction") {

    const tx =
      body?.payload?.params?.[0];
console.log(
  "ETH TX JSON:",
  JSON.stringify(
    tx,
    null,
    2
  )
);
console.log(
  "TX DATA:",
  tx?.data
);

console.log(
  "TX TO:",
  tx?.to
);

console.log(
  "TX VALUE:",
  tx?.value
);

const data =
  tx?.data || "";

decodedTransaction =
  decodeTransactionData(
    data,
    tx?.value
  );
enrichedTransaction =
  await enrichTransaction(
    decodedTransaction
  );

const decoded =
  enrichedTransaction;
simulation =
  simulateTransaction(
    decoded
  );

console.log(
  "SIMULATION:",
  simulation
);

if (
  decoded.protocol
) {

  findings.push(
    `Protocol: ${decoded.protocol}`
  );

}

if (
  decoded.action ===
  "Unlimited Approval"
) {

  findings.push(
    "Unlimited Approval Risk"
  );

  score += 25;

}

else if (
  decoded.action ===
  "Approval"
) {

  findings.push(
    "ERC20 Approval Detected"
  );

  score += 10;

}

else if (
  decoded.action ===
  "Universal Router Transaction"
) {

  findings.push(
    "Uniswap Universal Router"
  );

  score += 20;

}

const spender =
  decoded.spender;

if (spender) {

  const threatResponse =
    await fetch(
      "http://localhost:3000/api/threat-check",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          address: spender
        })
      }
    );

  const threatData =
    await threatResponse.json();

  const threat =
    threatData.threat;

  if (threat) {

    findings.push(
      threat.reason
    );

    if (
      threat.severity ===
      "Critical"
    ) {

      score += 100;

    }

  }

}

}

let decision:
  "ALLOW" |
  "REVIEW" |
  "BLOCK" =
  "ALLOW";

if (
  score >= 100
) {

  decision =
    "BLOCK";

}

else if (
  score >= 20
) {

  decision =
    "REVIEW";

}

const report =
  createTransactionReport(

    decision,

    score,

    findings,

    {

      action:
  enrichedTransaction?.action ?? "Unknown",

token:
  enrichedTransaction?.token,

protocol:
  enrichedTransaction?.protocol,

spender:
  enrichedTransaction?.spender,

      risk:
        decision === "BLOCK"
          ? "Critical"
          : decision === "REVIEW"
          ? "Medium"
          : "Low"

    }

  );

return NextResponse.json({

  ...report,

  simulation

});
}