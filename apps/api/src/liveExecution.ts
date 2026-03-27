export interface LiveExecutionRequest {
  mint: string;
  side: "buy" | "sell";
  sizeUsd: number;
}

export async function queueLiveExecution(_request: LiveExecutionRequest) {
  return {
    ok: false,
    reason: "live execution adapter not wired yet",
  };
}
