export const KNOWN_WALLETS = {

  "0x000000000000000000000000000000000000dead": {

    label: "Burn Address",

    risk: "Info",

    description:
      "Assets sent here are permanently inaccessible.",

  },

  "0x28c6c06298d514db089934071355e5743bf21d60": {

    label: "Binance Hot Wallet",

    risk: "Low",

    description:
      "Known Binance exchange wallet.",

  },

  "0xd8da6bf26964af9d7eed9e03e53415d37aa96045": {

    label: "Vitalik Buterin",

    risk: "Low",

    description:
      "Public Ethereum founder wallet.",

  },

};

export function analyzeWalletReputation(
  wallet: string
) {

  const normalized =
    wallet.toLowerCase();

  return (
    KNOWN_WALLETS[
      normalized as keyof typeof KNOWN_WALLETS
    ] || null
  );
}