type Threat = {
  severity: string;
  title: string;
  description: string;
};

type Props = {
  threats: Threat[];
};

export default function ThreatRail({
  threats,
}: Props) {

  return (

    <div className="sticky top-4">

      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">

        <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/40">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-1">

                Live Monitoring

              </p>

              <h2 className="text-sm font-semibold text-white">

                Threat Intelligence

              </h2>

            </div>

            <div className="flex items-center gap-2">

              <div className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />

              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">

                Live

              </p>

            </div>

          </div>

        </div>

        <div className="max-h-[460px] overflow-y-auto">

          {threats.length === 0 && (

            <div className="p-4">

              <div className="border border-zinc-800 rounded-xl p-4">

                <p className="text-sm font-medium text-green-400">

                  No Active Threats

                </p>

                <p className="text-xs text-zinc-500 mt-1">

                  Threat monitoring systems are operating normally.

                </p>

              </div>

            </div>

          )}

          {threats.map(
            (
              threat,
              index
            ) => (

              <div
                key={index}
                className="px-4 py-3 border-b border-zinc-900 hover:bg-zinc-900/40 transition-all duration-200"
              >

                <div className="flex items-start gap-3">

                  <div
                    className={`
                      mt-1.5 h-2 w-2 rounded-full shrink-0
                      ${
                        threat.severity ===
                        "Critical"
                          ? "bg-red-500"
                          : threat.severity ===
                            "High"
                          ? "bg-orange-400"
                          : "bg-yellow-400"
                      }
                    `}
                  />

                  <div className="min-w-0 flex-1">

                    <div className="flex items-center justify-between gap-3 mb-1">

                      <p className="text-sm font-medium text-white leading-snug">

                        {threat.title}

                      </p>

                      <p
                        className={`
                          text-[10px] uppercase tracking-[0.15em] font-semibold whitespace-nowrap
                          ${
                            threat.severity ===
                            "Critical"
                              ? "text-red-400"
                              : threat.severity ===
                                "High"
                              ? "text-orange-400"
                              : "text-yellow-400"
                          }
                        `}
                      >

                        {threat.severity}

                      </p>

                    </div>

                    <p className="text-xs text-zinc-500 leading-relaxed">

                      {threat.description}

                    </p>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}