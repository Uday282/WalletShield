
export function simulateTransaction(
  txData: string
) {

  const data =
    txData.toLowerCase();

  // ERC20 APPROVAL

  if (
    data.startsWith(
      "0x095ea7b3"
    )
  ) {

    return {

      type:
        "Approval Simulation",

      severity:
        "High",

      message:
        "This transaction grants token spending permissions to another wallet or smart contract.",

      impact: [

        "Unlimited token approvals may allow complete wallet draining.",

        "Malicious spenders can transfer tokens without additional signatures.",

        "Revoking approvals later may be necessary.",
      ],

      recommendation:
        "Only approve trusted protocols and verified applications.",
    };
  }

  // NFT APPROVAL

  if (
    data.startsWith(
      "0xa22cb465"
    )
  ) {

    return {

      type:
        "NFT Approval Simulation",

      severity:
        "Critical",

      message:
        "This transaction grants full NFT collection access using setApprovalForAll.",

      impact: [

        "Approved operators can transfer all NFTs in the collection.",

        "Malicious NFT approvals are commonly used in wallet drain attacks.",

        "NFT assets may be permanently stolen.",
      ],

      recommendation:
        "Never approve unknown NFT operators.",
    };
  }

  // ERC20 TRANSFER

  if (
    data.startsWith(
      "0xa9059cbb"
    )
  ) {

    return {

      type:
        "Token Transfer",

      severity:
        "Low",

      message:
        "This transaction transfers ERC20 assets.",

      impact: [

        "Assets will move from your wallet to another address.",
      ],

      recommendation:
        "Verify recipient address carefully.",
    };
  }

  // UNKNOWN INTERACTION

  return {

    type:
      "Unknown Contract Interaction",

    severity:
      "High",

    message:
      "Unknown smart contract interaction detected.",

    impact: [

      "Unknown contracts may contain malicious logic.",

      "Wallet-draining behavior cannot be ruled out.",

      "Contract may request dangerous permissions.",
    ],

    recommendation:
      "Only interact with verified contracts.",
  };
}

