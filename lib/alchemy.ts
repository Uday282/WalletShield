import {
  Alchemy,
  Network,
  TokenBalanceType,
  AssetTransfersCategory,
} from "alchemy-sdk";
const config = {
  apiKey:
    process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,

  network: Network.ETH_MAINNET,
};

const alchemy =
  new Alchemy(config);
export async function fetchWalletHistory(
  address: string
) {

  try {

    const transfers =
      await alchemy.core.getAssetTransfers({

        fromBlock: "0x0",

        fromAddress: address,

        category: [
  AssetTransfersCategory.EXTERNAL,
  AssetTransfersCategory.ERC20,
  AssetTransfersCategory.ERC721,
  AssetTransfersCategory.ERC1155,
],

        withMetadata: true,

        excludeZeroValue: true,

        maxCount: 25,
      });

    const received =
      await alchemy.core.getAssetTransfers({

        fromBlock: "0x0",

        toAddress: address,

        category: [
  AssetTransfersCategory.EXTERNAL,
  AssetTransfersCategory.ERC20,
  AssetTransfersCategory.ERC721,
  AssetTransfersCategory.ERC1155,
],

        withMetadata: true,

        excludeZeroValue: true,

        maxCount: 25,
      });

    const combined = [

      ...transfers.transfers,

      ...received.transfers,

    ];

    const normalized =
      combined.map((tx: any) => {

        let risk = "Low";

        let color =
          "text-green-400";

        let type =
          "Transfer";

        if (
          tx.category ===
          "erc20"
        ) {

          type =
            "Token Transfer";
        }

        if (
          tx.category ===
          "erc721"
        ) {

          type =
            "NFT Transfer";

          risk =
            "Medium";

          color =
            "text-yellow-400";
        }

        if (
          tx.category ===
          "erc1155"
        ) {

          type =
            "Contract Interaction";

          risk =
            "High";

          color =
            "text-red-400";
        }

        if (
          tx.rawContract
            ?.address
        ) {

          if (
            tx.rawContract.address
              .toLowerCase()
              .includes("dead")
          ) {

            risk =
              "Critical";

            color =
              "text-red-600";
          }
        }

        return {

          hash: tx.hash,

          type,

          description:
            tx.asset
              ? `${tx.value || ""}
                 ${tx.asset}`
              : "Smart contract interaction",

          from:
            tx.from,

          to:
            tx.to,

          risk,

          color,

          timestamp:
            tx.metadata
              ?.blockTimestamp ||
            "",

        };
      });

    return normalized
      .sort(
        (a, b) =>
          new Date(
            b.timestamp
          ).getTime() -
          new Date(
            a.timestamp
          ).getTime()
      )
      .slice(0, 20);

  } catch (err) {

    console.log(err);

    return [];
  }
}
export async function fetchWalletTokens(
  address: string
) {

  try {

    let allTokens = [];

    let pageKey:
      string | undefined =
      undefined;

    do {

      const response: any =
  await alchemy.core.getTokenBalances(
    address,
    {
      type: TokenBalanceType.ERC20,
      pageKey,
    }
  );
      allTokens.push(
        ...response.tokenBalances
      );

      console.log(
        "LOADED TOKENS:",
        allTokens.length
      );

      pageKey =
        response.pageKey;

    } while (pageKey);

    console.log(
      "FINAL TOKEN COUNT:",
      allTokens.length
    );

    return allTokens;

  } catch (err) {

    console.log(err);

    return [];
  }
}


export async function fetchTokenMetadata(
  contractAddress: string
) {
  try {

    const metadata =
      await alchemy.core.getTokenMetadata(
        contractAddress
      );

    return metadata;

  } catch (err) {

    console.log(
      "METADATA ERROR:",
      contractAddress
    );

    console.log(err);

    return null;
  }
}
export async function fetchHistoricalTokens(
  address: string
) {

  try {

    const sent =
      await alchemy.core.getAssetTransfers({

        fromAddress: address,

        fromBlock: "0x0",

category: [
  AssetTransfersCategory.ERC20,
],
        withMetadata: true,

      });

    const received =
      await alchemy.core.getAssetTransfers({

        toAddress: address,

        fromBlock: "0x0",

category: [
  AssetTransfersCategory.ERC20,
],
        withMetadata: true,

      });

    return [

      ...sent.transfers,

      ...received.transfers,

    ];

  } catch (err) {

    console.log(err);

    return [];
  }
}
import { ethers } from "ethers";

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)"
];


export async function fetchTokenBalance(
  contractAddress: string,
  walletAddress: string
) {
  try {

    const provider =
      new ethers.JsonRpcProvider(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
      );

    const contract =
      new ethers.Contract(
        contractAddress,
        ERC20_ABI,
        provider
      );

    return await contract.balanceOf(
      walletAddress
    );

  } catch (err) {

    return BigInt(0);
  }
}
export async function testPortfolio(
  address: string
) {

  const result =
  await alchemy.portfolio
    .getTokensByWallet(
      [
        {
          address,
          networks: [
  Network.ETH_MAINNET
]
        }
      ],
      true,
      true,
      true
    );
  console.log(
    "PORTFOLIO:",
    result
  );

  return result;
}
export async function testPortfolioRaw(
  address: string,
  pageKey?: string
) {

  const response =
    await fetch(
      `https://api.g.alchemy.com/data/v1/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/assets/tokens/by-address`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          addresses: [
            {
              address,
              networks: [
                Network.ETH_MAINNET
              ],
            },
          ],

          includeNativeTokens:
            true,

          includeErc20Tokens:
            true,

          ...(pageKey && {
            pageKey,
          }),
        }),
      }
    );

  const data =
    await response.json();

  console.log(
    "RAW PORTFOLIO:",
    data
  );

  return data;
}
export async function fetchAllPortfolioTokens(
  address: string
) {

  let allTokens: any[] = [];

  let pageKey:
    string | undefined =
    undefined;

  while (true) {

    const page =
      await testPortfolioRaw(
        address,
        pageKey
      );

    allTokens.push(
      ...page.data.tokens
    );

    if (
      !page.data.pageKey
    ) {
      break;
    }

    pageKey =
      page.data.pageKey;
  }

  console.log(
    "TOTAL PORTFOLIO TOKENS:",
    allTokens.length
  );

  return allTokens;
}