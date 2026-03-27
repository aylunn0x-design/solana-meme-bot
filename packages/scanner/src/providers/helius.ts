import type { TokenSignal } from "../../../shared/src/types.js";
import { fetchJson } from "../fetchJson.js";

interface HeliusAsset {
  id?: string;
  content?: { metadata?: { symbol?: string } };
}

interface HeliusSearchResponse {
  result?: { items?: HeliusAsset[] };
}

export async function fetchHeliusAssets(apiKey: string): Promise<TokenSignal[]> {
  if (!apiKey) return [];

  const res = await fetchJson<HeliusSearchResponse>(`https://mainnet.helius-rpc.com/?api-key=${apiKey}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "1",
      method: "searchAssets",
      params: { ownerAddress: "11111111111111111111111111111111", page: 1, limit: 1 },
    }),
  });

  return (res.result?.items ?? []).map((item) => ({
    mint: item.id || "",
    symbol: item.content?.metadata?.symbol,
    source: "holders" as const,
    score: 40,
    reason: "Helius connectivity check",
    timestamp: new Date().toISOString(),
  })).filter((x) => x.mint);
}
