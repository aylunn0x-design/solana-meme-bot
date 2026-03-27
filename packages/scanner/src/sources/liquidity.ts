import type { SignalScanResult } from "../../../shared/src/types.js";
import { scannerConfig } from "../config.js";
import { fetchBirdeyeTrending } from "../providers/birdeye.js";
import { fetchJson } from "../fetchJson.js";

export async function scanLiquiditySource(): Promise<SignalScanResult> {
  if (scannerConfig.birdeyeApiKey) {
    const signals = await fetchBirdeyeTrending(scannerConfig.birdeyeApiKey);
    return { source: "volume", scannedAt: new Date().toISOString(), signals };
  }

  if (!scannerConfig.liquidityFeedUrl) {
    return { source: "volume", scannedAt: new Date().toISOString(), signals: [] };
  }

  const data = await fetchJson<SignalScanResult>(scannerConfig.liquidityFeedUrl);
  return {
    source: "volume",
    scannedAt: new Date().toISOString(),
    signals: data.signals ?? [],
  };
}
