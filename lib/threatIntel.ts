export async function checkThreatIntel(
  address: string
) {
  try {
    const response = await fetch(
      `https://api.gopluslabs.io/api/v1/address/scan/1?address=${address}`,
      {
        headers: {
          Authorization:
            `Bearer ${process.env.NEXT_PUBLIC_GOPLUS_API_KEY}`,
        },
      }
    );

    const data = await response.json();

    console.log("GoPlus:", data);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}