import {
  TOKEN_METADATA
} from "./tokenMetadata";

export function formatTokenAmount(

  amount: bigint,

  symbol?: string

): string {

  if (
    !symbol
  ) {

    return amount.toString();

  }

  const token =
    TOKEN_METADATA[
      symbol
    ];

  if (
    !token
  ) {

    return amount.toString();

  }

  const divisor =
    10 ** token.decimals;

  const value =
    Number(amount) /
    divisor;

  return value.toLocaleString(
    undefined,
    {

      maximumFractionDigits: 6

    }
  );

}