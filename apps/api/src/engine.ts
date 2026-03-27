import { applyPaperDecision } from "../../../packages/execution/src/paperEngine.js";
import { checkDecision } from "../../../packages/risk/src/checkDecision.js";
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

  applyPaperDecision(state, decision, price);
  return { ok: true };
}
