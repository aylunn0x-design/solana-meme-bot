import type { BotDecision, RiskLimits } from "../../shared/src/types.js";

export function checkDecision(decision: BotDecision, limits: RiskLimits, openPositions: number) {
  if (decision.action === "ignore" || decision.action === "hold") {
    return { allowed: false, reason: "non-executable decision" };
  }
  if (decision.confidence < 0.75) {
    return { allowed: false, reason: "confidence too low" };
  }
  if (decision.action === "buy" && limits.maxOpenPositions > 0 && openPositions >= limits.maxOpenPositions) {
    return { allowed: false, reason: "max open positions reached" };
  }
  return { allowed: true };
}
