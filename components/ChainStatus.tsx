type Props = {
  selectedChain: string;
};

export default function ChainStatus({
  selectedChain,
}: Props) {

  return (

    <div className="bg-zinc-900 rounded-2xl p-4 mb-8 flex justify-between items-center">

      <div>

        <h2 className="text-xl font-bold">
          Active Blockchain
        </h2>

        <p className="text-gray-400 text-sm">
          Real-time chain monitoring enabled
        </p>

      </div>

      <div className="text-right">

        <p className="text-2xl font-bold text-purple-400">
          {selectedChain}
        </p>

      </div>

    </div>
  );
}