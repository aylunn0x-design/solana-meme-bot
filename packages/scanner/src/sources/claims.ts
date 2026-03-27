import type { SignalScanResult } from "../../../shared/src/types.js";

export async function scanClaimSource(): Promise<SignalScanResult> {
  return {
    source: "claims",
    scannedAt: new Date().toISOString(),
    signals: [],
  };
}
