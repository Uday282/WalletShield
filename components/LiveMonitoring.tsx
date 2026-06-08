type Props = {
  lastUpdated: string;

  liveProtectionStatus: string;

  isScanning: boolean;
};

export default function LiveMonitoring({
  lastUpdated,
  liveProtectionStatus,
  isScanning,
}: Props) {

  return (

  <div className="bg-green-950/40 border border-green-900 rounded-3xl p-6 h-full">

    <div className="flex items-center justify-between h-full">

      <div>

        <div className="flex items-center gap-3 mb-3">

          <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />

          <p className="text-green-400 text-sm uppercase tracking-[0.2em]">

            Protection Active

          </p>

        </div>

        <h2 className="text-2xl font-bold mb-2">

          Live Wallet Monitoring

        </h2>

        <p className="text-green-200/70 text-sm">

          Real-time wallet security scanning enabled.

        </p>

      </div>

      <div className="text-right">

        <p className="text-4xl font-bold text-green-400">

          Protected

        </p>

        <p className="text-sm text-green-300 mt-2">

          Last scan:
          {" "}
          {lastUpdated}

        </p>

      </div>

    </div>

  </div>
);
}