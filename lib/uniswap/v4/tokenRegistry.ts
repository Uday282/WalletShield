import { ethers } from "ethers";

export const TOKENS: Record<string, string> = {

  "0xdac17f958d2ee523a2206206994597c13d831ec7": "USDT",

  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "USDC",

  "0xc02aa39b223fe8d0a0e5c4f27ead9083c756cc2": "WETH",

};

export function getTokenSymbol(
  address: string
): string {

  if (
    address === ethers.ZeroAddress
  ) {

    return "ETH";

  }

  return (
    TOKENS[
      address.toLowerCase()
    ] ??
    address
  );

}