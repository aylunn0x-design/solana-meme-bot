export type SignalSource = "twitter" | "wallet" | "holders" | "volume" | "narrative" | "claims";

export interface TokenSignal {
  mint: string;
  symbol?: string;
  source: SignalSource;
  score: number;
  reason: string;
  timestamp: string;
  liquidityUsd?: number;
  volumeUsd24h?: number;
  holderConcentrationPct?: number;
  walletLabel?: string;
  narrativeTag?: string;
  tweetUrl?: string;
}

export interface SignalScanResult {
  signals: TokenSignal[];
  scannedAt: string;
  source: SignalSource;
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
  minConfidence: number;
  minLiquidityUsd: number;
  maxHolderConcentrationPct: number;
}

export interface SizingInput {
  confidence: number;
  liquidityUsd: number;
  holderConcentrationPct: number;
  currentExposureUsd: number;
  maxPositionSizeUsd: number;
}
