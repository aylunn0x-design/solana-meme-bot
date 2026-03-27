import type { SignalScanResult } from "../../../shared/src/types.js";

export async function scanWalletSource(): Promise<SignalScanResult> {
  return {
    source: "wallet",
    scannedAt: new Date().toISOString(),
    signals: [],
  };
}
