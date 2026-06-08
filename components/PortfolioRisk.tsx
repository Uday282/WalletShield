type Props = {
  analysis: any;
};

export default function PortfolioRisk({
  analysis,
}: Props) {

  return (

    <div className="bg-zinc-900 rounded-2xl p-6 mb-8">

      <h2 className="text-2xl font-bold mb-6">
        Portfolio Risk Analytics
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <div className="bg-zinc-800 p-4 rounded-xl">

          <p className="text-gray-400">
            Total Assets
          </p>

          <p className="text-2xl font-bold">
            {analysis.totalAssets}
          </p>

        </div>

        <div className="bg-zinc-800 p-4 rounded-xl">

          <p className="text-gray-400">
            Stablecoins
          </p>

          <p className="text-2xl font-bold text-green-400">
            {analysis.stablecoins}
          </p>

        </div>

        <div className="bg-zinc-800 p-4 rounded-xl">

          <p className="text-gray-400">
            Risky Assets
          </p>

          <p className="text-2xl font-bold text-red-400">
            {analysis.riskyAssets}
          </p>

        </div>

        <div className="bg-zinc-800 p-4 rounded-xl">

          <p className="text-gray-400">
            Diversification Score
          </p>

          <p className="text-2xl font-bold text-blue-400">
            {analysis.diversificationScore}/100
          </p>

        </div>

      </div>

      <div className="mt-6 bg-zinc-800 p-4 rounded-xl">

        <p className="text-lg">
          Portfolio Risk Level:
          {" "}

          <span
            className={`font-bold ${
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
          </span>

        </p>

      </div>

    </div>
  );
}