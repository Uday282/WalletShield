type Props = {
  history: any[];
};

export default function
TransactionHistory({
  history,
}: Props) {
const blocked =
  history.filter(
    (h) => h.decision === "BLOCK"
  ).length;

const reviewed =
  history.filter(
    (h) => h.decision === "REVIEW"
  ).length;

const allowed =
  history.filter(
    (h) => h.decision === "ALLOW"
  ).length;
  return (

    <div className="bg-zinc-900 rounded-2xl p-6 mt-8">

      <h2 className="text-2xl font-bold mb-4">
        Transaction History
      </h2>
<div className="grid grid-cols-3 gap-4 mb-5">

  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">

    <p className="text-red-400 text-sm">
      Blocked
    </p>

    <p className="text-3xl font-bold">
      {blocked}
    </p>

  </div>

  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">

    <p className="text-yellow-400 text-sm">
      Reviewed
    </p>

    <p className="text-3xl font-bold">
      {reviewed}
    </p>

  </div>

  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">

    <p className="text-green-400 text-sm">
      Allowed
    </p>

    <p className="text-3xl font-bold">
      {allowed}
    </p>

  </div>

</div>
      <div className="space-y-3">
{history.length === 0 && (

  <div className="bg-zinc-800 rounded-xl p-4 text-zinc-400">

    No transactions analyzed yet.

  </div>

)}
        {history.map(
          (item, index) => (

            <div
              key={index}
              className="bg-zinc-800 p-4 rounded-xl"
            >

              <div className="flex justify-between">

                <p className="font-semibold text-white">
  {item.type}
</p>

                <p>

                  {item.time}

                </p>

              </div>

              <div className="flex gap-4 mt-2">

                <span>
                  Score:
                  {" "}
                  {item.score}
                </span>

                <span
  className={`font-bold ${
    item.decision === "BLOCK"
      ? "text-red-400"
      : item.decision === "REVIEW"
      ? "text-yellow-400"
      : "text-green-400"
  }`}
>
  {item.decision}
</span>

              </div>

            </div>

          )
        )}

      </div>

    </div>

  );
}