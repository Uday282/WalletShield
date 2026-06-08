export async function getTokenPrices(
  contractAddresses: string[]
) {

  const url =
    `https://api.coingecko.com/api/v3/simple/token_price/ethereum` +
    `?contract_addresses=${contractAddresses.join(",")}` +
    `&vs_currencies=usd`;

  const response =
    await fetch(url);

  return response.json();
}