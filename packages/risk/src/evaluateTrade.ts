import type { BotDecision, RiskLimits } from "../../shared/src/types.js";
import { sizePosition } from "./sizePosition.js";

export interface TradeEvaluationInput {
  decision: BotDecision;
  limits: RiskLimits;
  openPositions: number;
  liquidityUsd: number;
  holderConcentrationPct: number;
  currentExposureUsd: number;
}

export function evaluateTrade(input: TradeEvaluationInput) {
  const { decision, limits } = input;

  if (decision.action !== "buy") {
    return { allowed: false, reason: "only buy sizing is evaluated here", sizeUsd: 0 };
  }
  if (decision.confidence < limits.minConfidence) {
    return { allowed: false, reason: "confidence below threshold", sizeUsd: 0 };
  }
  if (input.liquidityUsd < limits.minLiquidityUsd) {
    return { allowed: false, reason: "liquidity too low", sizeUsd: 0 };
  }
  if (input.holderConcentrationPct > limits.maxHolderConcentrationPct) {
    return { allowed: false, reason: "holder concentration too high", sizeUsd: 0 };
  }
  if (limits.maxOpenPositions > 0 && input.openPositions >= limits.maxOpenPositions) {
    return { allowed: false, reason: "max open positions reached", sizeUsd: 0 };
  }

  const sizeUsd = sizePosition({
    confidence: decision.confidence,
    liquidityUsd: input.liquidityUsd,
    holderConcentrationPct: input.holderConcentrationPct,
    currentExposureUsd: input.currentExposureUsd,
    maxPositionSizeUsd: limits.maxPositionSizeUsd,
  });

  if (sizeUsd <= 0) {
    return { allowed: false, reason: "size resolved to zero", sizeUsd: 0 };
  }

  return { allowed: true, sizeUsd };
}
