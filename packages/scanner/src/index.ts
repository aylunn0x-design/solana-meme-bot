import type { TokenSignal } from "../../shared/src/types.js";

export async function scanSignals(): Promise<TokenSignal[]> {
  return [
    {
      mint: "demo-mint",
      symbol: "DEMO",
      source: "narrative",
      score: 72,
      reason: "placeholder scan result",
      timestamp: new Date().toISOString(),
    },
  ];
}
