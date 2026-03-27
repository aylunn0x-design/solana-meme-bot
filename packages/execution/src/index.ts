import type { BotDecision } from "../../shared/src/types.js";

export interface ExecutionResult {
  ok: boolean;
  mode: "paper" | "live";
  message: string;
}

export async function executeDecision(decision: BotDecision): Promise<ExecutionResult> {
  return {
    ok: true,
    mode: "paper",
    message: `Scaffold execution for ${decision.action} on ${decision.mint}`,
  };
}
