export function getProtocolName(
  address: string
) {

  const protocols: Record<
    string,
    string
  > = {

    "0x000000000022d473030f116ddee9f6b43ac78ba3":
      "Uniswap Permit2",

    "0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad":
      "Uniswap Universal Router",

    "0x1111111254eeb25477b68fb85ed929f73a960582":
      "1inch Router",

    "0x881d40237659c251811cec9c364ef91dc08d300c":
      "Metamask Swap Router"
  };

  return (
    protocols[
      address.toLowerCase()
    ] || null
  );
}