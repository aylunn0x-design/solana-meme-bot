import type { BotDecision, TokenSignal } from "../../shared/src/types.js";

export function buildDecision(signal: TokenSignal): BotDecision {
  const reasons = [signal.reason];
  if (signal.narrativeTag) reasons.push(`narrative:${signal.narrativeTag}`);
  if (signal.walletLabel) reasons.push(`wallet:${signal.walletLabel}`);

  if (signal.score >= 85) {
    return { mint: signal.mint, action: "buy", confidence: 0.92, reasons };
  }
  if (signal.score >= 70) {
    return { mint: signal.mint, action: "hold", confidence: 0.72, reasons };
  }
  return { mint: signal.mint, action: "ignore", confidence: 0.35, reasons };
}
