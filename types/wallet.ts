export type Token = {
  contractAddress: string;
  symbol: string;
  name?: string | null;
  decimals?: number | null;
  balance: string;
  price: number;
  usdValue: number;
};
export interface Activity {
  type: string;
  description: string;
  risk: string;
  color: string;
}

export interface Approval {
  token: string;
  tokenAddress: string;
  spender: string;
  spenderAddress: string;
  amount: string;
  risk: string;
  riskColor: string;
}

export interface DecodedTransaction {
  type: string;
  risk: string;
  message: string;
}