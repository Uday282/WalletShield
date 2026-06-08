import {
  SCAM_CONTRACTS,
} from "./scamDatabase";

export function analyzeContract(
  address: string
) {

  const normalized =
    address.toLowerCase();

  const knownScam =
    SCAM_CONTRACTS.find(
      (contract) =>

        contract.address.toLowerCase() ===
        normalized
    );

  if (knownScam) {

    return {

      safe: false,

      risk: "Critical",

      score: 95,

      title:
        "Known Malicious Contract",

      message:
        `${knownScam.name} is flagged as dangerous.`,

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
        "Suspicious Contract Pattern",

      message:
        "Contract contains suspicious address patterns.",

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

      score: 10,

      title:
        "Contract Appears Safe",

      message:
        "No major threat indicators detected.",

      color:
        "text-green-400",
    };
  }

  return {

    safe: false,

    risk: "Unknown",

    score: 50,

    title:
      "Invalid Contract Address",

    message:
      "Address format is invalid or suspicious.",

    color:
      "text-yellow-400",
  };
}