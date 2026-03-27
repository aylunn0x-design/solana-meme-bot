import type { BotDecision, Position } from "../../shared/src/types.js";

export interface PaperTradeState {
  positions: Position[];
  history: Array<Record<string, unknown>>;
}

export function applyPaperDecision(state: PaperTradeState, decision: BotDecision, price: number) {
  if (decision.action !== "buy" && decision.action !== "sell") return state;

  const existing = state.positions.find((p) => p.mint === decision.mint);
  const qty = 1;

  if (decision.action === "buy") {
    if (!existing) {
      state.positions.push({ mint: decision.mint, symbol: decision.mint.slice(0, 4), qty, avgEntry: price, currentPrice: price });
    } else {
      const newQty = existing.qty + qty;
      existing.avgEntry = (existing.avgEntry * existing.qty + price * qty) / newQty;
      existing.qty = newQty;
      existing.currentPrice = price;
    }
  }

  if (decision.action === "sell" && existing) {
    existing.qty = Math.max(0, existing.qty - qty);
    existing.currentPrice = price;
  }

  state.history.unshift({
    id: `hist_${Date.now()}`,
    mint: decision.mint,
    action: decision.action,
    price,
    confidence: decision.confidence,
    timestamp: new Date().toISOString(),
  });

  state.positions = state.positions.filter((p) => p.qty > 0);
  return state;
}
