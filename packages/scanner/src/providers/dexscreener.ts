import type { TokenSignal } from "../../../shared/src/types.js";
import { fetchJson } from "../fetchJson.js";

interface DexPair {
  baseToken?: { address?: string; symbol?: string };
  liquidity?: { usd?: number };
  volume?: { h24?: number };
}

interface DexResponse {
  pairs?: DexPair[];
}

export async function fetchDexScreenerByToken(mint: string): Promise<TokenSignal[]> {
  if (!mint) return [];

  const res = await fetchJson<DexResponse>(`https://api.dexscreener.com/latest/dex/tokens/${mint}`);

  return (res.pairs ?? []).slice(0, 3).map((pair) => ({
    mint: pair.baseToken?.address || mint,
    symbol: pair.baseToken?.symbol,
    source: "volume" as const,
    score: 50,
    reason: "DexScreener pair validation",
    timestamp: new Date().toISOString(),
    liquidityUsd: pair.liquidity?.usd,
    volumeUsd24h: pair.volume?.h24,
  }));
}
