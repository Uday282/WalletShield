import { getTokenMetadata } from "./tokenIntelligence";

export interface TokenIntelligence {

  address: string;

  symbol: string;

  name: string;

  decimals: number;

  logo?: string;

}

const cache = new Map<
  string,
  TokenIntelligence
>();

export async function getTokenIntelligence(
  address: string
): Promise<TokenIntelligence | null> {

  const normalized =
    address.toLowerCase();

  if (
    cache.has(
      normalized
    )
  ) {

    return cache.get(
      normalized
    )!;

  }

  const metadata =
    await getTokenMetadata(
      address
    );

  if (
    !metadata
  ) {

    return null;

  }

  cache.set(
    normalized,
    metadata
  );

  return metadata;

}