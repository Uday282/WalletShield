export function decodeTransactionData(
  input: string
) {
  const data =
    input.toLowerCase();

  // ERC20 Transfer

  if (
    data.startsWith(
      "0xa9059cbb"
    )
  ) {
    return {
      type:
        "ERC20 Transfer",

      risk: "Low",

      message:
        "This transaction transfers ERC20 tokens.",
    };
  }

  // Token Approval

  if (
    data.startsWith(
      "0x095ea7b3"
    )
  ) {
    const spender =
      "0x" +
      data.slice(34, 74);

    const amountHex =
      data.slice(74, 138);

    const unlimited =
      amountHex ===
      "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

    return {
      type:
        "Token Approval",

      risk:
        unlimited
          ? "Critical"
          : "High",

      spender,

      amountHex,

      unlimited,

      message:
        unlimited
          ? "Unlimited token approval detected."
          : "This transaction grants token spending approval.",
    };
  }

  // NFT Approval

  if (
    data.startsWith(
      "0xa22cb465"
    )
  ) {
    return {
      type:
        "NFT Approval For All",

      risk: "Critical",

      message:
        "This transaction grants full NFT access.",
    };
  }

  // Unknown

  return {
    type:
      "Unknown Smart Contract Interaction",

    risk: "High",

    message:
      "Unknown interactions may contain malicious behavior.",
  };
}