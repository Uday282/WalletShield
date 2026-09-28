export const threatContracts = [

  {
    address:
      "0xdead00000000000000000000000000000000dead",

    severity:
      "Critical",

    reason:
      "Known Wallet Drainer"
  }

];

export function getThreatContract(
  address: string
) {

  return threatContracts.find(
    (t) =>
      t.address.toLowerCase() ===
      address.toLowerCase()
  );
}