import {
  DecodedTransaction,
} from "@/types/wallet";

type Props = {
  txDataInput: string;

  setTxDataInput: (
    value: string
  ) => void;

  decodedTx:
    | DecodedTransaction
    | null;

  onAnalyze: () => void;
};

export default function TransactionDecoder({
  txDataInput,
  setTxDataInput,
  decodedTx,
  onAnalyze,
}: Props) {

  return (

    <div className="bg-zinc-900 rounded-2xl p-6 mb-8">

      <h2 className="text-2xl font-bold mb-4">
        Transaction Decoder
      </h2>

      <textarea
        value={txDataInput}
        onChange={(e) =>
          setTxDataInput(
            e.target.value
          )
        }
        placeholder="Paste transaction calldata..."
        className="w-full bg-zinc-800 p-4 rounded-xl mb-4 h-32"
      />
<div className="flex flex-wrap gap-3 mt-4">

  <button
    onClick={() =>
      setTxDataInput(
        "0x095ea7b300000000000000000000000033333333333333333333333333333333333333330000000000000000000000000000000000000000000000000000000000000064"
      )
    }
    className="px-4 py-2 rounded-xl bg-yellow-500/20 border border-yellow-500/30"
  >
    Unlimited Approval
  </button>

  <button
    onClick={() =>
      setTxDataInput(
        "0xa22cb4650000000000000000000000003333333333333333333333333333333333333333"
      )
    }
    className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/30"
  >
    NFT Approval
  </button>

  <button
    onClick={() =>
      setTxDataInput(
        "0x095ea7b3000000000000000000000000dead00000000000000000000000000000000dead0000000000000000000000000000000000000000000000000000000000000064"
      )
    }
    className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/30"
  >
    Malicious Protocol
  </button>

</div>
      <button
        onClick={onAnalyze}
        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl"
      >
        Analyze Transaction
      </button>

      {decodedTx && (

        <div className="mt-4 bg-zinc-800 p-4 rounded-xl">

          <p className="text-xl font-bold">
            {decodedTx.type}
          </p>

          <p className="mt-2">
            Risk:
            {" "}
            {decodedTx.risk}
          </p>

          <p className="text-gray-300 mt-2">
            {decodedTx.message}
          </p>

        </div>

      )}

    </div>
  );
}