import { getTokenMetadata } from "./tokenIntelligence";

const CACHE = new Map<string, string>();

export const TOKENS: Record<string, string> = {

  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2":
    "WETH",

  "0xdac17f958d2ee523a2206206994597c13d831ec7":
    "USDT",

  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48":
    "USDC",

  "0x6b175474e89094c44da98b954eedeac495271d0f":
    "DAI",

  "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599":
    "WBTC"

};

export function getTokenSymbol(
  address: string
): string {

  const normalized =
    address.toLowerCase();

  if (
    TOKENS[normalized]
  ) {

    return TOKENS[
      normalized
    ];

  }

  if (
    CACHE.has(
      normalized
    )
  ) {

    return CACHE.get(
      normalized
    )!;

  }

  return address;

}

export async function preloadTokenSymbol(
  address: string
) {

  const normalized =
    address.toLowerCase();

  if (
    TOKENS[normalized] ||
    CACHE.has(
      normalized
    )
  ) {

    return;

  }

  const metadata =
    await getTokenMetadata(
      address
    );

  if (
    metadata?.symbol
  ) {

    CACHE.set(
      normalized,
      metadata.symbol
    );

    console.log(
      "Cached token:",
      metadata.symbol
    );

  }

}