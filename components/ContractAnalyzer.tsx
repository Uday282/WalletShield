type Props = {
  contractInput: string;

  setContractInput: (
    value: string
  ) => void;

  result: any;

  onAnalyze: () => void;
};

export default function ContractAnalyzer({
  contractInput,
  setContractInput,
  result,
  onAnalyze,
}: Props) {

  return (

    <div className="bg-zinc-900 rounded-2xl p-6 mb-8">

      <h2 className="text-2xl font-bold mb-4">
        Smart Contract Analyzer
      </h2>

      <input
        type="text"
        value={contractInput}
        onChange={(e) =>
          setContractInput(
            e.target.value
          )
        }
        placeholder="Paste smart contract address..."
        className="w-full bg-zinc-800 p-4 rounded-xl mb-4"
      />

      <button
        onClick={onAnalyze}
        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl"
      >
        Analyze Contract
      </button>

      {result && (

        <div className="mt-4 bg-zinc-800 p-4 rounded-xl">

          <p
            className={`text-xl font-bold ${result.color}`}
          >
            {result.title}
          </p>

          <p className="mt-2">
            Risk:
            {" "}
            {result.risk}
          </p>

          <p>
            Threat Score:
            {" "}
            {result.score}/100
          </p>

          <p className="text-gray-300 mt-2">
            {result.message}
          </p>

        </div>

      )}

    </div>
  );
}