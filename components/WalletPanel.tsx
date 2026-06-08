type Token = {
  contractAddress: string;
  symbol: string;
  name?: string;
  decimals?: number;

  balance: string;

  price?: number;
  usdValue?: number;
};
type Props = {
  address?: string;
  tokens: Token[];
};

export default function WalletPanel({
  address,
  tokens,
}: Props) {

  return (

    <div className="bg-zinc-900 rounded-2xl p-6 mb-8">

      <h2 className="text-2xl font-bold mb-4">
        Connected Wallet
      </h2>

      <p className="text-green-400 break-all mb-4">
        {address}
      </p>

      <div className="grid md:grid-cols-3 gap-4">

        {tokens.map(
          (
            token,
            index
          ) => (

            <div
              key={index}
              className="bg-zinc-800 p-4 rounded-xl"
            >

              <p className="text-gray-400 text-sm">
                {token.symbol}
              </p>

              <p className="text-xl font-bold">
                {token.balance}
              </p>

            </div>

          )
        )}

      </div>

    </div>

  );
}