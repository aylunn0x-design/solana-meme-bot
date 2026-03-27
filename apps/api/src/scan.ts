import { buildDecision } from "../../../packages/scoring/src/buildDecision.js";
import { runScanCycle } from "../../../packages/scanner/src/runScanCycle.js";
import { state } from "./state.js";

export async function runScanAndScoreCycle() {
  const signals = await runScanCycle();
  state.signals.push(...signals);

  const decisions = signals.map(buildDecision).filter((decision) => decision.action !== "ignore");
  state.decisions.push(...decisions);

  return { signalsAdded: signals.length, decisionsAdded: decisions.length };
}
