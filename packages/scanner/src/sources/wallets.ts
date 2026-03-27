import type { SignalScanResult } from "../../../shared/src/types.js";
import { scannerConfig } from "../config.js";
import { fetchJson } from "../fetchJson.js";

export async function scanWalletSource(): Promise<SignalScanResult> {
  if (!scannerConfig.walletFeedUrl) {
    return {
      source: "wallet",
      scannedAt: new Date().toISOString(),
      signals: [],
    };
  }

  const data = await fetchJson<SignalScanResult>(scannerConfig.walletFeedUrl);
  return {
    source: "wallet",
    scannedAt: new Date().toISOString(),
    signals: data.signals ?? [],
  };
}
