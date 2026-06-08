type Props = {
  securityScore: number;
  securityGrade: string;
  securityColor: string;
  selectedChain: string;
  balance: string;
  walletStatus: string;
  walletStatusColor: string;
};

export default function DashboardCards({
  securityScore,
  securityGrade,
  securityColor,
  selectedChain,
  balance,
  walletStatus,
  walletStatusColor,
}: Props) {

  return (

    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">

      <div className="bg-zinc-900 p-4 rounded-xl">

        <p className="text-gray-400 text-sm">
          Security Score
        </p>

        <p className="text-2xl font-bold">
          {securityScore}/100
        </p>

      </div>

      <div className="bg-zinc-900 p-4 rounded-xl">

        <p className="text-gray-400 text-sm">
          Security Grade
        </p>

        <p
          className={`text-2xl font-bold ${securityColor}`}
        >
          {securityGrade}
        </p>

      </div>

      <div className="bg-zinc-900 p-4 rounded-xl">

        <p className="text-gray-400 text-sm">
          Network
        </p>

        <p className="text-2xl font-bold">
          {selectedChain}
        </p>

      </div>

      <div className="bg-zinc-900 p-4 rounded-xl">

        <p className="text-gray-400 text-sm">
          ETH Balance
        </p>

        <p className="text-2xl font-bold">
          {Number(balance || 0).toFixed(4)}
        </p>

      </div>

      <div className="bg-zinc-900 p-4 rounded-xl">

        <p className="text-gray-400 text-sm">
          Wallet Status
        </p>

        <p
          className={`text-2xl font-bold ${walletStatusColor}`}
        >
          {walletStatus}
        </p>

      </div>

    </div>

  );
}