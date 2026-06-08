type Props = {
  tokenInput: string;

  setTokenInput: (
    value: string
  ) => void;

  result: any;

  onAnalyze: () => void;
};

export default function TokenRiskAnalyzer({
  tokenInput,
  setTokenInput,
  result,
  onAnalyze,
}: Props) {

  return (

    <div className="bg-zinc-900 rounded-2xl p-6 mb-8">

      <h2 className="text-2xl font-bold mb-4">
        Token Risk Analyzer
      </h2>

      <input
        type="text"
        value={tokenInput}
        onChange={(e) =>
          setTokenInput(
            e.target.value
          )
        }
        placeholder="Paste token contract address..."
        className="w-full bg-zinc-800 p-4 rounded-xl mb-4"
      />

      <button
        onClick={onAnalyze}
        className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-xl"
      >
        Analyze Token
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