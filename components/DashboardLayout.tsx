type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({
  children,
}: Props) {

  return (

    <div className="min-h-screen bg-black text-white">

      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-md">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div>

            <h1 className="text-2xl font-bold">
              WalletShield AI
            </h1>

            <p className="text-sm text-zinc-400">
              Web3 Security Intelligence Platform
            </p>

          </div>

          <div className="flex items-center gap-3">

            <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />

            <p className="text-sm text-green-400">
              Live Monitoring
            </p>

          </div>

        </div>

      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        <div className="space-y-10">

          {children}

        </div>

      </main>

    </div>
  );
}