type Alert = {
  title: string;

  severity: string;

  message: string;
};

type Props = {
  alerts: Alert[];
};

export default function AlertCenter({
  alerts,
}: Props) {

  return (

  <div className="space-y-3">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-1">

          Live Monitoring

        </p>

        <h2 className="text-lg font-semibold text-white">

          Security Alerts

        </h2>

      </div>

      <div className="h-2.5 w-2.5 rounded-full bg-red-400 animate-pulse" />

    </div>

    <div className="space-y-3 pt-2">

      {alerts.length === 0 && (

        <div className="border border-zinc-800 rounded-2xl p-4">

          <p className="text-sm text-green-400 font-medium">

            System Secure

          </p>

          <p className="text-xs text-zinc-500 mt-1">

            No active wallet security threats detected.

          </p>

        </div>

      )}

      {alerts.map(
        (
          alert,
          index
        ) => (

          <div
            key={index}
            className="border-b border-zinc-800 pb-4"
          >

            <div className="flex items-center gap-2 mb-2">

              <div
                className={`
                  h-2 w-2 rounded-full
                  ${
                    alert.severity ===
                    "Critical"
                      ? "bg-red-500"
                      : alert.severity ===
                        "High"
                      ? "bg-orange-400"
                      : alert.severity ===
                        "Medium"
                      ? "bg-yellow-400"
                      : "bg-green-400"
                  }
                `}
              />

              <p
                className={`
                  text-sm font-semibold
                  ${
                    alert.severity ===
                    "Critical"
                      ? "text-red-400"
                      : alert.severity ===
                        "High"
                      ? "text-orange-400"
                      : alert.severity ===
                        "Medium"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }
                `}
              >

                {alert.severity}

              </p>

            </div>

            <p className="text-sm font-medium text-white">

              {alert.title}

            </p>

            <p className="text-xs text-zinc-500 mt-1 leading-relaxed">

              {alert.message}

            </p>

          </div>

        )
      )}

    </div>

  </div>
);
}