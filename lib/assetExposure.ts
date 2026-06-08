
export function calculateAssetExposure(
  tokens: any[]
) {

  if (!tokens?.length) {

    return {

      totalValue: 0,

      assets: [],
    };
  }

  const assets = tokens.map(
    (token) => {

      const balance =
        Number(
          token.balance || 0
        );

      const estimatedPrice =
        1;

      const usdValue =
        balance *
        estimatedPrice;

      return {

        symbol:
          token.symbol,

        balance,

        usdValue,
      };
    }
  );

  const totalValue =
    assets.reduce(
      (
        sum,
        asset
      ) =>
        sum +
        asset.usdValue,
      0
    );

  return {

    totalValue,

    assets,
  };
}

