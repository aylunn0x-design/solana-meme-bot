import type { BotDecision, Position, RiskLimits, TokenSignal } from "../../../packages/shared/src/types.js";

export const mockSignals: TokenSignal[] = [
  {
    mint: "9xDemoMint111",
    symbol: "DEMO",
    source: "twitter",
    score: 84,
    reason: "Narrative acceleration + smart wallet attention",
    timestamp: new Date().toISOString(),
  },
  {
    mint: "7yMetaMint222",
    symbol: "META",
    source: "wallet",
    score: 68,
    reason: "Tracked wallet entry with decent holder spread",
    timestamp: new Date().toISOString(),
  }
];

export const mockDecisions: BotDecision[] = [
  {
    mint: "9xDemoMint111",
    action: "buy",
    confidence: 0.89,
    reasons: ["Strong social momentum", "Wallet flow confirmed", "Meta aligned"],
  },
  {
    mint: "7yMetaMint222",
    action: "hold",
    confidence: 0.61,
    reasons: ["Signal decent but not top-tier"],
  }
];

export const mockPositions: Position[] = [
  {
    mint: "9xDemoMint111",
    symbol: "DEMO",
    qty: 125000,
    avgEntry: 0.000012,
    currentPrice: 0.000016,
  },
  {
    mint: "7yMetaMint222",
    symbol: "META",
    qty: 80000,
    avgEntry: 0.000021,
    currentPrice: 0.000019,
  }
];

export const mockRiskLimits: RiskLimits = {
  maxPositionSizeUsd: 250,
  maxDailyLossUsd: 150,
  maxOpenPositions: 5,
  allowLiveTrading: false,
};

export const mockHistory = [
  {
    id: "hist_1",
    mint: "9xDemoMint111",
    symbol: "DEMO",
    action: "buy",
    qty: 125000,
    price: 0.000012,
    timestamp: new Date().toISOString(),
  },
  {
    id: "hist_2",
    mint: "7yMetaMint222",
    symbol: "META",
    action: "buy",
    qty: 80000,
    price: 0.000021,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  }
];
