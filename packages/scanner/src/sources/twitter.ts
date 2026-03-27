import type { SignalScanResult } from "../../../shared/src/types.js";
import { scannerConfig } from "../config.js";

export async function scanTwitterSource(): Promise<SignalScanResult> {
  if (!scannerConfig.twitterBearerToken) {
    return {
      source: "twitter",
      scannedAt: new Date().toISOString(),
      signals: [],
    };
  }

  return {
    source: "twitter",
    scannedAt: new Date().toISOString(),
    signals: [],
  };
}
