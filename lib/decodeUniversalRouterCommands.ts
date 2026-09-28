import {
  decodeV2SwapExactIn
} from "./uniswapV2Decoder";

import { ethers } from "ethers";

import { COMMANDS } from "./universalRouterCommandRegistry";

import {
  decodeV3SwapExactIn
} from "./uniswapSwapDecoder";

import {
  decodeV4Swap
} from "./uniswapV4Decoder";

export interface DecodedSwap {

  tokenIn?: string;

  tokenOut?: string;

  tokenInAddress?: string;

  tokenOutAddress?: string;

  amountIn?: bigint;

  amountOutMinimum?: bigint;

  recipient?: string;

  fee?: number;

  protocol?: string;

}

export interface UniversalRouterCommand {

  id: number;

  name: string;

}

export interface UniversalRouterDecodeResult {

  commands: UniversalRouterCommand[];

  swap?: DecodedSwap;

}

export function decodeUniversalRouterCommands(
  calldata: string
): UniversalRouterDecodeResult {

  const commands: UniversalRouterCommand[] = [];

  let swap:
    DecodedSwap | undefined;

  if (
    !calldata.startsWith(
      "0x3593564c"
    )
  ) {

    return {

      commands,

      swap

    };

  }

  try {

    const iface =
      new ethers.Interface([

        "function execute(bytes commands, bytes[] inputs, uint256 deadline)"

      ]);

    const decoded =
      iface.parseTransaction({

        data: calldata

      });

    if (!decoded) {

      return {

        commands,

        swap

      };

    }

    const commandBytes =
      decoded.args[0] as string;

    const inputs =
      decoded.args[1] as string[];

    console.log(
      "RAW COMMAND BYTES:",
      commandBytes
    );

    console.log(
      "DECODED ARGS:",
      decoded.args
    );

    const bytes =
      ethers.getBytes(
        commandBytes
      );

    for (const b of bytes) {

      console.log(
        "COMMAND BYTE:",
        b,
        COMMANDS[b]
      );

      commands.push({

        id: b,

        name:
          COMMANDS[b] ??
          `UNKNOWN_${b}`

      });

    }

    console.log(
      "TOTAL INPUTS:",
      inputs.length
    );

    for (
      let i = 0;
      i < inputs.length;
      i++
    ) {

      console.log(
        `INPUT ${i}:`,
        inputs[i]
      );

      const command =
        commands[i]?.name;

      // --------------------
      // V3
      // --------------------

      if (
        command ===
        "V3_SWAP_EXACT_IN"
      ) {

        const decodedSwap =
          decodeV3SwapExactIn(
            inputs[i]
          );

        console.log(
          "DECODED V3 SWAP:",
          decodedSwap
        );

        if (
          decodedSwap
        ) {

          swap = {

            tokenIn:
              decodedSwap.tokenIn,

            tokenOut:
              decodedSwap.tokenOut,

            tokenInAddress:
              decodedSwap.tokenInAddress,

            tokenOutAddress:
              decodedSwap.tokenOutAddress,

            amountIn:
              decodedSwap.amountIn,

            amountOutMinimum:
              decodedSwap.amountOutMinimum,

            recipient:
              decodedSwap.recipient,

            fee:
              decodedSwap.fee,

            protocol:
              "Uniswap V3"

          };

        }

      }

      // --------------------
      // V2
      // --------------------

      else if (
        command ===
        "V2_SWAP_EXACT_IN"
      ) {

        const decodedV2 =
          decodeV2SwapExactIn(
            inputs[i]
          );

        console.log(
          "DECODED V2 SWAP:",
          decodedV2
        );

        if (
          decodedV2
        ) {

          swap = {

            tokenIn:
              decodedV2.tokenIn,

            tokenOut:
              decodedV2.tokenOut,

            tokenInAddress:
              decodedV2.tokenInAddress,

            tokenOutAddress:
              decodedV2.tokenOutAddress,

            amountIn:
              decodedV2.amountIn,

            amountOutMinimum:
              decodedV2.amountOutMinimum,

            recipient:
              decodedV2.recipient,

            protocol:
              "Uniswap V2"

          };

        }

      }

      // --------------------
      // V4
      // --------------------

      else if (
        command ===
        "V4_SWAP"
      ) {

        const v4 =
          decodeV4Swap(
            inputs[i]
          );

        console.log(
          "DECODED V4:",
          v4
        );

        if (
          v4
        ) {

          swap = {

            tokenIn:
              v4.tokenIn ??
              swap?.tokenIn,

            tokenOut:
              v4.tokenOut ??
              swap?.tokenOut,

            tokenInAddress:
              v4.tokenInAddress ??
              swap?.tokenInAddress,

            tokenOutAddress:
              v4.tokenOutAddress ??
              swap?.tokenOutAddress,

            amountIn:
              v4.amountIn ??
              swap?.amountIn,

            amountOutMinimum:
              v4.amountOutMinimum ??
              swap?.amountOutMinimum,

            recipient:
              v4.recipient ??
              swap?.recipient,

            fee:
              swap?.fee,

            protocol:
              "Uniswap V4"

          };

        }

      }

    }

  }

  catch (e) {

    console.log(
      "Universal Router decode failed",
      e
    );

  }

  return {

    commands,

    swap

  };

}