import { DecodedTransaction } from "./transactionDecoder";

export interface AnalysisResult {

  decoded: DecodedTransaction;

  findings: string[];

  score: number;

}

export async function analyzeTransaction(

  decoded: DecodedTransaction

): Promise<AnalysisResult> {

  const findings: string[] = [];

  let score = 0;

  return {

    decoded,

    findings,

    score

  };

}