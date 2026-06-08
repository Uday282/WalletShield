type Props = {
  status: string;

  uptime: string;

  connected: boolean;

  chain: string;
};

export default function WalletHealth({
  status,
  uptime,
  connected,
  chain,
}: Props) {

  return (

    <div className="bg-zinc-900 rounded-2xl p-6 mb-8">

      <h2 className="text-2xl font-bold mb-6">
        Real-Time Wallet Health
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <div className="bg-zinc-800 p-4 rounded-xl">

          <p className="text-gray-400">
            Protection Status
          </p>

          <p
            className={`text-2xl font-bold ${
              status ===
              "Healthy"
                ? "text-green-400"
                : status ===
                  "Warning"
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {status}
          </p>

        </div>

        <div className="bg-zinc-800 p-4 rounded-xl">

          <p className="text-gray-400">
            Monitoring Uptime
          </p>

          <p className="text-2xl font-bold text-blue-400">
            {uptime}
          </p>

        </div>

        <div className="bg-zinc-800 p-4 rounded-xl">

          <p className="text-gray-400">
            Wallet Connection
          </p>

          <p
            className={`text-2xl font-bold ${
              connected
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {connected
              ? "Connected"
              : "Disconnected"}
          </p>

        </div>

        <div className="bg-zinc-800 p-4 rounded-xl">

          <p className="text-gray-400">
            Active Chain
          </p>

          <p className="text-2xl font-bold text-purple-400">
            {chain}
          </p>

        </div>

      </div>

    </div>
  );
}