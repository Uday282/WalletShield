export function checkProtocolReputation(
  address: string
) {

  const protocols: Record<
    string,
    any
  > = {

    // UNISWAP

    "0x7a250d5630b4cf539739df2c5dacb4c659f2488d":
      {
        name: "Uniswap V2 Router",
        reputation: "Trusted",
        risk: "Low",
      },

    // AAVE

    "0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2":
      {
        name: "Aave V3 Pool",
        reputation: "Trusted",
        risk: "Low",
      },

    // OPENSEA

    "0x00000000006c3852cbef3e08e8df289169ede581":
      {
        name: "OpenSea",
        reputation: "Trusted",
        risk: "Low",
      },

    // TEST MALICIOUS

    "0x3333333333333333333333333333333333333333":
      {
        name: "Known Malicious Contract",
        reputation: "Malicious",
        risk: "Critical",
      },
  };

  const found =
    protocols[
      address.toLowerCase()
    ];

  if (found)
    return found;

  return {

    name:
      "Unknown Protocol",

    reputation:
      "Unknown",

    risk:
      "Medium",
  };
}