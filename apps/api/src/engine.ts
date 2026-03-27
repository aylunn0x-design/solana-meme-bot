import { applyPaperDecision } from "../../../packages/execution/src/paperEngine.js";
import { checkDecision } from "../../../packages/risk/src/checkDecision.js";
import { evaluateTrade } from "../../../packages/risk/src/evaluateTrade.js";
import { state } from "./state.js";
import type { BotDecision } from "../../../packages/shared/src/types.js";

export function runPaperDecision(decision: BotDecision, price: number) {
  const risk = checkDecision(decision, state.riskLimits, state.positions.length);
  if (!risk.allowed) {
    state.history.unshift({
      id: `skip_${Date.now()}`,
      mint: decision.mint,
      action: decision.action,
      reason: risk.reason,
      timestamp: new Date().toISOString(),
      skipped: true,
    });
    return { ok: false, reason: risk.reason };
  }

  const sized = evaluateTrade({
    decision,
    limits: state.riskLimits,
    openPositions: state.positions.length,
    liquidityUsd: 50000,
    holderConcentrationPct: 12,
    currentExposureUsd: state.positions.length * state.riskLimits.maxPositionSizeUsd,
  });

  if (!sized.allowed) {
    state.history.unshift({
      id: `reject_${Date.now()}`,
      mint: decision.mint,
      action: decision.action,
      reason: sized.reason,
      timestamp: new Date().toISOString(),
      skipped: true,
    });
    return { ok: false, reason: sized.reason };
  }

  applyPaperDecision(state, decision, price);
  state.history.unshift({
    id: `size_${Date.now()}`,
    mint: decision.mint,
    action: decision.action,
    sizeUsd: sized.sizeUsd,
    timestamp: new Date().toISOString(),
    note: "dynamic sizing computed",
  });

  return { ok: true, sizeUsd: sized.sizeUsd };
}
