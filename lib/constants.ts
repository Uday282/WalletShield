export const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",

  "function decimals() view returns (uint8)",

  "function allowance(address owner, address spender) view returns (uint256)",

  "function approve(address spender, uint256 amount) returns (bool)",
];

export const KNOWN_SPENDERS = [
  {
    name: "Uniswap",

    address:
      "0xE592427A0AEce92De3Edee1F18E0157C05861564",
  },

  {
    name: "OpenSea",

    address:
      "0x00000000006c3852cbEf3e08E8dF289169EdE581",
  },

  {
    name: "Aave",

    address:
      "0x7BeA39867e4169DBe237d55C8242a8f2fcDcc387",
  },
];

export const DANGEROUS_CONTRACTS = [
  "0x000000000000000000000000000000000000dead",

  "0x1111111111111111111111111111111111111111",

  "0x2222222222222222222222222222222222222222",
];