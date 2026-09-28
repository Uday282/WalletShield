export const maliciousSites = [

  {
    domain:
      "fake-uniswap.xyz",

    severity:
      "Critical",

    reason:
      "Known Phishing Site"
  },
{
  domain: "chatgptt.com",
  severity: "Critical",
  reason: "Test Phishing Site"
},
  {
    domain:
      "claim-airdrop-now.xyz",

    severity:
      "Critical",

    reason:
      "Wallet Drainer Site"
  }

];

export function getSiteThreat(
  domain: string
) {

  return maliciousSites.find(
    (site) =>
      site.domain.toLowerCase() ===
      domain.toLowerCase()
  );
}