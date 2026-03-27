import type { SignalScanResult, TokenSignal } from "../../shared/src/types.js";
import { scanClaimSource } from "./sources/claims.js";
import { scanHolderSource } from "./sources/holders.js";
import { scanNarrativeSource } from "./sources/narratives.js";
import { scanTwitterSource } from "./sources/twitter.js";
import { scanWalletSource } from "./sources/wallets.js";

export async function runScanCycle(): Promise<TokenSignal[]> {
  const results: SignalScanResult[] = await Promise.all([
    scanTwitterSource(),
    scanWalletSource(),
    scanHolderSource(),
    scanNarrativeSource(),
    scanClaimSource(),
  ]);

  return results.flatMap((result: { signals: TokenSignal[] }) => result.signals);
}
