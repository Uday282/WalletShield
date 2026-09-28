import {
  decodeUniversalRouterCommands
} from "./decodeUniversalRouterCommands";

export interface UniversalRouterResult {

  detected: boolean;

  action: string;

  protocol: string;

  risk: "Low" | "Medium" | "High";

  commands: string[];

  // Existing fields
  tokenIn?: string;

  tokenOut?: string;

  // New fields
  tokenInAddress?: string;

  tokenOutAddress?: string;

  amountIn?: bigint;

  amountOutMinimum?: bigint;

  recipient?: string;

  fee?: number;

}

export function decodeUniversalRouter(
  input: string
): UniversalRouterResult {

  const data =
    input.toLowerCase();

  if (
    data.startsWith(
      "0x3593564c"
    )
  ) {

    const result =
      decodeUniversalRouterCommands(
        data
      );

    console.log(
      "UNIVERSAL ROUTER RESULT:",
      result
    );

    return {

      detected: true,

      action:
        "Universal Router Transaction",

      protocol:
        "Uniswap Universal Router",

      risk:
        "Medium",

      commands:
        result.commands.map(
          c => c.name
        ),

      // Human readable
      tokenIn:
        result.swap?.tokenIn,

      tokenOut:
        result.swap?.tokenOut,

      // Raw addresses
      tokenInAddress:
        result.swap?.tokenInAddress,

      tokenOutAddress:
        result.swap?.tokenOutAddress,

      amountIn:
        result.swap?.amountIn,

      amountOutMinimum:
        result.swap?.amountOutMinimum,

      recipient:
        result.swap?.recipient,

      fee:
        result.swap?.fee

    };

  }

  return {

    detected: false,

    action: "Unknown",

    protocol: "Unknown",

    risk: "Low",

    commands: []

  };

}