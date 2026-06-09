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

<div
  className={`rounded-3xl p-6 h-full border ${
    liveProtectionStatus ===
    "Protected"
      ? "bg-green-950/40 border-green-900"
      : liveProtectionStatus ===
        "High Risk"
      ? "bg-orange-950/40 border-orange-900"
      : "bg-red-950/40 border-red-900"
  }`}
>
    <div className="flex items-center justify-between h-full">

      <div>

        <div className="flex items-center gap-3 mb-3">

<div
  className={`h-3 w-3 rounded-full animate-pulse ${
    liveProtectionStatus ===
    "Protected"
      ? "bg-green-400"
      : liveProtectionStatus ===
        "High Risk"
      ? "bg-orange-400"
      : "bg-red-400"
  }`}
/>
         <p
  className={`text-sm uppercase tracking-[0.2em] ${
    liveProtectionStatus ===
"Protected"
  ? "text-green-400"
  : liveProtectionStatus ===
    "High Risk"
  ? "text-orange-400"
  : "text-red-400"
  }`}
>

  {liveProtectionStatus ===
"Protected"
  ? "Protection Active"
  : "Risk Detected"}

</p>

        </div>

        <h2 className="text-2xl font-bold mb-2">

          Live Wallet Monitoring

        </h2>

        <p
  className={`text-sm ${
    liveProtectionStatus ===
    "Protected"
      ? "text-green-200/70"
      : liveProtectionStatus ===
        "High Risk"
      ? "text-orange-200/70"
      : "text-red-200/70"
  }`}
>
  Real-time wallet security scanning enabled.
</p>

      </div>

      <div className="text-right">

        <p
  className={`text-4xl font-bold ${
    liveProtectionStatus ===
"Protected"
  ? "text-green-400"
  : liveProtectionStatus ===
    "High Risk"
  ? "text-orange-400"
  : "text-red-400"
  }`}
>

  {liveProtectionStatus}

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