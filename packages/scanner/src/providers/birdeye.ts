import type { TokenSignal } from "../../../shared/src/types.js";
import { fetchJson } from "../fetchJson.js";

interface BirdeyeResponse {
  data?: {
    items?: Array<{
      address?: string;
      symbol?: string;
      liquidity?: number;
      v24hUSD?: number;
    }>;
  };
}

export async function fetchBirdeyeTrending(apiKey: string): Promise<TokenSignal[]> {
  if (!apiKey) return [];

  const res = await fetchJson<BirdeyeResponse>(
    "https://public-api.birdeye.so/defi/token_trending?sort_by=rank&sort_type=asc&offset=0&limit=20",
    {
      headers: {
        "X-API-KEY": apiKey,
        accept: "application/json",
      },
    },
  );

  return (res.data?.items ?? [])
    .filter((item) => item.address)
    .map((item) => ({
      mint: item.address as string,
      symbol: item.symbol,
      source: "volume" as const,
      score: 55,
      reason: "Birdeye trending token",
      timestamp: new Date().toISOString(),
      liquidityUsd: item.liquidity,
      volumeUsd24h: item.v24hUSD,
    }));
}
