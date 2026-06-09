export type ThreatLevel =
  | "SAFE"
  | "SUSPICIOUS"
  | "HIGH_RISK"
  | "MALICIOUS";

export interface ThreatAnalysisResult {
  score: number;

  level: ThreatLevel;

  findings: string[];

  classification?: string;

  reputation?: string;
}