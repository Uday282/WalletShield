export interface WalletReport {
  address: string;
  netWorth: number;
  securityScore: number;
  riskLevel: string;
  classification: string;
}

export function generateShareText(report: WalletReport) {
  return `🛡️ WalletShield Analysis

💰 Net Worth: $${report.netWorth.toLocaleString()}
🔒 Security Score: ${report.securityScore}/100
⚠️ Risk Level: ${report.riskLevel}
🏷️ Classification: ${report.classification}

Analyze any wallet with WalletShield`;
}

export function getTwitterShareUrl(report: WalletReport) {
  const text = generateShareText(report);

  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}`;
}