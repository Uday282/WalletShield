export interface TokenInfo {

  address: string;

  symbol: string;

  name: string;

  decimals: number;

  logo?: string;

}

const ALCHEMY_URL =
  `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;

export async function getTokenMetadata(
  address: string
): Promise<TokenInfo | null> {

  try {

    const response =
      await fetch(
        ALCHEMY_URL,
        {
          method: "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body: JSON.stringify({

            jsonrpc: "2.0",

            id: 1,

            method:
              "alchemy_getTokenMetadata",

            params: [

              address

            ]

          })

        }
      );

    const json =
      await response.json();

    console.log(
      "ALCHEMY RESPONSE:",
      json
    );

    if (
      !json.result
    ) {

      return null;

    }

    return {

      address,

      symbol:
        json.result.symbol ??
        "UNKNOWN",

      name:
        json.result.name ??
        "Unknown Token",

      decimals:
        json.result.decimals ??
        18,

      logo:
        json.result.logo

    };

  }

  catch (e) {

    console.log(
      "Metadata lookup failed",
      e
    );

    return null;

  }

}