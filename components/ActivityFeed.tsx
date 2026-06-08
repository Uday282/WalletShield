type Activity = {
  type: string;
  description: string;
  risk: string;
  color: string;
  from?: string;
  to?: string;
  timestamp?: string;
};

type Props = {
  activities: Activity[];
};

export default function ActivityFeed({
  activities,
}: Props) {

  return (

    <div className="space-y-3">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-1">

            Wallet Intelligence

          </p>

          <h2 className="text-lg font-semibold text-white">

            Recent Activity

          </h2>

        </div>

        <div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />

      </div>

      <div className="space-y-3 pt-2">

        {activities.length === 0 && (

          <div className="border border-zinc-800 rounded-2xl p-4">

            <p className="text-sm font-medium text-zinc-300">

              No Activity Detected

            </p>

            <p className="text-xs text-zinc-500 mt-1">

              Wallet transactions will appear here once detected.

            </p>

          </div>

        )}

        {activities.map(
          (
            activity,
            index
          ) => (

            <div
              key={index}
              className="border-b border-zinc-800 pb-4"
            >

              <div className="flex items-start justify-between gap-4">

                <div className="flex-1 min-w-0">

                  <div className="flex items-center gap-2 mb-2">

                    <div
                      className={`
                        h-2 w-2 rounded-full
                        ${
                          activity.risk ===
                          "Critical"
                            ? "bg-red-500"
                            : activity.risk ===
                              "High"
                            ? "bg-orange-400"
                            : activity.risk ===
                              "Medium"
                            ? "bg-yellow-400"
                            : "bg-green-400"
                        }
                      `}
                    />

                    <p
                      className={`
                        text-xs font-semibold uppercase tracking-[0.15em]
                        ${
                          activity.risk ===
                          "Critical"
                            ? "text-red-400"
                            : activity.risk ===
                              "High"
                            ? "text-orange-400"
                            : activity.risk ===
                              "Medium"
                            ? "text-yellow-400"
                            : "text-green-400"
                        }
                      `}
                    >

                      {activity.risk}

                    </p>

                  </div>

                  <p className="text-sm font-medium text-white">

                    {activity.type}

                  </p>

                  <p className="text-xs text-zinc-400 mt-1">

                    {activity.description}

                  </p>

                  {activity.from && (

                    <p className="text-[11px] text-zinc-600 mt-2 truncate">

                      From: {activity.from}

                    </p>

                  )}

                  {activity.to && (

                    <p className="text-[11px] text-zinc-600 truncate">

                      To: {activity.to}

                    </p>

                  )}

                </div>

                {activity.timestamp && (

                  <p className="text-[10px] text-zinc-600 whitespace-nowrap">

                    {new Date(
                      activity.timestamp
                    ).toLocaleDateString()}

                  </p>

                )}

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}