export interface TokenMetadata {

  symbol: string;

  decimals: number;

}

export const TOKEN_METADATA:
Record<string, TokenMetadata> = {

  ETH: {

    symbol: "ETH",

    decimals: 18

  },

  WETH: {

    symbol: "WETH",

    decimals: 18

  },

  USDT: {

    symbol: "USDT",

    decimals: 6

  },

  USDC: {

    symbol: "USDC",

    decimals: 6

  },

  DAI: {

    symbol: "DAI",

    decimals: 18

  },

  WBTC: {

    symbol: "WBTC",

    decimals: 8

  }

};