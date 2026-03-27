import type { TokenSignal } from "../../shared/src/types.js";

export function normalizeSignal(input: Partial<TokenSignal> & Pick<TokenSignal, "mint" | "source" | "score" | "reason">): TokenSignal {
  return {
    mint: input.mint,
    source: input.source,
    score: input.score,
    reason: input.reason,
    timestamp: input.timestamp ?? new Date().toISOString(),
    symbol: input.symbol,
    liquidityUsd: input.liquidityUsd,
    volumeUsd24h: input.volumeUsd24h,
    holderConcentrationPct: input.holderConcentrationPct,
    walletLabel: input.walletLabel,
    narrativeTag: input.narrativeTag,
    tweetUrl: input.tweetUrl,
  };
}
