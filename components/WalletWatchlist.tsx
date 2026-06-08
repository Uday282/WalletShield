type Wallet = {
  address: string;

  label: string;

  risk: string;
};

type Props = {
  wallets: Wallet[];

  walletInput: string;

  setWalletInput: (
    value: string
  ) => void;

  addWallet: () => void;
};

export default function WalletWatchlist({
  wallets,
  walletInput,
  setWalletInput,
  addWallet,
}: Props) {

  return (

    <div className="bg-zinc-900 rounded-2xl p-6 mb-8">

      <h2 className="text-2xl font-bold mb-6">
        Multi-Wallet Watchlist
      </h2>

      <div className="flex gap-4 mb-6">

        <input
          type="text"
          value={walletInput}
          onChange={(e) =>
            setWalletInput(
              e.target.value
            )
          }
          placeholder="Add wallet address..."
          className="flex-1 bg-zinc-800 p-4 rounded-xl"
        />

        <button
          onClick={addWallet}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl"
        >
          Add Wallet
        </button>

      </div>

      <div className="space-y-4">

        {wallets.length === 0 && (

          <div className="bg-zinc-800 p-4 rounded-xl text-gray-400">

            No wallets being monitored.

          </div>

        )}

        {wallets.map(
          (
            wallet,
            index
          ) => (

            <div
              key={index}
              className="bg-zinc-800 p-4 rounded-xl flex justify-between items-center"
            >

              <div>

                <p className="font-bold">
                  {wallet.label}
                </p>

                <p className="text-gray-400 text-sm break-all">
                  {wallet.address}
                </p>

              </div>

              <p
                className={`font-bold ${
                  wallet.risk ===
                  "Critical"
                    ? "text-red-600"
                    : wallet.risk ===
                      "High"
                    ? "text-red-400"
                    : wallet.risk ===
                      "Medium"
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}
              >
                {wallet.risk}
              </p>

            </div>

          )
        )}

      </div>

    </div>
  );
}