import { ThreatLevel } from "./types";

export function getThreatLevel(
  score: number
): ThreatLevel {

  if (score >= 80) {
    return "MALICIOUS";
  }

  if (score >= 60) {
    return "HIGH_RISK";
  }

  if (score >= 30) {
    return "SUSPICIOUS";
  }

  return "SAFE";
}