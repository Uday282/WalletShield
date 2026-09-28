import { ethers } from "ethers";

import { decodeExactOutputSingleParams } from "./abiDecoder";

import { getTokenSymbol } from "./tokenRegistry";

export interface DecodedV4Swap {

  tokenIn?: string;

  tokenOut?: string;

  tokenInAddress?: string;

  tokenOutAddress?: string;

  amountIn?: bigint;

  amountOutMinimum?: bigint;

}

export function decodeSwapExactOutSingle(
  data: string
): DecodedV4Swap {

  const decoded =
    decodeExactOutputSingleParams(
      data
    );

  const tokenInAddress =
    decoded.zeroForOne

      ? decoded.poolKey.currency0

      : decoded.poolKey.currency1;

  const tokenOutAddress =
    decoded.zeroForOne

      ? decoded.poolKey.currency1

      : decoded.poolKey.currency0;

  return {

    tokenIn:
      getTokenSymbol(
        tokenInAddress
      ),

    tokenOut:
      getTokenSymbol(
        tokenOutAddress
      ),

    tokenInAddress:
      ethers.getAddress(
        tokenInAddress
      ),

    tokenOutAddress:
      ethers.getAddress(
        tokenOutAddress
      ),

    amountIn:
      decoded.amountInMaximum,

    amountOutMinimum:
      decoded.amountOut,

  };

}