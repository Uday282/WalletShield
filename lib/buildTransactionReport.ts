import { TransactionSimulation } from "./simulateTransaction";

export interface TransactionSummary {

  action: string;

  token?: string;

  protocol?: string;

  spender?: string;

  risk: string;

}

export interface TransactionReport {

  decision:
    | "ALLOW"
    | "REVIEW"
    | "BLOCK";

  score: number;

  summary: TransactionSummary;

  findings: string[];

  explanation: string;

  recommendation: string;

  simulation?: TransactionSimulation;

}