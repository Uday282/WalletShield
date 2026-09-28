import { ethers } from "ethers";
import { getTokenSymbol } from "./tokenRegistry";

import { decodeExactInputParams } from "./abiDecoder";

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



export function decodeSwapExactIn(
  data: string
): DecodedV4Swap {

  const decoded =
    decodeExactInputParams(
      data
    );

  const tokenInAddress =
    ethers.getAddress(
      decoded.currencyIn
    );

  const lastHop =
    decoded.path[
      decoded.path.length - 1
    ];

  const tokenOutAddress =
    ethers.getAddress(
      lastHop.intermediateCurrency
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
      decoded.amountIn,

    amountOutMinimum:
      decoded.amountOutMinimum,

  };

}