import type { BotDecision, Position, RiskLimits, TokenSignal } from "../../../packages/shared/src/types.js";

export const state: {
  signals: TokenSignal[];
  decisions: BotDecision[];
  positions: Position[];
  history: Array<Record<string, unknown>>;
  riskLimits: RiskLimits;
} = {
  signals: [],
  decisions: [],
  positions: [],
  history: [],
  riskLimits: {
    maxPositionSizeUsd: 0,
    maxDailyLossUsd: 0,
    maxOpenPositions: 0,
    allowLiveTrading: false,
    minConfidence: 0.8,
    minLiquidityUsd: 25000,
    maxHolderConcentrationPct: 20,
  },
};
