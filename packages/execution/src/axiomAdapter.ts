export interface AxiomOrderRequest {
  mint: string;
  side: "buy" | "sell";
  sizeUsd: number;
}

export interface AxiomAdapterConfig {
  baseUrl: string;
  apiKey?: string;
}

export async function prepareAxiomOrder(config: AxiomAdapterConfig, order: AxiomOrderRequest) {
  return {
    venue: "axiom.trade",
    baseUrl: config.baseUrl,
    ready: false,
    order,
    note: "Fill in Axiom endpoint/auth details from docs before live execution.",
  };
}
