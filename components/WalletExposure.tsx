type Props = {
  tokensLength: number;
  approvalsLength: number;
  criticalApprovals: number;
  highRiskApprovals: number;
};

export default function WalletExposure({
  tokensLength,
  approvalsLength,
  criticalApprovals,
  highRiskApprovals,
}: Props) {

  return (

    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 mb-8">

      <div className="flex items-center justify-between mb-6">

        <div>

          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-2">

            Exposure Monitoring

          </p>

          <h2 className="text-2xl font-bold">

            Wallet Exposure

          </h2>

        </div>

        <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />

      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">

          <p className="text-zinc-500 text-sm mb-2">

            Tokens

          </p>

          <p className="text-3xl font-bold text-white">

            {tokensLength}

          </p>

        </div>

        <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">

          <p className="text-zinc-500 text-sm mb-2">

            Approvals

          </p>

          <p className="text-3xl font-bold text-white">

            {approvalsLength}

          </p>

        </div>

        <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">

          <p className="text-zinc-500 text-sm mb-2">

            Critical

          </p>

          <p className="text-3xl font-bold text-red-400">

            {criticalApprovals}

          </p>

        </div>

        <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">

          <p className="text-zinc-500 text-sm mb-2">

            High Risk

          </p>

          <p className="text-3xl font-bold text-yellow-400">

            {highRiskApprovals}

          </p>

        </div>

      </div>

    </div>
  );
}