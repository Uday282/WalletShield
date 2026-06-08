type Props = {
  simulationResult: any;
  transactionRisk: any;
  spenderThreat: any;
  assetExposure: any;
  guardianDecision: any;
  protocolReputation: any;
};

export default function TransactionSimulation({
simulationResult,
transactionRisk,
spenderThreat,
assetExposure,
guardianDecision,
protocolReputation,
}: Props) {
if (!simulationResult) {
return null;
}

return ( <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 mt-6">


  <div className="flex items-center justify-between mb-6">
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-2">
        Transaction Intelligence
      </p>

      <h2 className="text-2xl font-semibold text-white">
        Simulation & Risk Preview
      </h2>
    </div>

    <div
      className={`px-4 py-2 rounded-full text-sm font-semibold ${
        transactionRisk?.level === "Critical"
          ? "bg-red-500/20 text-red-400"
          : transactionRisk?.level === "High"
          ? "bg-orange-500/20 text-orange-400"
          : transactionRisk?.level === "Medium"
          ? "bg-yellow-500/20 text-yellow-400"
          : "bg-green-500/20 text-green-400"
      }`}
    >
      {transactionRisk?.level || "Low"} Risk
    </div>
  </div>
{guardianDecision && (

  <div className="mb-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

    <p className="text-zinc-500 text-sm mb-2">

      Guardian Decision

    </p>

    <p
      className={`text-3xl font-bold ${
        guardianDecision.action ===
        "BLOCK"
          ? "text-red-400"
          : guardianDecision.action ===
            "REVIEW"
          ? "text-yellow-400"
          : "text-green-400"
      }`}
    >

      {guardianDecision.action}
<p className="mt-4 text-sm text-zinc-300">

  {guardianDecision.action === "BLOCK"
    ? "Critical security risks detected. This transaction may expose wallet assets or grant dangerous permissions."
    : guardianDecision.action === "REVIEW"
    ? "This transaction requests permissions that should be reviewed before signing."
    : "No significant threats detected. This transaction appears safe."}

</p>

<div className="mt-4 bg-zinc-800 rounded-xl p-4">

  <p className="text-xs uppercase text-zinc-500">

    Recommendation

  </p>

  <p className="mt-2 text-sm">

    {guardianDecision.action === "BLOCK"
      ? "Do not sign this transaction."
      : guardianDecision.action === "REVIEW"
      ? "Verify the spender and permissions before signing."
      : "Safe to proceed."}

  </p>

</div>
    </p>

    <div className="mt-3 space-y-2">

      {guardianDecision.reasons?.map(
        (
          reason: string,
          index: number
        ) => (

          <p
            key={index}
            className="text-sm text-zinc-300"
          >

            • {reason}

          </p>

        )
      )}

    </div>

  </div>

)}
  <div className="grid md:grid-cols-2 gap-5 mb-5">

    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">
      <p className="text-zinc-500 text-sm mb-2">
        Risk Score
      </p>

      <p
        className={`text-5xl font-bold ${
          transactionRisk?.score >= 70
            ? "text-red-400"
            : transactionRisk?.score >= 40
            ? "text-orange-400"
            : transactionRisk?.score >= 20
            ? "text-yellow-400"
            : "text-green-400"
        }`}
      >
        {transactionRisk?.score || 0}/100
      </p>
    </div>

    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">
      <p className="text-zinc-500 text-sm mb-2">
        Simulation Result
      </p>

      <div className="space-y-4">

        <div>
          <p className="text-zinc-500 text-sm mb-2">
            Simulation Type
          </p>

          <p className="text-white font-semibold">
            {simulationResult?.type}
          </p>
        </div>

        <div>
          <p className="text-zinc-500 text-sm mb-2">
            Description
          </p>

          <p className="text-sm text-zinc-300 leading-relaxed">
            {simulationResult?.message}
          </p>
        </div>

        <div>
          <p className="text-zinc-500 text-sm mb-2">
            Severity
          </p>

          <p
            className={`font-semibold ${
              simulationResult?.severity === "Critical"
                ? "text-red-400"
                : simulationResult?.severity === "High"
                ? "text-orange-400"
                : simulationResult?.severity === "Medium"
                ? "text-yellow-400"
                : "text-green-400"
            }`}
          >
            {simulationResult?.severity}
          </p>
        </div>

      </div>
    </div>
  </div>
{protocolReputation && (

  <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 mb-5">

    <p className="text-zinc-500 text-sm mb-2">

      Protocol Reputation

    </p>

    <p className="text-xl font-bold text-white">

      {protocolReputation.name}

    </p>

    <p
      className={`mt-2 font-medium ${
        protocolReputation.risk ===
        "Critical"
          ? "text-red-400"
          : protocolReputation.risk ===
            "Medium"
          ? "text-yellow-400"
          : "text-green-400"
      }`}
    >

      {protocolReputation.reputation}

    </p>

    <p className="text-sm text-zinc-400 mt-2">

      Risk Level:
      {" "}
      {protocolReputation.risk}

    </p>

  </div>

)}
  {spenderThreat?.detected && (
    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 mb-5">

      <div className="flex items-center justify-between mb-3">

        <h3 className="text-lg font-semibold text-red-400">
          Malicious Spender Detected
        </h3>

        <div className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400">
          {spenderThreat.severity}
        </div>

      </div>

      <p className="text-white font-medium mb-2">
        {spenderThreat.label}
      </p>

      <p className="text-sm text-zinc-400">
        {spenderThreat.description}
      </p>

    </div>
  )}

  <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">

    <p className="text-zinc-500 text-sm mb-4">
      Threat Warnings
    </p>

    <div className="space-y-3">

      {transactionRisk?.warnings?.length > 0 ? (

        transactionRisk.warnings.map(
          (warning: string, index: number) => (

            <div
              key={index}
              className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-3"
            >
              <div className="h-2.5 w-2.5 rounded-full bg-red-400 mt-1.5" />

              <p className="text-sm text-red-300">
                {warning}
              </p>
            </div>
          )
        )

      ) : (

        <p className="text-sm text-zinc-500">
          No threats detected.
        </p>

      )}

    </div>

  </div>

  {simulationResult?.impact?.length > 0 && (

    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 mt-5">

      <p className="text-zinc-500 text-sm mb-4">
        Potential Impact
      </p>

      <div className="space-y-3">

        {simulationResult.impact.map(
          (item: string, index: number) => (

            <div
              key={index}
              className="flex items-start gap-3 bg-orange-500/10 border border-orange-500/20 rounded-xl p-3"
            >
              <div className="h-2.5 w-2.5 rounded-full bg-orange-400 mt-1.5" />

              <p className="text-sm text-orange-200">
                {item}
              </p>
            </div>
          )
        )}

      </div>

    </div>

  )}

  {simulationResult?.recommendation && (

    <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 mt-5">

      <p className="text-green-400 font-semibold mb-2">
        Security Recommendation
      </p>

      <p className="text-sm text-green-200">
        {simulationResult.recommendation}
      </p>

    </div>

  )}

  <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 mt-5">

    <p className="text-zinc-500 text-sm mb-4">
      Potential Asset Exposure
    </p>

    <p className="text-3xl font-bold text-white mb-4">
      $
      {assetExposure?.totalValue?.toFixed?.(2) || "0.00"}
    </p>

  </div>

</div>


);
}
