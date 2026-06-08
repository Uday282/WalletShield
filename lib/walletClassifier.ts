
export function classifyWallet(
  activities: any[],
  balance: string,
  tokens: any[] = []
) {

  const ethBalance =
    Number(balance);

  const txCount =
    activities.length;

  const tokenCount =
    tokens.length;

  // EXCHANGE

  if (
    txCount > 100 &&
    tokenCount > 50
  ) {

    return {

      type:
        "Exchange Wallet",

      confidence: 92,

      reasoning:
        "Large number of assets and transactions detected.",
    };
  }

  // WHALE

  if (
    ethBalance >= 100
  ) {

    return {

      type:
        "Whale Wallet",

      confidence: 90,

      reasoning:
        "High ETH balance detected.",
    };
  }

  // DEFI USER

  if (
    tokenCount >= 20
  ) {

    return {

      type:
        "DeFi Power User",

      confidence: 85,

      reasoning:
        "Large and diversified token portfolio detected.",
    };
  }

  // ACTIVE TRADER

  if (
    txCount >= 20
  ) {

    return {

      type:
        "Active Trader",

      confidence: 80,

      reasoning:
        "Frequent wallet activity detected.",
    };
  }

  // DORMANT

  if (
    txCount <= 2 &&
    ethBalance < 1
  ) {

    return {

      type:
        "Dormant Wallet",

      confidence: 88,

      reasoning:
        "Very little activity observed.",
    };
  }

  // RETAIL

  return {

    type:
      "Retail Wallet",

    confidence: 70,

    reasoning:
      "Typical user activity patterns detected.",
  };
}

