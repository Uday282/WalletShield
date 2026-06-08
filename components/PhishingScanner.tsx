type Props = {
  url: string;

  setUrl: (
    value: string
  ) => void;

  result: any;

  onScan: () => void;
};

export default function PhishingScanner({
  url,
  setUrl,
  result,
  onScan,
}: Props) {

  return (

    <div className="bg-zinc-900 rounded-2xl p-6 mb-8">

      <h2 className="text-2xl font-bold mb-4">
        Phishing URL Scanner
      </h2>

      <input
        type="text"
        value={url}
        onChange={(e) =>
          setUrl(
            e.target.value
          )
        }
        placeholder="Paste website URL..."
        className="w-full bg-zinc-800 p-4 rounded-xl mb-4"
      />

      <button
        onClick={onScan}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
      >
        Scan Website
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

          <p className="text-gray-300 mt-2">
            {result.message}
          </p>

        </div>

      )}

    </div>
  );
}