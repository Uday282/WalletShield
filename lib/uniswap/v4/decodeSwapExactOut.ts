import { ethers } from "ethers";
import { getTokenSymbol } from "./tokenRegistry";
import { decodeExactOutputParams } from "./abiDecoder";

export interface DecodedV4Swap {

  actions?: string[];

  tokenIn?: string;

  tokenOut?: string;

  tokenInAddress?: string;

  tokenOutAddress?: string;

  recipient?: string;

  amountIn?: bigint;

  amountOutMinimum?: bigint;

}



export function decodeSwapExactOut(
  data: string
): DecodedV4Swap {

  const decoded =
    decodeExactOutputParams(
      data
    );

  const tokenOutAddress =
    ethers.getAddress(
      decoded.currencyOut
    );

  const firstHop =
    decoded.path[0];

  const tokenInAddress =
    ethers.getAddress(
      firstHop.intermediateCurrency
    );

  return {

    tokenIn:
  getTokenSymbol(
    tokenInAddress
  ),

   tokenOut:
  getTokenSymbol(
    tokenOutAddress
  ),
    tokenInAddress,

    tokenOutAddress,

    amountIn:
      decoded.amountInMaximum,

    amountOutMinimum:
      decoded.amountOut,

  };

}