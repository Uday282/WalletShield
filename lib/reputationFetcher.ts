export async function fetchWalletLabel(
  address: string
) {

  try {

    const response =
      await fetch(
        `/api/reputation?address=${address}`
      );

    const data =
      await response.json();

    return data.label;

  } catch (err) {

    console.log(err);

    return null;
  }
}