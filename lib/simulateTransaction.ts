import { ethers } from "ethers";
import { formatTokenAmount } from "./formatTokenAmount";
import { DecodedTransaction } from "./transactionDecoder";

export interface TransactionSimulation {

  title: string;

  consequences: string[];

}

export function simulateTransaction(
  tx: DecodedTransaction
): TransactionSimulation {

  // Unlimited Approval
  if (
    tx.action ===
    "Unlimited Approval"
  ) {

    return {

      title:
        "If you sign this transaction...",

      consequences: [

        `You will give ${
          tx.protocol || "this application"
        } permission to spend ALL of your ${
          tx.token || "tokens"
        }.`,

        "No funds leave your wallet immediately.",

        "This approval remains active until you revoke it.",

        "A compromised application could later use this approval."

      ]

    };

  }

  // Approval
  if (
    tx.action ===
    "Approval"
  ) {

    return {

      title:
        "If you sign this transaction...",

      consequences: [

        `You are approving access to ${
          tx.token || "your tokens"
        }.`,

        "Review the approval amount before continuing."

      ]

    };

  }
  // WETH Deposit
if (tx.action === "Wrap ETH") {

  const amount =
    tx.amountIn
      ? ethers.formatEther(tx.amountIn)
      : undefined;

  return {

    title: "Wrap ETH",

   consequences: [

  amount
    ? `Wrap ${amount} ETH into WETH.`
    : "Wrap native ETH into WETH.",

  amount
    ? `Receive ${amount} WETH in your wallet.`
    : "You will receive WETH in your wallet.",

  "No approvals are granted by this transaction."

]

  };

}

  // Universal Router
  if (
    tx.action ===
    "Universal Router Transaction"
  ) {

    const consequences: string[] = [];
const unwrapsToEth = tx.commands.includes("UNWRAP_WETH");

const finalTokenOut =
  unwrapsToEth &&
  (
    tx.tokenOut === "WETH" ||
    tx.tokenOutSymbol === "WETH"
  )
    ? "ETH"
    : (tx.tokenOutSymbol ?? tx.tokenOut);
    // ETH Wrap
    if (
      tx.commands.includes(
        "WRAP_ETH"
      )
    ) {

      if (
        tx.amountIn
      ) {

        const amount =
  formatTokenAmount(
    tx.amountIn,
    "ETH"
  );

consequences.push(
  `Wrap ${amount} ETH into WETH.`
);
      }

      else {

        consequences.push(
          "Wrap ETH into WETH."
        );

      }

    }

    // V3 Swap
    if (
      tx.commands.includes(
        "V3_SWAP_EXACT_IN"
      )
    ) {

      if (
        tx.tokenIn &&
        tx.tokenOut
      ) {

        const amountIn =
  tx.amountIn &&
  tx.tokenInDecimals
    ? ethers.formatUnits(
        tx.amountIn,
        tx.tokenInDecimals
      )
    : undefined;

const amountOut =
  tx.amountOutMinimum &&
  tx.tokenOutDecimals
    ? ethers.formatUnits(
        tx.amountOutMinimum,
        tx.tokenOutDecimals
      )
    : undefined;

const outputText =
  amountOut
    ? `${amountOut} ${finalTokenOut}`
    : finalTokenOut;

consequences.push(
  `Swap ${amountIn ?? "?"} ${tx.tokenIn} → ${outputText} using Uniswap V3.`
);

      }

      else {

        consequences.push(
          "Swap tokens using Uniswap V3."
        );

      }

    }
if (unwrapsToEth) {
  consequences.push(
    "The router unwraps WETH into native ETH before sending it to your wallet."
  );
}
    // V2 Swap
    if (
      tx.commands.includes(
        "V2_SWAP_EXACT_IN"
      )
    ) {

      if (
        tx.tokenIn &&
        tx.tokenOut
      ) {

        consequences.push(
  `Swap ${tx.tokenIn} → ${finalTokenOut} using Uniswap V2.`
);
      }

      else {

        consequences.push(
          "Swap tokens using Uniswap V2."
        );

      }

    }

    // V4 Swap
    if (
      tx.commands.includes(
        "V4_SWAP"
      )
    ) {

      if (
        tx.tokenIn &&
        tx.tokenOut
      ) {

      consequences.push(
  `Swap ${tx.tokenIn} → ${finalTokenOut} using Uniswap V4.`
);
      }

      else {

        consequences.push(
          "Execute a Uniswap V4 swap."
        );

      }

    }

    // Permit2
    if (
      tx.commands.includes(
        "PERMIT2_PERMIT"
      )
    ) {

      consequences.push(
        "Grant a Permit2 approval."
      );

    }

    if (
      tx.commands.includes(
        "PERMIT2_TRANSFER_FROM"
      )
    ) {

      consequences.push(
        "Transfer approved tokens using Permit2."
      );

    }

    // Sweep
    if (
      tx.commands.includes(
        "SWEEP"
      )
    ) {

     consequences.push(
`Receive ${finalTokenOut ?? "tokens"} in your wallet.`);
    }

    // Amount Out
   if (
  tx.amountOutMinimum
) {

  const minimum =
    tx.tokenOutDecimals !== undefined
      ? ethers.formatUnits(
          tx.amountOutMinimum,
          tx.tokenOutDecimals
        )
      : formatTokenAmount(
          tx.amountOutMinimum,
          tx.tokenOut
        );

  consequences.push(
  `Minimum received: ${minimum} ${finalTokenOut || ""}`
);

}

    // Pool Fee
    if (
      tx.fee !== undefined
    ) {

      const feeMap:
        Record<number, string> = {

        100: "0.01%",

        500: "0.05%",

        3000: "0.30%",

        10000: "1.00%"

      };

      consequences.push(
        `Pool Fee: ${
          feeMap[
            tx.fee
          ] || tx.fee
        }`
      );

    }

    // Recipient
    if (
      tx.recipient
    ) {

    const recipient =
  tx.recipient?.toLowerCase() ===
  "0x0000000000000000000000000000000000000002"
    ? "Your Wallet"
    : tx.recipient;

consequences.push(
  `Recipient: ${recipient}`
);
    }

    // Protocol
    if (
      tx.protocol
    ) {

      consequences.push(
        `Protocol: ${tx.protocol}`
      );

    }

    if (
      consequences.length ===
      0
    ) {

      consequences.push(
        "WalletShield detected a Universal Router transaction."
      );

    }

    consequences.push(
      "Review every step carefully before signing."
    );

    return {

      title:
        "Transaction Plan",

      consequences

    };

  }

  // Wallet Drainer
  if (
    tx.action ===
    "Wallet Drainer"
  ) {

    return {

      title:
        "Critical Warning",

      consequences: [

        "WalletShield believes this transaction may steal your assets.",

        "Signing could immediately expose your funds.",

        "Do NOT continue unless you completely understand this transaction."

      ]

    };

  }

  // ERC20 Transfer
  if (
    tx.action ===
    "ERC20 Transfer"
  ) {

    return {

      title:
        "Token Transfer",

      consequences: [

        "This transaction transfers ERC20 tokens.",

        "Verify the recipient address and amount before signing."

      ]

    };

  }

  // NFT Approval
  if (
    tx.action ===
    "NFT Approval For All"
  ) {

    return {

      title:
        "NFT Approval",

      consequences: [

        "This transaction grants permission to manage all NFTs in this collection.",

        "Only approve trusted marketplaces."

      ]

    };

  }

  // Default
  return {

    title:
      "Transaction Preview",

    consequences: [

      "WalletShield could not fully classify this transaction.",

      "Review the destination, token amounts and permissions before signing."

    ]

  };

}