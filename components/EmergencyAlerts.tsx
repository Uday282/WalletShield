type Props = {
  threatLevel: string;

  warnings: string[];
};

export default function EmergencyAlerts({
  threatLevel,
  warnings,
}: Props) {

  if (
    threatLevel !==
      "Critical" &&
    threatLevel !==
      "High"
  ) {

    return null;
  }

  return (

    <div className="bg-red-900 border border-red-700 rounded-2xl p-6 mb-8 animate-pulse">

      <h2 className="text-3xl font-bold text-red-200 mb-4">

        Emergency Security Alert

      </h2>

      <p className="text-red-100 mb-4">

        Suspicious wallet behavior detected.
        Immediate review recommended.

      </p>

      <div className="space-y-3">

        {warnings.map(
          (
            warning,
            index
          ) => (

            <div
              key={index}
              className="bg-red-800 p-4 rounded-xl text-red-100"
            >
              {warning}
            </div>

          )
        )}

      </div>

    </div>
  );
}