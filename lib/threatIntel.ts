export async function checkWalletThreat(
  address: string
) {

 

  try {

    const url =
      `https://api.gopluslabs.io/api/v1/address_security/${address}?chain_id=1`;

   

    const response =
      await fetch(url, {
        headers: {
          accept: "*/*",
          "X-App-Key":
            process.env.GOPLUS_APP_KEY || "",
        },
      });


    const data =
  await response.json();



return data;

  } catch (error) {

    console.log(error);

    return null;
  }
}