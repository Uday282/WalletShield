export async function checkTokenSecurity(
  tokenAddress: string
) {

  try {

    const response =
      await fetch(
        `https://api.gopluslabs.io/api/v1/token_security/1?contract_addresses=${tokenAddress}`
      );

    const data =
      await response.json();

    return data;

  } catch (error) {

    console.log(error);

    return null;
  }
}