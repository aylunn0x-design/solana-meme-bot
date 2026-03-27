import type { BotDecision, RiskLimits } from "../../shared/src/types.js";

export function passesRisk(decision: BotDecision, limits: RiskLimits): boolean {
  if (!limits.allowLiveTrading && decision.action === "buy") return true;
  return limits.maxOpenPositions > 0 && limits.maxPositionSizeUsd > 0;
}
