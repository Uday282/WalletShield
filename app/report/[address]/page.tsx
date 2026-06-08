interface PageProps {
  params: Promise<{
    address: string;
  }>;
}

export default async function ReportPage({
  params,
}: PageProps) {
  const { address } = await params;

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold mb-8">
          WalletShield Report
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-zinc-900 p-6 rounded-2xl">
            <p className="text-zinc-400 mb-2">
              Wallet Address
            </p>

            <p className="text-green-400 break-all">
              {address}
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl">
            <p className="text-zinc-400 mb-2">
              Security Score
            </p>

            <p className="text-4xl font-bold">
              --
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl">
            <p className="text-zinc-400 mb-2">
              Net Worth
            </p>

            <p className="text-4xl font-bold">
              --
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl">
            <p className="text-zinc-400 mb-2">
              Classification
            </p>

            <p className="text-xl font-bold">
              --
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}