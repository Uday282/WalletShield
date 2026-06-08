export function analyzeToken(
  tokenAddress: string
) {

  const normalized =
    tokenAddress.toLowerCase();

  if (
    normalized ===
    "0x000000000000000000000000000000000000dead"
  ) {

    return {

      safe: false,

      risk: "Critical",

      score: 98,

      title:
        "Known Scam Token",

      message:
        "This token is associated with scam activity.",

      color:
        "text-red-600",
    };
  }

  if (
    normalized.includes(
      "dead"
    )
  ) {

    return {

      safe: false,

      risk: "High",

      score: 75,

      title:
        "Suspicious Token Contract",

      message:
        "Token contains suspicious address patterns.",

      color:
        "text-red-400",
    };
  }

  if (
    normalized.startsWith(
      "0x"
    ) &&
    normalized.length === 42
  ) {

    return {

      safe: true,

      risk: "Low",

      score: 12,

      title:
        "Token Appears Safe",

      message:
        "No major token risk indicators detected.",

      color:
        "text-green-400",
    };
  }

  return {

    safe: false,

    risk: "Unknown",

    score: 50,

    title:
      "Invalid Token Address",

    message:
      "Token address format is invalid.",

    color:
      "text-yellow-400",
  };
}