import {
  SCAM_CONTRACTS,
} from "./scamDatabase";

export function detectScamApproval(
  spenderAddress: string
) {

  const found =
    SCAM_CONTRACTS.find(
      (contract) =>

        contract.address.toLowerCase() ===
        spenderAddress.toLowerCase()
    );

  if (found) {

    return {

      detected: true,

      risk:
        found.risk,

      message:
        `${found.name} detected`,
    };
  }

  return {

    detected: false,

    risk: "Low",

    message:
      "No scam detected",
  };
}