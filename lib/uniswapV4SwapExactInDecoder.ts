import { ethers } from "ethers";

export interface DecodedV4SwapExactIn {

  tokenIn?: string;

  tokenOut?: string;

  tokenInAddress?: string;

  tokenOutAddress?: string;

  recipient?: string;

  amountIn?: bigint;

  amountOutMinimum?: bigint;

}

export function decodeV4SwapExactIn(
  data: string
): DecodedV4SwapExactIn | null {

  try {

    console.log(
      "========== V4 SWAP_EXACT_IN =========="
    );

    console.log(
      "RAW DATA:",
      data
    );

    const coder =
      ethers.AbiCoder.defaultAbiCoder();

    // We'll replace this with the official
    // Uniswap V4 ABI in the next step.

    console.log(
      "DATA LENGTH:",
      data.length
    );

    return {};

  }

  catch (e) {

    console.log(
      "V4 SWAP_EXACT_IN decode failed",
      e
    );

    return null;

  }

}