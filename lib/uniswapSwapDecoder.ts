import { ethers } from "ethers";

import {
  decodeUniswapV3Path
} from "./uniswapPathDecoder";

export interface DecodedSwap {

  recipient?: string;

  amountIn?: bigint;

  amountOutMinimum?: bigint;

  // Current fields (keep for compatibility)
  tokenIn?: string;

  tokenOut?: string;

  // New fields
  tokenInAddress?: string;

  tokenOutAddress?: string;

  fee?: number;

}

export function decodeV3SwapExactIn(
  input: string
): DecodedSwap | null {

  try {

    const coder =
      ethers.AbiCoder.defaultAbiCoder();

    const decoded =
      coder.decode(
        [
          "address",
          "uint256",
          "uint256",
          "bytes",
          "bool"
        ],
        input
      );

    const path =
      decodeUniswapV3Path(
        decoded[3]
      );

    console.log(
      "===== V3 SWAP DECODE ====="
    );

    console.log(
      "Recipient:",
      decoded[0]
    );

    console.log(
      "Amount In:",
      decoded[1].toString()
    );

    console.log(
      "Minimum Out:",
      decoded[2].toString()
    );

    console.log(
      "Path Bytes:",
      decoded[3]
    );

    console.log(
      "Decoded Path:",
      path
    );

    console.log(
      "TOKEN IN:",
      path?.tokenInSymbol
    );

    console.log(
      "TOKEN OUT:",
      path?.tokenOutSymbol
    );

    console.log(
      "POOL FEE:",
      path?.fee
    );

    return {

      recipient:
        decoded[0],

      amountIn:
        decoded[1],

      amountOutMinimum:
        decoded[2],

      // Existing behaviour
      tokenIn:
        path?.tokenInSymbol,

      tokenOut:
        path?.tokenOutSymbol,

      // New fields
      tokenInAddress:
        path?.tokenIn,

      tokenOutAddress:
        path?.tokenOut,

      fee:
        path?.fee

    };

  }

  catch (e) {

    console.log(
      "V3 Swap decode failed",
      e
    );

    return null;

  }

}