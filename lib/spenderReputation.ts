
export const maliciousSpenders = [

  {
    address:
      "0xdead00000000000000000000000000000000dead",

    label:
      "Known Wallet Drainer",

    severity:
      "Critical",

    description:
      "Reported in phishing approval scams.",
  },

  {
    address:
      "0x1111111254eeb25477b68fb85ed929f73a960582",

    label:
      "Suspicious Swap Router",

    severity:
      "High",

    description:
      "Associated with risky approval patterns.",
  },

  {
    address:
      "0x00000000006c3852cbef3e08e8df289169ede581",

    label:
      "NFT Marketplace Approval",

    severity:
      "Medium",

    description:
      "Marketplace approval detected.",
  },

];

export function checkSpenderReputation(
  spender: string
) {

  const found =
    maliciousSpenders.find(
      (s) =>
        s.address.toLowerCase() ===
        spender.toLowerCase()
    );

  if (found) {

    return {

      detected: true,

      ...found,
    };
  }

  return {

    detected: false,
  };
}

