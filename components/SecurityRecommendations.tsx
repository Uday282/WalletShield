type Props = {
  recommendations?: string[];
};

export default function SecurityRecommendations({
  recommendations,
}: Props) {

  return (

    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 mb-8">

      <div className="flex items-center justify-between mb-6">

        <div>

          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-2">

            Security Guidance

          </p>

          <h2 className="text-2xl font-bold">

            Recommendations

          </h2>

        </div>

        <div className="h-3 w-3 rounded-full bg-blue-400 animate-pulse" />

      </div>

      <div className="space-y-3">

        {(recommendations || []).map(
          (
            recommendation,
            index
          ) => (

            <div
              key={index}
              className="flex items-start gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4"
            >

              <div className="mt-1 h-2.5 w-2.5 rounded-full bg-green-400" />

              <p className="text-zinc-300 leading-relaxed">

                {recommendation}

              </p>

            </div>

          )
        )}

        {(recommendations || []).length === 0 && (

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 text-zinc-500">

            No security recommendations available.

          </div>

        )}

      </div>

    </div>
  );
}