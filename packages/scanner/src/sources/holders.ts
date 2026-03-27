import type { SignalScanResult } from "../../../shared/src/types.js";
import { scannerConfig } from "../config.js";
import { fetchJson } from "../fetchJson.js";
import { fetchHeliusAssets } from "../providers/helius.js";

export async function scanHolderSource(): Promise<SignalScanResult> {
  if (scannerConfig.heliusApiKey) {
    const signals = await fetchHeliusAssets(scannerConfig.heliusApiKey);
    return {
      source: "holders",
      scannedAt: new Date().toISOString(),
      signals,
    };
  }

  if (!scannerConfig.holderFeedUrl) {
    return {
      source: "holders",
      scannedAt: new Date().toISOString(),
      signals: [],
    };
  }

  const data = await fetchJson<SignalScanResult>(scannerConfig.holderFeedUrl);
  return {
    source: "holders",
    scannedAt: new Date().toISOString(),
    signals: data.signals ?? [],
  };
}
