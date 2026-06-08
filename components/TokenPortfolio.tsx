
type Token = {
  symbol: string;
  balance: string;
  price?: number;
  usdValue?: number;
  name?: string | null;
};
function formatBalance(
  value: number
) {

  if (value >= 1e12)
    return (
      value / 1e12
    ).toFixed(1) + "T";

  if (value >= 1e9)
    return (
      value / 1e9
    ).toFixed(1) + "B";

  if (value >= 1e6)
    return (
      value / 1e6
    ).toFixed(1) + "M";

  if (value >= 1e3)
    return (
      value / 1e3
    ).toFixed(1) + "K";

  return value.toFixed(2);
}
type Props = {
  tokens: Token[];
};

export default function TokenPortfolio({
  tokens,
}: Props) {

  return (

    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">

      <div className="px-5 py-4 border-b border-zinc-800">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-1">

              Portfolio Monitoring

            </p>

            <h2 className="text-lg font-semibold text-white">

              ERC20 Holdings

            </h2>

          </div>

          <div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />

        </div>

      </div>

      <div className="divide-y divide-zinc-900">

        {tokens.length === 0 && (

          <div className="p-5">

            <p className="text-sm text-zinc-400">

              No ERC20 assets detected.

            </p>

          </div>

        )}

        {
        tokens.map(
          (
            token,
            index
          ) => (

            <div
              key={index}
              className="flex items-center justify-between px-5 py-4 hover:bg-zinc-900/40 transition-colors"
            >

              <div>

                <p className="text-sm font-medium text-white">

                  {token.symbol}

                </p>

                <p className="text-xs text-zinc-500 mt-1">

  {token.name || "ERC20 Token"}

</p>

              </div>

              <div className="text-right">

  <p className="text-sm font-semibold text-green-400">

{formatBalance(
  Number(
    token.balance
  )
)}

  </p>

  <p className="text-xs text-zinc-400">

    $
    {(token.price || 0)
      .toFixed(4)}

  </p>

  <p className="text-sm font-bold text-white">

    $
    {(
      token.usdValue || 0
    ).toLocaleString()}

  </p>

</div>

            </div>

          )
        )}

      </div>

    </div>
  );
}