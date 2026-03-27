import type { BotDecision, TokenSignal } from "../../shared/src/types.js";

export function scoreSignal(signal: TokenSignal): BotDecision {
  if (signal.score >= 80) {
    return { mint: signal.mint, action: "buy", confidence: 0.9, reasons: [signal.reason] };
  }
  if (signal.score >= 60) {
    return { mint: signal.mint, action: "hold", confidence: 0.6, reasons: [signal.reason] };
  }
  return { mint: signal.mint, action: "ignore", confidence: 0.3, reasons: [signal.reason] };
}
