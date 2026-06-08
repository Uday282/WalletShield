import { useState } from "react";
import {
  Approval,
} from "@/types/wallet";

type Props = {
  approvals: Approval[];

  revokeApproval: (
    tokenAddress: string,
    spenderAddress: string
  ) => void;
};

export default function TokenApprovals({
  approvals,
  revokeApproval,
}: Props) {

  const [isScanning, setIsScanning] =
  useState(false);

  const handleScan = async () => {

  setIsScanning(true);

  await new Promise(
    (resolve) =>
      setTimeout(resolve, 2000)
  );

  setIsScanning(false);
};
  const highRiskCount =
  approvals.filter(
    (a) => a.risk === "High"
  ).length;

const criticalCount =
  approvals.filter(
    (a) =>
      a.risk === "Critical"
  ).length;
const approvalHealthScore = Math.max(
  0,
  100 - highRiskCount * 10 - criticalCount * 25
);
const exposure =
  criticalCount > 0
    ? "CRITICAL"
    : highRiskCount > 0
    ? "HIGH"
    : approvals.length > 0
    ? "LOW"
    : "SAFE";

    let recommendation = "✓ No action required";

if (criticalCount > 0) {
  recommendation =
    `⚠ Revoke ${criticalCount} critical approval(s) immediately`;
} else if (highRiskCount > 0) {
  recommendation =
    `⚠ Review ${highRiskCount} high-risk approval(s)`;
}

  return (

    <div className="bg-zinc-900 rounded-2xl p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        🛡️ Token Approval Scanner
        <p className="text-zinc-400 text-sm mt-2 mb-6">
  Detect contracts that can spend your tokens.
</p>
      </h2>
<div className="bg-zinc-800 rounded-xl p-4 mb-6">

  <div className="flex items-center justify-between">

  <p className="text-zinc-400 text-sm">
    Approval Scanner
  </p>

  <button
  onClick={handleScan}
  className="
    px-4
    py-2
    rounded-lg
    bg-blue-600
    hover:bg-blue-700
    text-sm
    font-medium
  "
>
{isScanning
  ? "Scanning..."
  : "Scan Wallet"}</button>

</div>
<div className="flex items-center gap-2 mt-3">

  <div className="w-2 h-2 rounded-full bg-green-400" />

  <p className="text-sm text-green-400">
    Scan Complete
  </p>

</div>

<p className="text-xs text-zinc-500 mt-1">
  Last Scan: {new Date().toLocaleTimeString()}
</p>
<div className="grid grid grid-cols-1 md:grid-cols-3 gap-8 mt-3 gap-8 mt-3">    
  <div>
      <p className="text-zinc-500 text-sm">
        Total Approvals
      </p>

      <p className="text-2xl font-bold">
        {approvals.length}
      </p>
    </div>

    <div>
      <p className="text-zinc-500 text-sm">
        High Risk
      </p>

      <p className="text-2xl font-bold text-red-400">
        {highRiskCount}
      </p>
    </div>
<div>
  <p className="text-zinc-500 text-sm">
    Critical
  </p>

  <p className="text-2xl font-bold text-red-600">
    {criticalCount}
  </p>
</div>
  </div>

  <div className="mt-4">
<div className="mt-6">

  <p className="text-zinc-500 text-sm">
    Approval Health Score
  </p>

  <p
    className={`text-4xl font-bold ${
      approvalHealthScore >= 80
        ? "text-green-400"
        : approvalHealthScore >= 50
        ? "text-yellow-400"
        : "text-red-500"
    }`}
  >
    {approvalHealthScore}/100
  </p>


</div>
    <p className="text-zinc-500 text-sm">
      Wallet Exposure
    </p>

    <p
  className={`text-3xl font-bold ${
    exposure === "SAFE"
      ? "text-green-400"
      : exposure === "HIGH"
      ? "text-yellow-400"
      : "text-red-500"
  }`}
>
  {exposure}
</p>
<div className="mt-6">

  <p className="text-zinc-500 text-sm">
    Recommendation
  </p>

  <p className="font-medium mt-2">
    {recommendation}
  </p>

</div>
<div className="mt-6">

  <p className="text-zinc-500 text-sm">
    Risk Breakdown
  </p>

  <div className="mt-2 space-y-1 text-sm">

    <p>
      Trusted Approvals:
      {" "}
      {approvals.length -
        highRiskCount -
        criticalCount}
    </p>

    <p>
      High Risk Approvals:
      {" "}
      {highRiskCount}
    </p>

    <p>
      Critical Approvals:
      {" "}
      {criticalCount}
    </p>

  </div>

</div>
  </div>

</div>
      <div className="space-y-4">

        {approvals.length === 0 && (

          <div className="bg-zinc-800 p-4 rounded-xl text-gray-400">

            No risky approvals detected.

          </div>

        )}

        {approvals.map(
          (
            approval,
            index
          ) => (

            <div
              key={index}
              className="bg-zinc-800 p-4 rounded-xl flex justify-between items-center"
            >

              <div>

                <p className="font-bold">
                  {approval.token}
                </p>

                <p className="text-gray-400 text-sm">
                  {approval.spender}
                </p>

                <p className="text-sm text-gray-500">

                  Allowance:
                  {" "}
                  {approval.amount}

                </p>

              </div>

              <div className="text-right">

                <p
                  className={`${approval.riskColor} font-bold`}
                >
                  {approval.risk}
                </p>

                <button
                  onClick={() =>
                    revokeApproval(
                      approval.tokenAddress,
                      approval.spenderAddress
                    )
                  }
                  className="mt-2 bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-sm"
                >
                  Revoke
                </button>

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}