type Props = {
  tokenRiskResult: any;
};

export default function TokenSecurityCard({
  tokenRiskResult,
}: Props) {

  if (!tokenRiskResult) {

    return null;
  }

  return (

    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">

      <div className="flex items-center justify-between mb-5">

        <div>

          <p className="text-zinc-500 text-sm">

            Token Security

          </p>

          <p className="text-xs text-zinc-600 mt-1">

            GoPlus Token Risk Analysis

          </p>

        </div>

        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold
          ${
            tokenRiskResult.level === "SAFE"
              ? "bg-green-500/20 text-green-400"
              : tokenRiskResult.level === "SUSPICIOUS"
              ? "bg-yellow-500/20 text-yellow-400"
              : tokenRiskResult.level === "HIGH_RISK"
              ? "bg-orange-500/20 text-orange-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {tokenRiskResult.level}
        </div>

      </div>

      <div className="mb-5">

        <p className="text-zinc-500 text-sm mb-2">

          Token Risk Score

        </p>

        <p className="text-4xl font-bold">

          {tokenRiskResult.score}/100

        </p>

        <div className="w-full h-2 bg-zinc-800 rounded-full mt-3">

          <div
            className={`h-2 rounded-full ${
              tokenRiskResult.score >= 80
                ? "bg-red-500"
                : tokenRiskResult.score >= 50
                ? "bg-orange-500"
                : tokenRiskResult.score >= 20
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
            style={{
              width: `${tokenRiskResult.score}%`,
            }}
          />

        </div>

      </div>

      <div>

        <p className="text-zinc-500 text-sm mb-3">

          Findings

        </p>

        {tokenRiskResult.findings.length === 0 ? (

          <div className="bg-zinc-800 rounded-xl p-3 text-green-400 text-sm">

            ✓ No known token risks detected

          </div>

        ) : (

          <div className="space-y-2">

            {tokenRiskResult.findings.map(
              (
                finding: string,
                index: number
              ) => (

                <div
                  key={index}
                  className="
                    bg-zinc-800
                    rounded-xl
                    p-3
                    text-sm
                  "
                >
                  ⚠ {finding}
                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}