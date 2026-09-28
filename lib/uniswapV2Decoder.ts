import { ethers } from "ethers";

import {
  getTokenSymbol
} from "./tokenAddressRegistry";

export interface DecodedV2Swap {

  recipient: string;

  amountIn: bigint;

  amountOutMinimum: bigint;

  tokenPath: string[];

  tokenIn: string;

  tokenOut: string;

  tokenInAddress: string;

  tokenOutAddress: string;

}

export function decodeV2SwapExactIn(
  input: string
): DecodedV2Swap | null {

  try {

    const coder =
      ethers.AbiCoder.defaultAbiCoder();

    const decoded =
      coder.decode(
        [
          "address",
          "uint256",
          "uint256",
          "address[]",
          "bool"
        ],
        input
      );

    const path =
      decoded[3] as string[];

    const tokenInAddress =
      ethers.getAddress(
        path[0]
      );

    const tokenOutAddress =
      ethers.getAddress(
        path[path.length - 1]
      );

    return {

      recipient:
        decoded[0],

      amountIn:
        decoded[1],

      amountOutMinimum:
        decoded[2],

      tokenPath:
        path,

      tokenIn:
        getTokenSymbol(
          tokenInAddress
        ),

      tokenOut:
        getTokenSymbol(
          tokenOutAddress
        ),

      tokenInAddress,

      tokenOutAddress

    };

  }

  catch (e) {

    console.log(
      "V2 Swap decode failed",
      e
    );

    return null;

  }

}