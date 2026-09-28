import { decodeUniversalRouter } from "./universalRouterDecoder";

export interface DecodedTransaction {

  action: string;

  risk:
    | "Low"
    | "Medium"
    | "High"
    | "Critical";

  protocol?: string;

  token?: string;

  // Existing fields (keep for compatibility)
  tokenIn?: string;

  tokenOut?: string;

  // New fields
  tokenInAddress?: string;

  tokenOutAddress?: string;

  tokenInSymbol?: string;

  tokenOutSymbol?: string;

  tokenInDecimals?: number;

  tokenOutDecimals?: number;

  tokenInLogo?: string;

  tokenOutLogo?: string;

  spender?: string;

  recipient?: string;

  amount?: string;

  amountIn?: bigint;

  amountOutMinimum?: bigint;
  // Expected output from simulation/quote
expectedAmountOut?: bigint;
  fee?: number;

  unlimited?: boolean;

  commands: string[];

}

export function decodeTransactionData(
  input: string,
  value?: string
): DecodedTransaction {

  const data =
    input.toLowerCase();
console.log(
  "TRANSACTION SELECTOR:",
  data.slice(0, 10)
);
  // ERC20 Transfer
  if (
    data.startsWith(
      "0xa9059cbb"
    )
  ) {

    return {

      action:
        "ERC20 Transfer",

      risk:
        "Low",

      commands: []

    };

  }

  // ERC20 Approval
  if (
    data.startsWith(
      "0x095ea7b3"
    )
  ) {

    const spender =
      "0x" +
      data.slice(
        34,
        74
      );

    const amountHex =
      data.slice(
        74,
        138
      );

    const unlimited =
      amountHex ===
      "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

    return {

      action:
        unlimited
          ? "Unlimited Approval"
          : "Approval",

      risk:
        unlimited
          ? "Critical"
          : "High",

      spender,

      unlimited,

      commands: []

    };

  }

  // NFT Approval
  if (
    data.startsWith(
      "0xa22cb465"
    )
  ) {

    return {

      action:
        "NFT Approval For All",

      risk:
        "Critical",

      commands: []

    };

  }
// WETH Deposit (ETH -> WETH)
if (data.startsWith("0xd0e30db0")) {

  return {

    action: "Wrap ETH",

    risk: "Low",

    protocol: "WETH",

    tokenIn: "ETH",

    tokenOut: "WETH",
    amountIn: value ? BigInt(value) : undefined,

    commands: []

  };

}
  // Universal Router
  const universal =
    decodeUniversalRouter(
      data
    );

  if (
    universal.detected
  ) {

    console.log(
      "DECODED TRANSACTION:",
      {

        action:
          universal.action,

        tokenIn:
          universal.tokenIn,

        tokenOut:
          universal.tokenOut,

        tokenInAddress:
          universal.tokenInAddress,

        tokenOutAddress:
          universal.tokenOutAddress,

        amountIn:
          universal.amountIn,

        amountOutMinimum:
          universal.amountOutMinimum,

        recipient:
          universal.recipient,

        fee:
          universal.fee

      }
    );

    return {

      action:
        universal.action,

      risk:
        universal.risk,

      protocol:
        universal.protocol,

      // Human readable
      tokenIn:
        universal.tokenIn,

      tokenOut:
        universal.tokenOut,

      // Raw addresses
      tokenInAddress:
        universal.tokenInAddress,

      tokenOutAddress:
        universal.tokenOutAddress,

      amountIn:
        universal.amountIn,

      amountOutMinimum:
        universal.amountOutMinimum,

      recipient:
        universal.recipient,

      fee:
        universal.fee,

      commands:
        universal.commands

    };

  }

// Unknown
console.log(
  "======================================"
);

console.log(
  "UNKNOWN SMART CONTRACT DETECTED"
);

console.log(
  "FUNCTION SELECTOR:",
  data.slice(0, 10)
);

console.log(
  "CALLDATA:",
  data
);

console.log(
  "CALLDATA LENGTH:",
  data.length
);

console.log(
  "======================================"
);

return {

  action:
    "Unknown Smart Contract Interaction",

  risk:
    "High",

  commands: []

};

}