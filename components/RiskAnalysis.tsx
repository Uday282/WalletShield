import Card
from "@/components/ui/Card";

type Props = {
  riskFactors: string[];
};

export default function RiskAnalysis({
  riskFactors,
}: Props) {

  return (

    <Card className="mb-8">

      <h2 className="text-2xl font-bold mb-4">
        Wallet Risk Analysis
      </h2>

      <div className="space-y-3">

        {riskFactors.length === 0 && (

          <div className="bg-zinc-800 p-4 rounded-xl text-green-400">

            No major wallet risks detected.

          </div>

        )}

        {riskFactors.map(
          (
            risk,
            index
          ) => (

            <div
              key={index}
              className="bg-zinc-800 p-4 rounded-xl text-red-400"
            >
              {risk}
            </div>

          )
        )}

      </div>

    </Card>
  );
}