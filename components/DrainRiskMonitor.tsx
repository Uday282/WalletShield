type Props = {
  threatLevel: string;

  score: number;

  warnings: string[];
};

export default function DrainRiskMonitor({
  threatLevel,
  score,
  warnings,
}: Props) {

  return (

    <div className="bg-zinc-900 rounded-2xl p-6 mb-8">

      <h2 className="text-2xl font-bold mb-4">
        Wallet Drain Detection
      </h2>

      <div className="bg-zinc-800 p-4 rounded-xl mb-4">

        <p
          className={`text-xl font-bold ${
            threatLevel ===
            "Critical"
              ? "text-red-600"
              : threatLevel ===
                "High"
              ? "text-red-400"
              : threatLevel ===
                "Medium"
              ? "text-yellow-400"
              : "text-green-400"
          }`}
        >
          Threat Level:
          {" "}
          {threatLevel}
        </p>

        <p className="mt-2">
          Risk Score:
          {" "}
          {score}/100
        </p>

      </div>

      <div className="space-y-3">

        {warnings.length === 0 && (

          <div className="bg-zinc-800 p-4 rounded-xl text-green-400">

            No wallet drain patterns detected.

          </div>

        )}

        {warnings.map(
          (
            warning,
            index
          ) => (

            <div
              key={index}
              className="bg-zinc-800 p-4 rounded-xl text-red-400"
            >
              {warning}
            </div>

          )
        )}

      </div>

    </div>
  );
}