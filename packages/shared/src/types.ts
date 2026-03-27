export type SignalSource = "twitter" | "wallet" | "holders" | "volume" | "narrative";

export interface TokenSignal {
  mint: string;
  symbol?: string;
  source: SignalSource;
  score: number;
  reason: string;
  timestamp: string;
}

export interface Position {
  mint: string;
  symbol?: string;
  qty: number;
  avgEntry: number;
  currentPrice?: number;
}

export interface BotDecision {
  mint: string;
  action: "buy" | "sell" | "hold" | "ignore";
  confidence: number;
  reasons: string[];
}

export interface RiskLimits {
  maxPositionSizeUsd: number;
  maxDailyLossUsd: number;
  maxOpenPositions: number;
  allowLiveTrading: boolean;
}
