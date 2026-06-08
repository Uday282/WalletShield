import {
  Token,
} from "@/types/wallet";

export function analyzePortfolioRisk(
  tokens: Token[]
) {

  const totalAssets =
    tokens.length;

  let stablecoins = 0;

  let riskyAssets = 0;

  tokens.forEach(
    (token) => {

      const symbol =
        token.symbol.toLowerCase();

      if (
        symbol.includes("usdt") ||
        symbol.includes("usdc") ||
        symbol.includes("dai")
      ) {

        stablecoins += 1;
      }

      else {

        riskyAssets += 1;
      }
    }
  );

  let diversificationScore =
    100;

  if (totalAssets <= 1) {

    diversificationScore -= 50;
  }

  if (riskyAssets > stablecoins) {

    diversificationScore -= 20;
  }

  let riskLevel = "Low";

  if (
    diversificationScore < 70
  ) {

    riskLevel = "Medium";
  }

  if (
    diversificationScore < 40
  ) {

    riskLevel = "High";
  }

  return {

    totalAssets,

    stablecoins,

    riskyAssets,

    diversificationScore,

    riskLevel,
  };
}