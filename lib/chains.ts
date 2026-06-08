export const CHAIN_ID_MAP: Record<number, string> = {
  1: "ethereum",
  137: "polygon",
  56: "bsc",
  42161: "arbitrum",
  10: "optimism",
  8453: "base",
  43114: "avalanche",
};

export const CHAINS = {
  ethereum: {
    name: "Ethereum",
    nativeSymbol: "ETH",

    usdt:
      "0xdAC17F958D2ee523a2206206994597C13D831ec7",

    usdc:
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",

    dai:
      "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  },

  polygon: {
    name: "Polygon",
    nativeSymbol: "MATIC",

    usdt:
      "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",

    usdc:
      "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",

    dai:
      "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
  },

  bsc: {
    name: "BNB Chain",
    nativeSymbol: "BNB",

    usdt:
      "0x55d398326f99059fF775485246999027B3197955",

    usdc:
      "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",

    dai:
      "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
  },

  arbitrum: {
    name: "Arbitrum",
    nativeSymbol: "ETH",

    usdt:
      "0xFd086bC7CD5C481DCC9C85ebe478A1C0b69FCbb9",

    usdc:
      "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",

    dai:
      "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
  },

  optimism: {
    name: "Optimism",
    nativeSymbol: "ETH",

    usdt:
      "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",

    usdc:
      "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",

    dai:
      "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
  },

  base: {
    name: "Base",
    nativeSymbol: "ETH",

    usdt:
      "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2",

    usdc:
      "0xd9aAEc86B65D86f6A7B5A1b0c42FFA531710b6CA",

    dai:
      "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
  },

  avalanche: {
    name: "Avalanche",
    nativeSymbol: "AVAX",

    usdt:
      "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",

    usdc:
      "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",

    dai:
      "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
  },
};