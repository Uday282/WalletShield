type Threat = {
  title: string;

  severity: string;

  description: string;
};

type Props = {
  threats: Threat[];
};

export default function ThreatFeed({
  threats,
}: Props) {

  return (

  <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden mb-8">

    <div className="px-5 py-4 border-b border-zinc-800">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-2">

            Threat Monitoring

          </p>

          <h2 className="text-xl font-bold">

            Threat Intelligence

          </h2>

        </div>

        <div className="h-3 w-3 rounded-full bg-red-400 animate-pulse" />

      </div>

    </div>

    <div className="divide-y divide-zinc-900">

      {threats.map(
        (
          threat,
          index
        ) => (

          <div
            key={index}
            className="flex items-start gap-4 px-5 py-4 hover:bg-zinc-900/40 transition-colors"
          >

            <div
              className={`
                px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap
                ${
                  threat.severity ===
                  "Critical"
                    ? "bg-red-500/10 text-red-400"
                    : threat.severity ===
                      "High"
                    ? "bg-orange-500/10 text-orange-400"
                    : "bg-yellow-500/10 text-yellow-400"
                }
              `}
            >

              {threat.severity}

            </div>

            <div className="flex-1 min-w-0">

              <p className="font-semibold text-white text-base">

                {threat.title}

              </p>

              <p className="text-sm text-zinc-500 mt-1">

                {threat.description}

              </p>

            </div>

          </div>

        )
      )}

    </div>

  </div>
);
}