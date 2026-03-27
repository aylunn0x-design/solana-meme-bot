import { prepareAxiomOrder } from "../../../packages/execution/src/axiomAdapter.js";
import { liveConfig } from "./liveConfig.js";

export async function prepareAxiomExecution(input: { mint: string; side: "buy" | "sell"; sizeUsd: number }) {
  return prepareAxiomOrder(
    {
      baseUrl: process.env.AXIOM_BASE_URL || "https://axiom.trade",
      apiKey: process.env.AXIOM_API_KEY,
    },
    input,
  );
}
