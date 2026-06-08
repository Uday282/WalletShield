type Token = {
  symbol: string;
  usdValue?: number;
};

type Props = {
  tokens: Token[];
  portfolioValue: number;
};
function formatUsd(
  value: number
) {

  if (
    value >= 1_000_000_000
  ) {
    return (
      value /
      1_000_000_000
    ).toFixed(1) + "B";
  }

  if (
    value >= 1_000_000
  ) {
    return (
      value /
      1_000_000
    ).toFixed(1) + "M";
  }

  if (
    value >= 1_000
  ) {
    return (
      value /
      1_000
    ).toFixed(1) + "K";
  }

  return value.toFixed(0);
}
export default function TopHoldings({
  tokens,
  portfolioValue,
}: Props) {

  const top5 =
    tokens.slice(0, 5);

  return (

    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">

      <div className="px-5 py-4 border-b border-zinc-800">

        <h2 className="text-lg font-semibold text-white">

          Top Holdings

        </h2>

      </div>

      <div className="divide-y divide-zinc-900">

        {top5.map(
          (
            token,
            index
          ) => {

            const percentage =
              portfolioValue > 0
                ? (
                    (token.usdValue || 0) /
                    portfolioValue
                  ) * 100
                : 0;

            return (

              <div
                key={index}
                className="flex items-center justify-between px-5 py-4"
              >

                <div>

                  <p className="text-white">

                    {token.symbol}

                  </p>

                  <p className="text-xs text-zinc-500">

                    {percentage.toFixed(1)}%

                  </p>

                </div>

                <p className="text-green-400 font-medium">

                 $
{formatUsd(
  token.usdValue || 0
)}

                </p>

              </div>

            );

          }
        )}

      </div>

    </div>
  );
}