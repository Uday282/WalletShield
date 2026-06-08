type Props = {
  analysis: any;
};

export default function BehaviorAnalytics({
  analysis,
}: Props) {

  return (

    <div className="bg-zinc-900 rounded-2xl p-6 mb-8">

      <h2 className="text-2xl font-bold mb-6">
        Wallet Behavior Analytics
      </h2>

      <div className="bg-zinc-800 p-4 rounded-xl mb-4">

        <p className="text-gray-400">
          Behavioral Risk Level
        </p>

        <p
          className={`text-2xl font-bold ${
            analysis.riskLevel ===
            "High"
              ? "text-red-400"
              : analysis.riskLevel ===
                "Medium"
              ? "text-yellow-400"
              : "text-green-400"
          }`}
        >
          {analysis.riskLevel}
        </p>

      </div>

      <div className="bg-zinc-800 p-4 rounded-xl mb-4">

        <p className="text-gray-400">
          Suspicious Activity Score
        </p>

        <p className="text-2xl font-bold text-purple-400">
          {analysis.suspiciousScore}/100
        </p>

      </div>

      <div className="space-y-3">

        {analysis.findings.length === 0 && (

          <div className="bg-zinc-800 p-4 rounded-xl text-green-400">

            No abnormal wallet behavior detected.

          </div>

        )}

        {analysis.findings.map(
          (
            finding: string,
            index: number
          ) => (

            <div
              key={index}
              className="bg-zinc-800 p-4 rounded-xl text-yellow-400"
            >
              {finding}
            </div>

          )
        )}

      </div>

    </div>
  );
}