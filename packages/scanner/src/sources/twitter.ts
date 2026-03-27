import type { SignalScanResult } from "../../../shared/src/types.js";

export async function scanTwitterSource(): Promise<SignalScanResult> {
  return {
    source: "twitter",
    scannedAt: new Date().toISOString(),
    signals: [],
  };
}
