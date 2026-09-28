export const TOKENS: Record<
  string,
  string
> = {

  "0xdac17f958d2ee523a2206206994597c13d831ec7":
    "USDT",

  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48":
    "USDC",

  "0x514910771af9ca656af840dff83e8264ecf986ca":
    "LINK",

};

export function getTokenName(
  address: string
): string {

  return (
    TOKENS[
      address.toLowerCase()
    ] || "Unknown Token"
  );
}