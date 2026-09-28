import { ethers } from "ethers";
import { DecodedTransaction } from "./transactionDecoder";
import { getTokenMetadata } from "./tokenIntelligence";

export async function enrichTransaction(
  tx: DecodedTransaction
): Promise<DecodedTransaction> {

  const enriched = {
    ...tx
  };
  // Native ETH handling
if (
  enriched.tokenInAddress === ethers.ZeroAddress
) {

  enriched.tokenIn = "ETH";
  enriched.tokenInSymbol = "ETH";
  enriched.tokenInDecimals = 18;

}

if (
  enriched.tokenOutAddress === ethers.ZeroAddress
) {

  enriched.tokenOut = "ETH";
  enriched.tokenOutSymbol = "ETH";
  enriched.tokenOutDecimals = 18;

}

 // Token In
if (
  tx.tokenInAddress &&
  tx.tokenInAddress !== ethers.ZeroAddress
) {

  const metadata =
    await getTokenMetadata(
      tx.tokenInAddress
    );

  if (metadata) {

    enriched.tokenIn =
      metadata.symbol;

    enriched.tokenInSymbol =
      metadata.symbol;

    enriched.tokenInDecimals =
      metadata.decimals;

    enriched.tokenInLogo =
      metadata.logo;

  }

}

 // Token Out
if (
  tx.tokenOutAddress &&
  tx.tokenOutAddress !== ethers.ZeroAddress
) {

  const metadata =
    await getTokenMetadata(
      tx.tokenOutAddress
    );

  if (metadata) {

    enriched.tokenOut =
      metadata.symbol;

    enriched.tokenOutSymbol =
      metadata.symbol;

    enriched.tokenOutDecimals =
      metadata.decimals;

    enriched.tokenOutLogo =
      metadata.logo;

  }

}
console.log("ENRICHED TX:", enriched);
  return enriched;

}