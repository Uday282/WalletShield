type Props = {
  question: string;

  setQuestion: (
    value: string
  ) => void;

  response: any;

  onAsk: () => void;
};

export default function SecurityCopilot({
  question,
  setQuestion,
  response,
  onAsk,
}: Props) {

  return (

    <div className="bg-zinc-900 rounded-2xl p-6 mb-8">

      <h2 className="text-2xl font-bold mb-4">
        AI Security Copilot
      </h2>

      <input
        type="text"
        value={question}
        onChange={(e) =>
          setQuestion(
            e.target.value
          )
        }
        placeholder="Ask a wallet security question..."
        className="w-full bg-zinc-800 p-4 rounded-xl mb-4"
      />

      <button
        onClick={onAsk}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl"
      >
        Ask Copilot
      </button>

      {response && (

        <div className="mt-4 bg-zinc-800 p-4 rounded-xl">

          <p className="text-xl font-bold text-blue-400">
            AI Security Analysis
          </p>

          <p className="mt-2">
            Risk Level:
            {" "}
            {response.risk}
          </p>

          <p className="text-gray-300 mt-2">
            {response.answer}
          </p>

        </div>

      )}

    </div>
  );
}