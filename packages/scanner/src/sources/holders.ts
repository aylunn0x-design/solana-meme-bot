import type { SignalScanResult } from "../../../shared/src/types.js";

export async function scanHolderSource(): Promise<SignalScanResult> {
  return {
    source: "holders",
    scannedAt: new Date().toISOString(),
    signals: [],
  };
}
